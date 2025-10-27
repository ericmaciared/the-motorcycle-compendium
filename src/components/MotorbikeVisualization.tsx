import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

interface MotorbikeData {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  horsepower_hp: number | null;
  price_usd: number | null;
  engine_displacement_cc: number | null;
}

type VisualizationMode = 'category' | 'price' | 'brand' | 'displacement';

interface ClusterData {
  label: string;
  bikes: MotorbikeData[];
  color: string;
  position: [number, number, number];
  avgValue?: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Sport': '#ef4444',
  'Naked': '#f59e0b',
  'Adventure': '#10b981',
  'Touring': '#0ea5e9',
  'Cruiser': '#8b5cf6',
  'Dual-Sport': '#06b6d4',
  'Sport Touring': '#3b82f6',
  'Retro': '#f97316',
  'Supermoto': '#eab308',
  'Bagger': '#a855f7',
  'Enduro': '#22c55e',
  'Motocross': '#84cc16',
  'Scrambler': '#fb923c',
  'Electric': '#14b8a6',
};

// Generate color from value for heatmap (blue=low, green=medium, yellow=high, red=very high)
function getHeatmapColor(value: number, min: number, max: number): string {
  const normalized = (value - min) / (max - min);
  const hue = (1 - normalized) * 240; // 240 (blue) to 0 (red)
  return `hsl(${hue}, 100%, 50%)`;
}

// Generate positions using Fibonacci sphere distribution
function generateClusterPositions(count: number, radius: number = 15): [number, number, number][] {
  const positions: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;

    const x = Math.cos(theta) * radiusAtY * radius;
    const z = Math.sin(theta) * radiusAtY * radius;

    positions.push([x, y * radius, z]);
  }

  return positions;
}

interface BikeParticleProps {
  bike: MotorbikeData;
  targetPosition: [number, number, number];
  color: string;
  onHover: (bike: MotorbikeData | null) => void;
  index: number;
}

function BikeParticle({ bike, targetPosition, color, onHover, index }: BikeParticleProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Smooth position transitions
  const { position } = useSpring({
    position: targetPosition,
    config: { mass: 1, tension: 80, friction: 40 },
  });

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();

      // Enhanced floating animation with variation per particle
      const offset = index * 0.1;
      const floatX = Math.sin(time * 0.5 + offset) * 0.15;
      const floatY = Math.cos(time * 0.3 + offset * 1.5) * 0.2;
      const floatZ = Math.sin(time * 0.4 + offset * 0.7) * 0.15;

      // Apply floating offset from target position
      meshRef.current.position.x = targetPosition[0] + floatX;
      meshRef.current.position.y = targetPosition[1] + floatY;
      meshRef.current.position.z = targetPosition[2] + floatZ;

      // Dynamic rotation based on movement
      meshRef.current.rotation.x += 0.008;
      meshRef.current.rotation.y += 0.012;

      // Pulse effect when hovered
      if (hovered) {
        const pulse = 1 + Math.sin(time * 8) * 0.1;
        meshRef.current.scale.setScalar(1.8 * pulse);
      }
    }
  });

  // Size based on horsepower or displacement
  const size = useMemo(() => {
    const hp = bike.horsepower_hp || 50;
    return Math.max(0.12, Math.min(0.3, hp / 500));
  }, [bike.horsepower_hp]);

  return (
    <mesh
      ref={meshRef}
      scale={hovered ? 1.8 : 1}
      onPointerOver={() => {
        setHovered(true);
        onHover(bike);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
        document.body.style.cursor = 'default';
      }}
    >
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 1.2 : 0.4}
        metalness={0.9}
        roughness={0.1}
      />

      {/* Outer glow ring when hovered */}
      {hovered && (
        <mesh scale={1.5}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </mesh>
  );
}

interface ClusterVisualizationProps {
  cluster: ClusterData;
  onHover: (bike: MotorbikeData | null) => void;
  mode: VisualizationMode;
}

