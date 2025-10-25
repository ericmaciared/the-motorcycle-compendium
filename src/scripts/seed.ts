import { config } from "dotenv";
config();

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing environment variables!");
  console.error(
    "Make sure PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are in your .env file"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedManufacturers() {
  console.log("🏭 Seeding manufacturers...");

  const manufacturers = [
    {
      name: "Honda",
      slug: "honda",
      country: "Japan",
      founded_year: 1948,
      description:
        "Leading Japanese motorcycle manufacturer known for reliability and innovation.",
    },
    {
      name: "Yamaha",
      slug: "yamaha",
      country: "Japan",
      founded_year: 1955,
      description:
        "Japanese manufacturer producing sport bikes, cruisers, and off-road motorcycles.",
    },
    {
      name: "Kawasaki",
      slug: "kawasaki",
      country: "Japan",
      founded_year: 1896,
      description:
        "Japanese heavy industries company famous for high-performance motorcycles.",
    },
    {
      name: "Suzuki",
      slug: "suzuki",
      country: "Japan",
      founded_year: 1909,
      description:
        "Japanese manufacturer known for sport bikes and versatile motorcycles.",
    },
    {
      name: "Ducati",
      slug: "ducati",
      country: "Italy",
      founded_year: 1926,
      description:
        "Italian manufacturer renowned for desmodromic valve engines and racing heritage.",
    },
    {
      name: "BMW",
      slug: "bmw",
      country: "Germany",
      founded_year: 1916,
      description:
        "German manufacturer known for boxer engines and premium touring motorcycles.",
    },
    {
      name: "Harley-Davidson",
      slug: "harley-davidson",
      country: "USA",
      founded_year: 1903,
      description:
        "Iconic American manufacturer of heavyweight cruiser motorcycles.",
    },
    {
      name: "KTM",
      slug: "ktm",
      country: "Austria",
      founded_year: 1934,
      description:
        "Austrian manufacturer specializing in off-road and adventure motorcycles.",
    },
    {
      name: "Triumph",
      slug: "triumph",
      country: "UK",
      founded_year: 1902,
      description:
        "British manufacturer with a rich heritage in classic and modern motorcycles.",
    },
    {
      name: "Royal Enfield",
      slug: "royal-enfield",
      country: "India",
      founded_year: 1901,
      description:
        "Historic manufacturer producing classic-styled motorcycles.",
    },
  ];

  const { data, error } = await supabase
    .from("manufacturers")
    .upsert(manufacturers, { onConflict: "slug" })
    .select();

  if (error) {
    console.error("❌ Error seeding manufacturers:", error);
    return null;
  }

  console.log(`✅ Added ${data.length} manufacturers`);
  return data;
}

async function seedMotorcycles() {
  console.log("🏍️ Seeding motorcycles...");

  // Get manufacturers
  const { data: manufacturers } = await supabase
    .from("manufacturers")
    .select("id, slug");

  if (!manufacturers) {
    console.error("❌ No manufacturers found");
    return;
  }

  const honda = manufacturers.find((m) => m.slug === "honda");
  const yamaha = manufacturers.find((m) => m.slug === "yamaha");
  const ducati = manufacturers.find((m) => m.slug === "ducati");
  const kawasaki = manufacturers.find((m) => m.slug === "kawasaki");
  const bmw = manufacturers.find((m) => m.slug === "bmw");

  // Add models
  const models = [
    {
      manufacturer_id: honda?.id,
      name: "CBR1000RR-R",
      slug: "cbr1000rr-r",
      category: "Sport",
      year_start: 2020,
      description: "Ultimate superbike with MotoGP-derived technology",
    },
    {
      manufacturer_id: honda?.id,
      name: "Africa Twin",
      slug: "africa-twin",
      category: "Adventure",
      year_start: 2016,
      description: "Legendary adventure bike for on and off-road exploration",
    },
    {
      manufacturer_id: yamaha?.id,
      name: "YZF-R1",
      slug: "yzf-r1",
      category: "Sport",
      year_start: 1998,
      description: "Iconic superbike with crossplane crankshaft engine",
    },
    {
      manufacturer_id: yamaha?.id,
      name: "MT-09",
      slug: "mt-09",
      category: "Naked",
      year_start: 2013,
      description: "Aggressive naked bike with triple-cylinder engine",
    },
    {
      manufacturer_id: ducati?.id,
      name: "Panigale V4",
      slug: "panigale-v4",
      category: "Sport",
      year_start: 2018,
      description: "Italian superbike masterpiece with V4 engine",
    },
    {
      manufacturer_id: ducati?.id,
      name: "Monster",
      slug: "monster",
      category: "Naked",
      year_start: 1993,
      description: "Iconic naked bike that defined the genre",
    },
    {
      manufacturer_id: kawasaki?.id,
      name: "Ninja ZX-10R",
      slug: "ninja-zx-10r",
      category: "Sport",
      year_start: 2004,
      description: "Race-bred superbike with championship pedigree",
    },
    {
      manufacturer_id: kawasaki?.id,
      name: "Z900",
      slug: "z900",
      category: "Naked",
      year_start: 2017,
      description: "Modern naked bike with aggressive styling",
    },
    {
      manufacturer_id: bmw?.id,
      name: "S 1000 RR",
      slug: "s-1000-rr",
      category: "Sport",
      year_start: 2009,
      description: "German precision superbike with cutting-edge technology",
    },
    {
      manufacturer_id: bmw?.id,
      name: "R 1250 GS",
      slug: "r-1250-gs",
      category: "Adventure",
      year_start: 2018,
      description: "The ultimate adventure touring motorcycle",
    },
  ];

  const { data: modelData, error: modelError } = await supabase
    .from("motorbike_models")
    .upsert(models, { onConflict: "manufacturer_id,slug" })
    .select();

  if (modelError) {
    console.error("❌ Error seeding models:", modelError);
    return;
  }

  console.log(`✅ Added ${modelData.length} models`);

  // Add variants
  const variants = [
    {
      model_id: modelData.find((m) => m.slug === "cbr1000rr-r")?.id,
      variant_name: "Fireblade SP",
      year: 2024,
      slug: "cbr1000rr-r-fireblade-sp-2024",
      price_usd: 28500,
      engine_type: "Inline-4",
      engine_displacement_cc: 999,
      horsepower_hp: 214,
      torque_nm: 113,
      transmission_type: "6-speed",
      cooling_system: "Liquid-cooled",
      weight_kg: 201,
      seat_height_mm: 830,
      top_speed_kmh: 299,
      fuel_capacity_liters: 16.1,
      fuel_consumption_l_per_100km: 6.5,
      front_brake_type: "Dual 330mm discs, Brembo Stylema calipers",
      rear_brake_type: "Single 220mm disc",
      front_tire_size: "120/70 ZR17",
      rear_tire_size: "200/55 ZR17",
      abs: true,
      traction_control: true,
      description:
        "Race-ready superbike with Öhlins suspension and marchesini wheels",
    },
    {
      model_id: modelData.find((m) => m.slug === "africa-twin")?.id,
      variant_name: "Adventure Sports",
      year: 2024,
      slug: "africa-twin-adventure-sports-2024",
      price_usd: 16499,
      engine_type: "Parallel-Twin",
      engine_displacement_cc: 1084,
      horsepower_hp: 101,
      torque_nm: 105,
      transmission_type: "6-speed DCT",
      cooling_system: "Liquid-cooled",
      weight_kg: 238,
      seat_height_mm: 850,
      top_speed_kmh: 190,
      fuel_capacity_liters: 24.8,
      fuel_consumption_l_per_100km: 5.0,
      front_brake_type: "Dual 310mm discs",
      rear_brake_type: "Single 256mm disc",
      front_tire_size: "90/90-21",
      rear_tire_size: "150/70 R18",
      abs: true,
      traction_control: true,
      description: "Ultimate adventure bike with DCT and 24.8L fuel tank",
    },
    {
      model_id: modelData.find((m) => m.slug === "yzf-r1")?.id,
      variant_name: "R1M",
      year: 2024,
      slug: "yzf-r1-r1m-2024",
      price_usd: 26299,
      engine_type: "Inline-4",
      engine_displacement_cc: 998,
      horsepower_hp: 200,
      torque_nm: 113,
      transmission_type: "6-speed",
      cooling_system: "Liquid-cooled",
      weight_kg: 199,
      seat_height_mm: 855,
      top_speed_kmh: 299,
      fuel_capacity_liters: 17.0,
      fuel_consumption_l_per_100km: 6.8,
      front_brake_type: "Dual 320mm discs, Brembo calipers",
      rear_brake_type: "Single 220mm disc",
      front_tire_size: "120/70 ZR17",
      rear_tire_size: "200/55 ZR17",
      abs: true,
      traction_control: true,
      description: "Premium R1 with Öhlins Electronic Racing Suspension",
    },
    {
      model_id: modelData.find((m) => m.slug === "mt-09")?.id,
      variant_name: "SP",
      year: 2024,
      slug: "mt-09-sp-2024",
      price_usd: 11599,
      engine_type: "Inline-3",
      engine_displacement_cc: 890,
      horsepower_hp: 117,
      torque_nm: 93,
      transmission_type: "6-speed",
      cooling_system: "Liquid-cooled",
      weight_kg: 189,
      seat_height_mm: 825,
      top_speed_kmh: 225,
      fuel_capacity_liters: 14.0,
      fuel_consumption_l_per_100km: 5.4,
      front_brake_type: "Dual 298mm discs, Brembo calipers",
      rear_brake_type: "Single 245mm disc",
      front_tire_size: "120/70 ZR17",
      rear_tire_size: "180/55 ZR17",
      abs: true,
      traction_control: true,
      description: "Torque-rich triple with aggressive naked styling",
    },
    {
      model_id: modelData.find((m) => m.slug === "panigale-v4")?.id,
      variant_name: "V4 S",
      year: 2024,
      slug: "panigale-v4-s-2024",
      price_usd: 32500,
      engine_type: "V4",
      engine_displacement_cc: 1103,
      horsepower_hp: 214,
      torque_nm: 124,
      transmission_type: "6-speed",
      cooling_system: "Liquid-cooled",
      weight_kg: 195,
      seat_height_mm: 830,
      top_speed_kmh: 304,
      fuel_capacity_liters: 16.0,
      fuel_consumption_l_per_100km: 7.1,
      front_brake_type: "Dual 330mm discs, Brembo Stylema calipers",
      rear_brake_type: "Single 245mm disc",
      front_tire_size: "120/70 ZR17",
      rear_tire_size: "200/60 ZR17",
      abs: true,
      traction_control: true,
      description: "Italian superbike masterpiece with MotoGP technology",
    },
    {
      model_id: modelData.find((m) => m.slug === "monster")?.id,
      variant_name: "Monster SP",
      year: 2024,
      slug: "monster-sp-2024",
      price_usd: 16995,
      engine_type: "L-Twin",
      engine_displacement_cc: 937,
      horsepower_hp: 111,
      torque_nm: 93,
      transmission_type: "6-speed",
      cooling_system: "Liquid-cooled",
      weight_kg: 186,
      seat_height_mm: 820,
      top_speed_kmh: 230,
      fuel_capacity_liters: 14.0,
      fuel_consumption_l_per_100km: 5.3,
      front_brake_type: "Dual 320mm discs, Brembo M4.32 calipers",
      rear_brake_type: "Single 245mm disc",
      front_tire_size: "120/70 ZR17",
      rear_tire_size: "180/55 ZR17",
      abs: true,
      traction_control: true,
      description: "The naked bike that started it all, reimagined",
    },
    {
      model_id: modelData.find((m) => m.slug === "ninja-zx-10r")?.id,
      variant_name: "KRT Edition",
      year: 2024,
      slug: "ninja-zx-10r-krt-2024",
      price_usd: 17399,
      engine_type: "Inline-4",
      engine_displacement_cc: 998,
      horsepower_hp: 203,
      torque_nm: 115,
      transmission_type: "6-speed",
      cooling_system: "Liquid-cooled",
      weight_kg: 207,
      seat_height_mm: 835,
      top_speed_kmh: 299,
      fuel_capacity_liters: 17.0,
      fuel_consumption_l_per_100km: 6.9,
      front_brake_type: "Dual 330mm discs, Brembo M50 calipers",
      rear_brake_type: "Single 250mm disc",
      front_tire_size: "120/70 ZR17",
      rear_tire_size: "190/55 ZR17",
      abs: true,
      traction_control: true,
      description: "Championship-winning superbike in factory racing colors",
    },
    {
      model_id: modelData.find((m) => m.slug === "z900")?.id,
      variant_name: "Standard",
      year: 2024,
      slug: "z900-standard-2024",
      price_usd: 9399,
      engine_type: "Inline-4",
      engine_displacement_cc: 948,
      horsepower_hp: 125,
      torque_nm: 98,
      transmission_type: "6-speed",
      cooling_system: "Liquid-cooled",
      weight_kg: 210,
      seat_height_mm: 820,
      top_speed_kmh: 230,
      fuel_capacity_liters: 17.0,
      fuel_consumption_l_per_100km: 5.5,
      front_brake_type: "Dual 300mm discs",
      rear_brake_type: "Single 250mm disc",
      front_tire_size: "120/70 ZR17",
      rear_tire_size: "180/55 ZR17",
      abs: true,
      traction_control: true,
      description: "Aggressive naked bike with superbike-derived engine",
    },
    {
      model_id: modelData.find((m) => m.slug === "s-1000-rr")?.id,
      variant_name: "M Package",
      year: 2024,
      slug: "s-1000-rr-m-2024",
      price_usd: 28395,
      engine_type: "Inline-4",
      engine_displacement_cc: 999,
      horsepower_hp: 210,
      torque_nm: 113,
      transmission_type: "6-speed",
      cooling_system: "Liquid-cooled",
      weight_kg: 197,
      seat_height_mm: 824,
      top_speed_kmh: 299,
      fuel_capacity_liters: 16.5,
      fuel_consumption_l_per_100km: 6.6,
      front_brake_type: "Dual 320mm discs, M calipers",
      rear_brake_type: "Single 220mm disc",
      front_tire_size: "120/70 ZR17",
      rear_tire_size: "200/55 ZR17",
      abs: true,
      traction_control: true,
      description: "German precision with M carbon wheels and full electronics",
    },
    {
      model_id: modelData.find((m) => m.slug === "r-1250-gs")?.id,
      variant_name: "Adventure",
      year: 2024,
      slug: "r-1250-gs-adventure-2024",
      price_usd: 21245,
      engine_type: "Boxer-Twin",
      engine_displacement_cc: 1254,
      horsepower_hp: 136,
      torque_nm: 143,
      transmission_type: "6-speed",
      cooling_system: "Liquid-cooled",
      weight_kg: 268,
      seat_height_mm: 890,
      top_speed_kmh: 200,
      fuel_capacity_liters: 30.0,
      fuel_consumption_l_per_100km: 4.9,
      front_brake_type: "Dual 305mm discs",
      rear_brake_type: "Single 276mm disc",
      front_tire_size: "120/70 R19",
      rear_tire_size: "170/60 R17",
      abs: true,
      traction_control: true,
      description:
        "The ultimate adventure touring machine with 30L fuel capacity",
    },
  ];

  const { data: variantData, error: variantError } = await supabase
    .from("motorbike_variants")
    .upsert(variants, { onConflict: "slug" })
    .select();

  if (variantError) {
    console.error("❌ Error seeding variants:", variantError);
    return;
  }

  console.log(`✅ Added ${variantData.length} variants`);
}

async function main() {
  console.log("🌱 Starting database seed...\n");

  await seedManufacturers();
  await seedMotorcycles();

  console.log("\n✅ Seeding complete!");
  process.exit(0);
}

main().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