function ClusterVisualization({ cluster, onHover, mode }: ClusterVisualizationProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate positions for bikes within cluster
  const bikePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const count = cluster.bikes.length;
    const clusterRadius = Math.min(3, Math.max(1.5, count / 10));
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / Math.max(count - 1, 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;

      const x = cluster.position[0] + Math.cos(theta) * radiusAtY * clusterRadius;
      const z = cluster.position[2] + Math.sin(theta) * radiusAtY * clusterRadius;
      const yPos = cluster.position[1] + y * clusterRadius;

      positions.push([x, yPos, z]);
    }

    return positions;
  }, [cluster]);

  // Show average value for price/displacement modes
  const valueLabel = useMemo(() => {
    if (mode === 'price' && cluster.avgValue) {
      return `€${Math.round(cluster.avgValue).toLocaleString()}`;
    }
    if (mode === 'displacement' && cluster.avgValue) {
      return `${Math.round(cluster.avgValue)}cc`;
    }
    return null;
  }, [mode, cluster.avgValue]);

  return (
    <group ref={groupRef}>
      {/* Cluster label */}
      <Text
        position={cluster.position}
        fontSize={0.9}
        color={cluster.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
        fontWeight="bold"
      >
        {cluster.label}
      </Text>

      {/* Count and value badge */}
      <Text
        position={[cluster.position[0], cluster.position[1] - 1.2, cluster.position[2]]}
        fontSize={0.35}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {cluster.bikes.length} bikes{valueLabel ? ` • ${valueLabel}` : ''}
      </Text>

      {/* Connection lines with gradient effect */}
      {cluster.bikes.slice(0, 50).map((bike, index) => {
        const pos = bikePositions[index];
        const points = [
          new THREE.Vector3(...cluster.position),
          new THREE.Vector3(...pos)
        ];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <primitive key={bike.id} object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
            color: cluster.color,
            transparent: true,
            opacity: 0.15,
          }))} />
        );
      })}

      {/* Individual bike particles */}
      {cluster.bikes.map((bike, index) => (
        <BikeParticle
          key={bike.id}
          bike={bike}
          targetPosition={bikePositions[index]}
          color={cluster.color}
          onHover={onHover}
          index={index}
        />
      ))}
    </group>
  );
}

interface Scene3DProps {
  clusters: ClusterData[];
  onHover: (bike: MotorbikeData | null) => void;
  mode: VisualizationMode;
  isDarkMode: boolean;
}

function Scene3D({ clusters, onHover, mode, isDarkMode }: Scene3DProps) {
  // Lighting and fog based on theme
  const ambientIntensity = isDarkMode ? 0.4 : 0.6;
  const pointLightColor = isDarkMode ? '#44403c' : '#fafaf9';
  const accentLightColor = '#0ea5e9';
  const hemisphereTop = isDarkMode ? '#44403c' : '#fafaf9';
  const fogColor = isDarkMode ? '#44403c' : '#e7e5e4';

  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <pointLight position={[15, 15, 15]} intensity={1.2} color={pointLightColor} />
      <pointLight position={[-15, -10, -15]} intensity={0.6} color={accentLightColor} />
      <spotLight position={[0, 25, 0]} angle={0.4} penumbra={1} intensity={1} color={pointLightColor} />
      <hemisphereLight args={[hemisphereTop, accentLightColor, 0.4]} />

      {/* Subtle fog for depth */}
      <fog attach="fog" args={[fogColor, 40, 70]} />

      {clusters.map((cluster) => (
        <ClusterVisualization
          key={cluster.label}
          cluster={cluster}
          onHover={onHover}
          mode={mode}
        />
      ))}

      <OrbitControls
        enableDamping
        dampingFactor={0.03}
        rotateSpeed={0.6}
        zoomSpeed={1}
        minDistance={8}
        maxDistance={60}
      />
    </>
  );
}

interface ModeControlsProps {
  mode: VisualizationMode;
  onModeChange: (mode: VisualizationMode) => void;
}

function ModeControls({ mode, onModeChange }: ModeControlsProps) {
  const modes: { value: VisualizationMode; label: string; icon: string }[] = [
    { value: 'category', label: 'Category', icon: '🏷️' },
    { value: 'price', label: 'Price Heatmap', icon: '💰' },
    { value: 'brand', label: 'Brand', icon: '🏭' },
    { value: 'displacement', label: 'Displacement', icon: '⚙️' },
  ];

  return (
    <div className="absolute top-20 left-4 bg-topo-50 elevation-2 p-3 rounded z-10 border border-topo-300">
      <h3 className="text-xs font-bold mb-2 text-topo-700 uppercase tracking-wider">Visualization Mode</h3>
      <div className="flex flex-col gap-2">
        {modes.map((m) => (
          <button
            key={m.value}
            onClick={() => onModeChange(m.value)}
            className={`px-3 py-2 rounded text-sm font-medium transition-all uppercase tracking-wider ${
              mode === m.value
                ? 'bg-signal-blue text-black elevation-2 font-bold'
                : 'bg-topo-100 text-topo-700 hover:bg-topo-200 border border-topo-300'
            }`}
          >
            <span className="mr-2">{m.icon}</span>
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}

interface InfoPanelProps {
  hoveredBike: MotorbikeData | null;
  totalBikes: number;
  clusterCount: number;
  mode: VisualizationMode;
}

function InfoPanel({ hoveredBike, totalBikes, clusterCount, mode }: InfoPanelProps) {
  const modeDescription = {
    category: 'Grouped by motorcycle category',
    price: 'Color intensity by price range',
    brand: 'Grouped by manufacturer',
    displacement: 'Grouped by engine size',
  };

  return (
    <div className="absolute top-4 right-4 bg-topo-50 elevation-2 p-4 rounded max-w-xs z-10 border border-topo-300">
      <h3 className="text-lg font-bold mb-2 text-topo-900 tracking-tight">Motorbike Universe</h3>
      <div className="space-y-1 text-sm mb-3 text-topo-900">
        <p className="flex items-center gap-2">
          <span className="data-point bg-signal-blue"></span>
          <span className="metric-value">{totalBikes}</span> motorcycles
        </p>
        <p className="flex items-center gap-2">
          <span className="data-point bg-signal-amber"></span>
          <span className="metric-value">{clusterCount}</span> groups
        </p>
        <p className="text-xs text-topo-600 mt-2 uppercase tracking-wider">{modeDescription[mode]}</p>
      </div>

      {hoveredBike ? (
        <div className="border-t border-topo-300 pt-3">
          <h4 className="font-bold text-signal-blue uppercase tracking-wider text-xs">{hoveredBike.manufacturer}</h4>
          <p className="text-base font-semibold text-topo-900 mt-1">{hoveredBike.name}</p>
          <div className="mt-2 space-y-1 text-xs text-topo-700">
            <p className="text-signal-amber font-medium uppercase tracking-wider">{hoveredBike.category}</p>
            {hoveredBike.engine_displacement_cc && (
              <p><span className="text-topo-500">Engine:</span> <span className="metric-value">{hoveredBike.engine_displacement_cc}cc</span></p>
            )}
            {hoveredBike.horsepower_hp && (
              <p><span className="text-topo-500">Power:</span> <span className="metric-value">{hoveredBike.horsepower_hp} HP</span></p>
            )}
            {hoveredBike.price_usd && (
              <p className="font-bold text-signal-green metric-value">€{hoveredBike.price_usd.toLocaleString()}</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-xs text-topo-500 border-t border-topo-300 pt-3 uppercase tracking-wider">
          Hover over a sphere to see details
        </p>
      )}
    </div>
  );
}

interface LegendProps {
  clusters: ClusterData[];
  mode: VisualizationMode;
}

function Legend({ clusters, mode }: LegendProps) {
  return (
    <div className="absolute bottom-4 right-4 bg-topo-50 elevation-2 p-4 rounded max-w-xs z-10 border border-topo-300 max-h-[60vh] overflow-y-auto">
      <h3 className="text-sm font-bold mb-3 text-topo-900 uppercase tracking-wider">
        {mode === 'category' && 'Categories'}
        {mode === 'price' && 'Price Ranges'}
        {mode === 'brand' && 'Brands'}
        {mode === 'displacement' && 'Engine Sizes'}
      </h3>
      <div className="space-y-2">
        {clusters.slice(0, 20).map((cluster) => (
          <div key={cluster.label} className="flex items-center gap-2 text-xs text-topo-700">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0 elevation-1"
              style={{ backgroundColor: cluster.color }}
            />
            <span className="flex-1 truncate font-medium">{cluster.label}</span>
            <span className="text-topo-500 metric-value">{cluster.bikes.length}</span>
          </div>
        ))}
        {clusters.length > 20 && (
          <p className="text-xs text-topo-500 pt-2 border-t border-topo-300 uppercase tracking-wider">
            +{clusters.length - 20} more groups
          </p>
        )}
      </div>
    </div>
  );
}

interface MotorbikeVisualizationProps {
  bikes: MotorbikeData[];
}

export default function MotorbikeVisualization({ bikes }: MotorbikeVisualizationProps) {
  const [hoveredBike, setHoveredBike] = useState<MotorbikeData | null>(null);
  const [mode, setMode] = useState<VisualizationMode>('category');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect theme mode
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(isDark);
    };

    // Check initial theme
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  // Generate clusters based on selected mode
  const clusters = useMemo(() => {
    const clusterMap = new Map<string, MotorbikeData[]>();

    bikes.forEach((bike) => {
      let key: string;

      switch (mode) {
        case 'category':
          key = bike.category || 'Other';
          break;
        case 'brand':
          key = bike.manufacturer || 'Unknown';
          break;
        case 'price':
          if (bike.price_usd) {
            if (bike.price_usd < 5000) key = '< €5k';
            else if (bike.price_usd < 10000) key = '€5k - €10k';
            else if (bike.price_usd < 15000) key = '€10k - €15k';
            else if (bike.price_usd < 20000) key = '€15k - €20k';
            else if (bike.price_usd < 30000) key = '€20k - €30k';
            else key = '€30k+';
          } else {
            key = 'Price N/A';
          }
          break;
        case 'displacement':
          if (bike.engine_displacement_cc) {
            if (bike.engine_displacement_cc < 300) key = '< 300cc';
            else if (bike.engine_displacement_cc < 500) key = '300-500cc';
            else if (bike.engine_displacement_cc < 750) key = '500-750cc';
            else if (bike.engine_displacement_cc < 1000) key = '750-1000cc';
            else if (bike.engine_displacement_cc < 1300) key = '1000-1300cc';
            else key = '1300cc+';
          } else {
            key = 'N/A';
          }
          break;
      }

      if (!clusterMap.has(key)) {
        clusterMap.set(key, []);
      }
      clusterMap.get(key)!.push(bike);
    });

    // Generate colors and positions
    const labels = Array.from(clusterMap.keys()).sort();
    const positions = generateClusterPositions(labels.length, 18);

    // Calculate value ranges for heatmap modes
    let minValue = Infinity;
    let maxValue = -Infinity;

    if (mode === 'price' || mode === 'displacement') {
      bikes.forEach((bike) => {
        const value = mode === 'price' ? bike.price_usd : bike.engine_displacement_cc;
        if (value) {
          minValue = Math.min(minValue, value);
          maxValue = Math.max(maxValue, value);
        }
      });
    }

    const clusterArray: ClusterData[] = labels.map((label, index) => {
      const clusterBikes = clusterMap.get(label)!;
      let color: string;
      let avgValue: number | undefined;

      // Calculate average value for the cluster
      if (mode === 'price') {
        const priceSum = clusterBikes.reduce((sum, bike) => sum + (bike.price_usd || 0), 0);
        avgValue = priceSum / clusterBikes.length;
        color = getHeatmapColor(avgValue, minValue, maxValue);
      } else if (mode === 'displacement') {
        const dispSum = clusterBikes.reduce((sum, bike) => sum + (bike.engine_displacement_cc || 0), 0);
        avgValue = dispSum / clusterBikes.length;
        color = getHeatmapColor(avgValue, minValue, maxValue);
      } else if (mode === 'category') {
        color = CATEGORY_COLORS[label] || '#64748b';
      } else {
        // Brand mode - generate consistent colors
        const hue = (index * 137.5) % 360;
        color = `hsl(${hue}, 70%, 55%)`;
      }

      return {
        label,
        bikes: clusterBikes,
        color,
        position: positions[index],
        avgValue,
      };
    });

    return clusterArray;
  }, [bikes, mode]);

  // Canvas background based on theme
  const canvasBackground = isDarkMode
    ? 'linear-gradient(to bottom, #292524, #44403c)'
    : 'linear-gradient(to bottom, #f5f5f4, #e7e5e4)';

  return (
    <div className="relative w-full h-full bg-topo-100">
      <Canvas
        camera={{ position: [0, 0, 35], fov: 60 }}
        style={{ background: canvasBackground, width: '100%', height: '100%' }}
      >
        <Scene3D clusters={clusters} onHover={setHoveredBike} mode={mode} isDarkMode={isDarkMode} />
      </Canvas>

      <ModeControls mode={mode} onModeChange={setMode} />

      <InfoPanel
        hoveredBike={hoveredBike}
        totalBikes={bikes.length}
        clusterCount={clusters.length}
        mode={mode}
      />

      <Legend clusters={clusters} mode={mode} />

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center z-0 pointer-events-none">
        <h1 className="text-2xl md:text-4xl font-bold text-topo-900 drop-shadow-sm tracking-tight">
          Interactive Motorbike Universe
        </h1>
        <p className="text-sm md:text-base text-topo-600 mt-2 uppercase tracking-wider">
          Drag to rotate • Scroll to zoom • Hover for details
        </p>
      </div>
    </div>
  );
}
