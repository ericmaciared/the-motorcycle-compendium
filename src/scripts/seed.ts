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
    {
      name: "Aprilia",
      slug: "aprilia",
      country: "Italy",
      founded_year: 1945,
      description:
        "Italian manufacturer known for racing success and innovative sport bikes.",
    },
    {
      name: "MV Agusta",
      slug: "mv-agusta",
      country: "Italy",
      founded_year: 1945,
      description:
        "Exclusive Italian brand producing high-performance motorcycles with racing heritage.",
    },
    {
      name: "Indian",
      slug: "indian",
      country: "USA",
      founded_year: 1901,
      description:
        "Historic American manufacturer of premium cruiser motorcycles.",
    },
    {
      name: "Moto Guzzi",
      slug: "moto-guzzi",
      country: "Italy",
      founded_year: 1921,
      description:
        "Italian manufacturer famous for transverse V-twin engines and classic styling.",
    },
    {
      name: "Husqvarna",
      slug: "husqvarna",
      country: "Sweden",
      founded_year: 1903,
      description:
        "Swedish brand specializing in off-road and dual-sport motorcycles.",
    },
    {
      name: "Benelli",
      slug: "benelli",
      country: "Italy",
      founded_year: 1911,
      description:
        "Italian manufacturer producing affordable motorcycles with Italian styling.",
    },
    {
      name: "Zero Motorcycles",
      slug: "zero",
      country: "USA",
      founded_year: 2006,
      description:
        "American pioneer in electric motorcycle technology.",
    },
    {
      name: "CFMoto",
      slug: "cfmoto",
      country: "China",
      founded_year: 1989,
      description:
        "Chinese manufacturer offering value-oriented motorcycles.",
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
  const suzuki = manufacturers.find((m) => m.slug === "suzuki");
  const harley = manufacturers.find((m) => m.slug === "harley-davidson");
  const ktm = manufacturers.find((m) => m.slug === "ktm");
  const triumph = manufacturers.find((m) => m.slug === "triumph");
  const royal_enfield = manufacturers.find((m) => m.slug === "royal-enfield");
  const aprilia = manufacturers.find((m) => m.slug === "aprilia");
  const mv_agusta = manufacturers.find((m) => m.slug === "mv-agusta");
  const indian = manufacturers.find((m) => m.slug === "indian");
  const moto_guzzi = manufacturers.find((m) => m.slug === "moto-guzzi");
  const husqvarna = manufacturers.find((m) => m.slug === "husqvarna");
  const benelli = manufacturers.find((m) => m.slug === "benelli");
  const zero = manufacturers.find((m) => m.slug === "zero");
  const cfmoto = manufacturers.find((m) => m.slug === "cfmoto");

  // Add models
  const models = [
    // Honda Models
    { manufacturer_id: honda?.id, name: "CBR1000RR-R", slug: "cbr1000rr-r", category: "Sport", year_start: 2020, description: "Ultimate superbike with MotoGP-derived technology" },
    { manufacturer_id: honda?.id, name: "CBR600RR", slug: "cbr600rr", category: "Sport", year_start: 2003, description: "Middleweight supersport champion" },
    { manufacturer_id: honda?.id, name: "Africa Twin", slug: "africa-twin", category: "Adventure", year_start: 2016, description: "Legendary adventure bike for on and off-road exploration" },
    { manufacturer_id: honda?.id, name: "CB650R", slug: "cb650r", category: "Naked", year_start: 2019, description: "Neo-sports cafe with inline-four power" },
    { manufacturer_id: honda?.id, name: "CB500X", slug: "cb500x", category: "Adventure", year_start: 2013, description: "Lightweight adventure bike for everyday riding" },
    { manufacturer_id: honda?.id, name: "CB1000R", slug: "cb1000r", category: "Naked", year_start: 2018, description: "Neo-sports cafe flagship with superbike engine" },
    { manufacturer_id: honda?.id, name: "Gold Wing", slug: "gold-wing", category: "Touring", year_start: 1975, description: "Luxury touring motorcycle with unmatched comfort" },
    { manufacturer_id: honda?.id, name: "Rebel 1100", slug: "rebel-1100", category: "Cruiser", year_start: 2021, description: "Modern cruiser with DCT option" },
    { manufacturer_id: honda?.id, name: "CRF450L", slug: "crf450l", category: "Dual-Sport", year_start: 2019, description: "Street-legal motocross performance" },
    { manufacturer_id: honda?.id, name: "NT1100", slug: "nt1100", category: "Sport Touring", year_start: 2022, description: "Sport touring with adventure capability" },

    // Yamaha Models
    { manufacturer_id: yamaha?.id, name: "YZF-R1", slug: "yzf-r1", category: "Sport", year_start: 1998, description: "Iconic superbike with crossplane crankshaft engine" },
    { manufacturer_id: yamaha?.id, name: "YZF-R7", slug: "yzf-r7", category: "Sport", year_start: 2021, description: "Middleweight sport bike with CP2 engine" },
    { manufacturer_id: yamaha?.id, name: "YZF-R6", slug: "yzf-r6", category: "Sport", year_start: 1999, description: "Legendary 600cc supersport" },
    { manufacturer_id: yamaha?.id, name: "MT-09", slug: "mt-09", category: "Naked", year_start: 2013, description: "Aggressive naked bike with triple-cylinder engine" },
    { manufacturer_id: yamaha?.id, name: "MT-07", slug: "mt-07", category: "Naked", year_start: 2014, description: "Lightweight naked with CP2 twin engine" },
    { manufacturer_id: yamaha?.id, name: "MT-10", slug: "mt-10", category: "Naked", year_start: 2016, description: "Hyper naked with R1-derived engine" },
    { manufacturer_id: yamaha?.id, name: "Tenere 700", slug: "tenere-700", category: "Adventure", year_start: 2019, description: "Rally-inspired adventure bike" },
    { manufacturer_id: yamaha?.id, name: "Tracer 9", slug: "tracer-9", category: "Sport Touring", year_start: 2021, description: "Sport touring with triple engine" },
    { manufacturer_id: yamaha?.id, name: "XSR900", slug: "xsr900", category: "Retro", year_start: 2016, description: "Retro sport with modern performance" },
    { manufacturer_id: yamaha?.id, name: "VMAX", slug: "vmax", category: "Cruiser", year_start: 1985, description: "Muscle cruiser with V4 power" },

    // Ducati Models
    { manufacturer_id: ducati?.id, name: "Panigale V4", slug: "panigale-v4", category: "Sport", year_start: 2018, description: "Italian superbike masterpiece with V4 engine" },
    { manufacturer_id: ducati?.id, name: "Panigale V2", slug: "panigale-v2", category: "Sport", year_start: 2020, description: "Middleweight superbike with L-Twin character" },
    { manufacturer_id: ducati?.id, name: "Streetfighter V4", slug: "streetfighter-v4", category: "Naked", year_start: 2020, description: "Naked superbike with aggressive styling" },
    { manufacturer_id: ducati?.id, name: "Monster", slug: "monster", category: "Naked", year_start: 1993, description: "Iconic naked bike that defined the genre" },
    { manufacturer_id: ducati?.id, name: "Multistrada V4", slug: "multistrada-v4", category: "Adventure", year_start: 2021, description: "Sport touring with V4 performance" },
    { manufacturer_id: ducati?.id, name: "Diavel V4", slug: "diavel-v4", category: "Cruiser", year_start: 2023, description: "Power cruiser with superbike engine" },
    { manufacturer_id: ducati?.id, name: "Scrambler 1100", slug: "scrambler-1100", category: "Retro", year_start: 2018, description: "Retro scrambler with modern tech" },
    { manufacturer_id: ducati?.id, name: "Hypermotard 950", slug: "hypermotard-950", category: "Supermoto", year_start: 2019, description: "Supermoto with L-Twin engine" },
    { manufacturer_id: ducati?.id, name: "SuperSport 950", slug: "supersport-950", category: "Sport Touring", year_start: 2021, description: "Everyday superbike for real-world riding" },
    { manufacturer_id: ducati?.id, name: "Desert X", slug: "desert-x", category: "Adventure", year_start: 2022, description: "Rally-inspired adventure bike" },

    // Kawasaki Models
    { manufacturer_id: kawasaki?.id, name: "Ninja ZX-10R", slug: "ninja-zx-10r", category: "Sport", year_start: 2004, description: "Race-bred superbike with championship pedigree" },
    { manufacturer_id: kawasaki?.id, name: "Ninja ZX-6R", slug: "ninja-zx-6r", category: "Sport", year_start: 1995, description: "Middleweight supersport icon" },
    { manufacturer_id: kawasaki?.id, name: "Ninja H2", slug: "ninja-h2", category: "Sport", year_start: 2015, description: "Supercharged hyperbike" },
    { manufacturer_id: kawasaki?.id, name: "Z900", slug: "z900", category: "Naked", year_start: 2017, description: "Modern naked bike with aggressive styling" },
    { manufacturer_id: kawasaki?.id, name: "Z650", slug: "z650", category: "Naked", year_start: 2017, description: "Lightweight naked for everyday riding" },
    { manufacturer_id: kawasaki?.id, name: "Z H2", slug: "z-h2", category: "Naked", year_start: 2020, description: "Supercharged naked hyperbike" },
    { manufacturer_id: kawasaki?.id, name: "Versys 1000", slug: "versys-1000", category: "Adventure", year_start: 2012, description: "Sport touring with adventure versatility" },
    { manufacturer_id: kawasaki?.id, name: "Ninja 400", slug: "ninja-400", category: "Sport", year_start: 2018, description: "Lightweight supersport for beginners" },
    { manufacturer_id: kawasaki?.id, name: "Vulcan S", slug: "vulcan-s", category: "Cruiser", year_start: 2015, description: "Cruiser with parallel-twin engine" },
    { manufacturer_id: kawasaki?.id, name: "KLR650", slug: "klr650", category: "Dual-Sport", year_start: 1987, description: "Legendary dual-sport adventure bike" },

    // BMW Models
    { manufacturer_id: bmw?.id, name: "S 1000 RR", slug: "s-1000-rr", category: "Sport", year_start: 2009, description: "German precision superbike with cutting-edge technology" },
    { manufacturer_id: bmw?.id, name: "R 1250 GS", slug: "r-1250-gs", category: "Adventure", year_start: 2018, description: "The ultimate adventure touring motorcycle" },
    { manufacturer_id: bmw?.id, name: "R 1250 RT", slug: "r-1250-rt", category: "Touring", year_start: 2019, description: "Luxury sport touring with boxer engine" },
    { manufacturer_id: bmw?.id, name: "F 900 R", slug: "f-900-r", category: "Naked", year_start: 2020, description: "Dynamic roadster with parallel-twin" },
    { manufacturer_id: bmw?.id, name: "S 1000 R", slug: "s-1000-r", category: "Naked", year_start: 2014, description: "Naked bike with superbike performance" },
    { manufacturer_id: bmw?.id, name: "R nineT", slug: "r-ninet", category: "Retro", year_start: 2014, description: "Heritage roadster with boxer engine" },
    { manufacturer_id: bmw?.id, name: "M 1000 RR", slug: "m-1000-rr", category: "Sport", year_start: 2021, description: "M Division superbike for the track" },
    { manufacturer_id: bmw?.id, name: "K 1600 GT", slug: "k-1600-gt", category: "Touring", year_start: 2011, description: "Luxury touring with inline-six engine" },
    { manufacturer_id: bmw?.id, name: "F 850 GS", slug: "f-850-gs", category: "Adventure", year_start: 2018, description: "Middleweight adventure bike" },
    { manufacturer_id: bmw?.id, name: "G 310 R", slug: "g-310-r", category: "Naked", year_start: 2016, description: "Entry-level roadster" },

    // Suzuki Models
    { manufacturer_id: suzuki?.id, name: "GSX-R1000", slug: "gsx-r1000", category: "Sport", year_start: 2001, description: "Legendary Gixxer superbike" },
    { manufacturer_id: suzuki?.id, name: "GSX-R600", slug: "gsx-r600", category: "Sport", year_start: 1992, description: "Middleweight supersport" },
    { manufacturer_id: suzuki?.id, name: "Hayabusa", slug: "hayabusa", category: "Sport", year_start: 1999, description: "Legendary hyperbike built for speed" },
    { manufacturer_id: suzuki?.id, name: "GSX-S1000", slug: "gsx-s1000", category: "Naked", year_start: 2015, description: "Naked bike with GSX-R heritage" },
    { manufacturer_id: suzuki?.id, name: "V-Strom 1050", slug: "v-strom-1050", category: "Adventure", year_start: 2020, description: "Adventure touring with V-twin power" },
    { manufacturer_id: suzuki?.id, name: "SV650", slug: "sv650", category: "Naked", year_start: 1999, description: "Versatile V-twin for all riders" },
    { manufacturer_id: suzuki?.id, name: "Katana", slug: "katana", category: "Naked", year_start: 2019, description: "Retro-modern design with sportbike soul" },
    { manufacturer_id: suzuki?.id, name: "Boulevard M109R", slug: "boulevard-m109r", category: "Cruiser", year_start: 2006, description: "Muscle cruiser with massive V-twin" },
    { manufacturer_id: suzuki?.id, name: "DR-Z400SM", slug: "dr-z400sm", category: "Supermoto", year_start: 2005, description: "Street legal supermoto" },
    { manufacturer_id: suzuki?.id, name: "GSX-8S", slug: "gsx-8s", category: "Naked", year_start: 2023, description: "New parallel-twin roadster" },

    // Harley-Davidson Models
    { manufacturer_id: harley?.id, name: "Road Glide", slug: "road-glide", category: "Touring", year_start: 1998, description: "Bagger with frame-mounted fairing" },
    { manufacturer_id: harley?.id, name: "Street Glide", slug: "street-glide", category: "Touring", year_start: 2006, description: "Classic touring bagger" },
    { manufacturer_id: harley?.id, name: "Fat Boy", slug: "fat-boy", category: "Cruiser", year_start: 1990, description: "Iconic cruiser with massive presence" },
    { manufacturer_id: harley?.id, name: "Sportster S", slug: "sportster-s", category: "Cruiser", year_start: 2021, description: "Modern Sportster with Revolution Max engine" },
    { manufacturer_id: harley?.id, name: "Pan America 1250", slug: "pan-america-1250", category: "Adventure", year_start: 2021, description: "Harley's first adventure bike" },
    { manufacturer_id: harley?.id, name: "LiveWire", slug: "livewire", category: "Electric", year_start: 2019, description: "Electric motorcycle pioneer" },
    { manufacturer_id: harley?.id, name: "Breakout", slug: "breakout", category: "Cruiser", year_start: 2013, description: "Drag-inspired power cruiser" },
    { manufacturer_id: harley?.id, name: "Road King", slug: "road-king", category: "Touring", year_start: 1994, description: "Classic touring with detachable windshield" },
    { manufacturer_id: harley?.id, name: "Low Rider S", slug: "low-rider-s", category: "Cruiser", year_start: 2020, description: "Performance cruiser with attitude" },
    { manufacturer_id: harley?.id, name: "Ultra Limited", slug: "ultra-limited", category: "Touring", year_start: 2011, description: "Fully-loaded luxury tourer" },

    // KTM Models
    { manufacturer_id: ktm?.id, name: "1290 Super Duke R", slug: "1290-super-duke-r", category: "Naked", year_start: 2014, description: "The Beast - hyper naked with V-twin power" },
    { manufacturer_id: ktm?.id, name: "890 Duke R", slug: "890-duke-r", category: "Naked", year_start: 2020, description: "Scalpel-sharp middleweight naked" },
    { manufacturer_id: ktm?.id, name: "390 Duke", slug: "390-duke", category: "Naked", year_start: 2013, description: "Lightweight naked for new riders" },
    { manufacturer_id: ktm?.id, name: "1290 Super Adventure S", slug: "1290-super-adventure-s", category: "Adventure", year_start: 2017, description: "High-performance adventure tourer" },
    { manufacturer_id: ktm?.id, name: "890 Adventure R", slug: "890-adventure-r", category: "Adventure", year_start: 2021, description: "Off-road focused adventure bike" },
    { manufacturer_id: ktm?.id, name: "RC 390", slug: "rc-390", category: "Sport", year_start: 2014, description: "Entry-level sport bike" },
    { manufacturer_id: ktm?.id, name: "690 SMC R", slug: "690-smc-r", category: "Supermoto", year_start: 2019, description: "Street supermoto single" },
    { manufacturer_id: ktm?.id, name: "450 SX-F", slug: "450-sx-f", category: "Motocross", year_start: 2007, description: "Motocross champion" },
    { manufacturer_id: ktm?.id, name: "500 EXC-F", slug: "500-exc-f", category: "Enduro", year_start: 2012, description: "Enduro powerhouse" },

    // Triumph Models
    { manufacturer_id: triumph?.id, name: "Speed Triple 1200 RS", slug: "speed-triple-1200-rs", category: "Naked", year_start: 2021, description: "British naked bike legend" },
    { manufacturer_id: triumph?.id, name: "Street Triple RS", slug: "street-triple-rs", category: "Naked", year_start: 2017, description: "Middleweight triple roadster" },
    { manufacturer_id: triumph?.id, name: "Daytona Moto2 765", slug: "daytona-moto2-765", category: "Sport", year_start: 2020, description: "Limited edition Moto2 replica" },
    { manufacturer_id: triumph?.id, name: "Tiger 1200", slug: "tiger-1200", category: "Adventure", year_start: 2022, description: "Adventure tourer with triple engine" },
    { manufacturer_id: triumph?.id, name: "Tiger 900", slug: "tiger-900", category: "Adventure", year_start: 2020, description: "Versatile adventure bike" },
    { manufacturer_id: triumph?.id, name: "Bonneville T120", slug: "bonneville-t120", category: "Retro", year_start: 2016, description: "Classic British roadster" },
    { manufacturer_id: triumph?.id, name: "Thruxton RS", slug: "thruxton-rs", category: "Retro", year_start: 2020, description: "Cafe racer with modern performance" },
    { manufacturer_id: triumph?.id, name: "Rocket 3", slug: "rocket-3", category: "Cruiser", year_start: 2019, description: "Massive 2500cc muscle cruiser" },
    { manufacturer_id: triumph?.id, name: "Scrambler 1200", slug: "scrambler-1200", category: "Retro", year_start: 2019, description: "Adventure-ready scrambler" },
    { manufacturer_id: triumph?.id, name: "Trident 660", slug: "trident-660", category: "Naked", year_start: 2021, description: "Accessible triple roadster" },

    // Royal Enfield Models
    { manufacturer_id: royal_enfield?.id, name: "Interceptor 650", slug: "interceptor-650", category: "Retro", year_start: 2018, description: "Classic parallel-twin roadster" },
    { manufacturer_id: royal_enfield?.id, name: "Continental GT 650", slug: "continental-gt-650", category: "Retro", year_start: 2018, description: "Cafe racer with twin engine" },
    { manufacturer_id: royal_enfield?.id, name: "Himalayan", slug: "himalayan", category: "Adventure", year_start: 2016, description: "Affordable adventure bike" },
    { manufacturer_id: royal_enfield?.id, name: "Classic 350", slug: "classic-350", category: "Retro", year_start: 2009, description: "Timeless classic design" },
    { manufacturer_id: royal_enfield?.id, name: "Meteor 350", slug: "meteor-350", category: "Cruiser", year_start: 2020, description: "Easy-going cruiser" },
    { manufacturer_id: royal_enfield?.id, name: "Super Meteor 650", slug: "super-meteor-650", category: "Cruiser", year_start: 2023, description: "Twin-cylinder cruiser" },
    { manufacturer_id: royal_enfield?.id, name: "Scram 411", slug: "scram-411", category: "Scrambler", year_start: 2022, description: "Urban scrambler" },

    // Aprilia Models
    { manufacturer_id: aprilia?.id, name: "RSV4", slug: "rsv4", category: "Sport", year_start: 2009, description: "V4 superbike with racing DNA" },
    { manufacturer_id: aprilia?.id, name: "RS 660", slug: "rs-660", category: "Sport", year_start: 2021, description: "Parallel-twin sport bike" },
    { manufacturer_id: aprilia?.id, name: "Tuono V4", slug: "tuono-v4", category: "Naked", year_start: 2011, description: "V4 naked bike with racing pedigree" },
    { manufacturer_id: aprilia?.id, name: "Tuono 660", slug: "tuono-660", category: "Naked", year_start: 2021, description: "Middleweight naked twin" },
    { manufacturer_id: aprilia?.id, name: "Dorsoduro 900", slug: "dorsoduro-900", category: "Supermoto", year_start: 2018, description: "V-twin supermoto" },
    { manufacturer_id: aprilia?.id, name: "Shiver 900", slug: "shiver-900", category: "Naked", year_start: 2017, description: "V-twin naked roadster" },

    // MV Agusta Models
    { manufacturer_id: mv_agusta?.id, name: "F4", slug: "f4", category: "Sport", year_start: 1999, description: "Exotic Italian superbike" },
    { manufacturer_id: mv_agusta?.id, name: "F3", slug: "f3", category: "Sport", year_start: 2012, description: "Triple-cylinder supersport" },
    { manufacturer_id: mv_agusta?.id, name: "Brutale 1000", slug: "brutale-1000", category: "Naked", year_start: 2019, description: "Inline-four hyper naked" },
    { manufacturer_id: mv_agusta?.id, name: "Dragster", slug: "dragster", category: "Naked", year_start: 2014, description: "Unique roadster design" },
    { manufacturer_id: mv_agusta?.id, name: "Superveloce", slug: "superveloce", category: "Sport", year_start: 2020, description: "Retro-modern sport bike" },
    { manufacturer_id: mv_agusta?.id, name: "Turismo Veloce", slug: "turismo-veloce", category: "Sport Touring", year_start: 2014, description: "Sport touring with Italian flair" },

    // Indian Models
    { manufacturer_id: indian?.id, name: "Chief", slug: "chief", category: "Cruiser", year_start: 2022, description: "Modern American cruiser" },
    { manufacturer_id: indian?.id, name: "Scout", slug: "scout", category: "Cruiser", year_start: 2015, description: "Middleweight American cruiser" },
    { manufacturer_id: indian?.id, name: "Challenger", slug: "challenger", category: "Bagger", year_start: 2020, description: "Power bagger with liquid-cooled V-twin" },
    { manufacturer_id: indian?.id, name: "FTR", slug: "ftr", category: "Naked", year_start: 2019, description: "Flat-track inspired roadster" },
    { manufacturer_id: indian?.id, name: "Roadmaster", slug: "roadmaster", category: "Touring", year_start: 2015, description: "Luxury touring cruiser" },
    { manufacturer_id: indian?.id, name: "Springfield", slug: "springfield", category: "Cruiser", year_start: 2016, description: "Versatile cruiser tourer" },

    // Moto Guzzi Models
    { manufacturer_id: moto_guzzi?.id, name: "V100 Mandello", slug: "v100-mandello", category: "Sport Touring", year_start: 2022, description: "Modern sport tourer with V-twin" },
    { manufacturer_id: moto_guzzi?.id, name: "V85 TT", slug: "v85-tt", category: "Adventure", year_start: 2019, description: "Classic adventure tourer" },
    { manufacturer_id: moto_guzzi?.id, name: "V7", slug: "v7", category: "Retro", year_start: 2008, description: "Classic Italian roadster" },
    { manufacturer_id: moto_guzzi?.id, name: "V9", slug: "v9", category: "Retro", year_start: 2016, description: "Retro cruiser/roadster" },
    { manufacturer_id: moto_guzzi?.id, name: "MGX-21", slug: "mgx-21", category: "Cruiser", year_start: 2016, description: "Bagger with transverse V-twin" },

    // Husqvarna Models
    { manufacturer_id: husqvarna?.id, name: "Vitpilen 701", slug: "vitpilen-701", category: "Naked", year_start: 2018, description: "Minimalist street bike" },
    { manufacturer_id: husqvarna?.id, name: "Svartpilen 701", slug: "svartpilen-701", category: "Scrambler", year_start: 2019, description: "Urban scrambler" },
    { manufacturer_id: husqvarna?.id, name: "Norden 901", slug: "norden-901", category: "Adventure", year_start: 2022, description: "Adventure bike with rally spirit" },
    { manufacturer_id: husqvarna?.id, name: "701 Enduro", slug: "701-enduro", category: "Enduro", year_start: 2016, description: "Street-legal enduro" },
    { manufacturer_id: husqvarna?.id, name: "701 Supermoto", slug: "701-supermoto", category: "Supermoto", year_start: 2016, description: "Single-cylinder supermoto" },

    // Benelli Models
    { manufacturer_id: benelli?.id, name: "TNT 600", slug: "tnt-600", category: "Naked", year_start: 2013, description: "Inline-four naked bike" },
    { manufacturer_id: benelli?.id, name: "Leoncino 500", slug: "leoncino-500", category: "Scrambler", year_start: 2018, description: "Retro scrambler" },
    { manufacturer_id: benelli?.id, name: "TRK 502", slug: "trk-502", category: "Adventure", year_start: 2017, description: "Affordable adventure bike" },
    { manufacturer_id: benelli?.id, name: "502C", slug: "502c", category: "Cruiser", year_start: 2019, description: "Parallel-twin cruiser" },

    // Zero Motorcycles Models
    { manufacturer_id: zero?.id, name: "SR/F", slug: "sr-f", category: "Electric", year_start: 2019, description: "Premium electric sportbike" },
    { manufacturer_id: zero?.id, name: "SR/S", slug: "sr-s", category: "Electric", year_start: 2020, description: "Electric sport tourer" },
    { manufacturer_id: zero?.id, name: "DSR", slug: "dsr", category: "Electric", year_start: 2015, description: "Electric dual-sport" },
    { manufacturer_id: zero?.id, name: "FX", slug: "fx", category: "Electric", year_start: 2011, description: "Electric supermoto" },

    // CFMoto Models
    { manufacturer_id: cfmoto?.id, name: "700 CL-X", slug: "700-cl-x", category: "Adventure", year_start: 2021, description: "Affordable adventure bike" },
    { manufacturer_id: cfmoto?.id, name: "300NK", slug: "300nk", category: "Naked", year_start: 2018, description: "Entry-level naked bike" },
    { manufacturer_id: cfmoto?.id, name: "650MT", slug: "650mt", category: "Adventure", year_start: 2020, description: "Middleweight adventure tourer" },
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

  // Add variants - comprehensive database with 100+ bikes
  const variants = [
    // Honda Variants
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
    // Additional Honda Variants
    { model_id: modelData.find((m) => m.slug === "cbr600rr")?.id, variant_name: "Standard", year: 2024, slug: "cbr600rr-standard-2024", price_usd: 12599, engine_type: "Inline-4", engine_displacement_cc: 599, horsepower_hp: 118, torque_nm: 64, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 194, seat_height_mm: 820, top_speed_kmh: 260, fuel_capacity_liters: 18.1, fuel_consumption_l_per_100km: 6.2, front_brake_type: "Dual 310mm discs", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Track-focused middleweight with race-derived chassis" },
    { model_id: modelData.find((m) => m.slug === "cb650r")?.id, variant_name: "Standard", year: 2024, slug: "cb650r-standard-2024", price_usd: 9499, engine_type: "Inline-4", engine_displacement_cc: 649, horsepower_hp: 94, torque_nm: 64, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 202, seat_height_mm: 810, top_speed_kmh: 210, fuel_capacity_liters: 15.4, fuel_consumption_l_per_100km: 5.0, front_brake_type: "Dual 310mm discs", rear_brake_type: "Single 240mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: false, description: "Neo-sports cafe styling with inline-four performance" },
    { model_id: modelData.find((m) => m.slug === "cb500x")?.id, variant_name: "Standard", year: 2024, slug: "cb500x-standard-2024", price_usd: 7199, engine_type: "Parallel-Twin", engine_displacement_cc: 471, horsepower_hp: 47, torque_nm: 43, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 197, seat_height_mm: 830, top_speed_kmh: 170, fuel_capacity_liters: 17.7, fuel_consumption_l_per_100km: 3.6, front_brake_type: "Single 296mm disc", rear_brake_type: "Single 240mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "160/60 ZR17", abs: true, traction_control: false, description: "Versatile adventure bike for daily riding" },
    { model_id: modelData.find((m) => m.slug === "cb1000r")?.id, variant_name: "Black Edition", year: 2024, slug: "cb1000r-black-2024", price_usd: 13999, engine_type: "Inline-4", engine_displacement_cc: 998, horsepower_hp: 143, torque_nm: 104, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 212, seat_height_mm: 830, top_speed_kmh: 240, fuel_capacity_liters: 16.2, fuel_consumption_l_per_100km: 5.6, front_brake_type: "Dual 310mm discs, Tokico calipers", rear_brake_type: "Single 256mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "190/55 ZR17", abs: true, traction_control: true, description: "Neo-sports cafe with superbike-derived engine" },
    { model_id: modelData.find((m) => m.slug === "gold-wing")?.id, variant_name: "Tour DCT", year: 2024, slug: "gold-wing-tour-dct-2024", price_usd: 31000, engine_type: "Flat-6", engine_displacement_cc: 1833, horsepower_hp: 126, torque_nm: 170, transmission_type: "7-speed DCT", cooling_system: "Liquid-cooled", weight_kg: 390, seat_height_mm: 745, top_speed_kmh: 195, fuel_capacity_liters: 21.1, fuel_consumption_l_per_100km: 5.8, front_brake_type: "Dual 320mm discs", rear_brake_type: "Dual 316mm discs", front_tire_size: "130/70 R18", rear_tire_size: "200/55 R16", abs: true, traction_control: true, description: "Ultimate luxury touring with DCT and reverse gear" },
    { model_id: modelData.find((m) => m.slug === "rebel-1100")?.id, variant_name: "DCT", year: 2024, slug: "rebel-1100-dct-2024", price_usd: 10299, engine_type: "Parallel-Twin", engine_displacement_cc: 1084, horsepower_hp: 86, torque_nm: 98, transmission_type: "6-speed DCT", cooling_system: "Liquid-cooled", weight_kg: 233, seat_height_mm: 700, top_speed_kmh: 180, fuel_capacity_liters: 13.6, fuel_consumption_l_per_100km: 4.7, front_brake_type: "Dual 330mm discs", rear_brake_type: "Single 256mm disc", front_tire_size: "130/90 B18", rear_tire_size: "180/65 B16", abs: true, traction_control: true, description: "Modern cruiser with optional DCT transmission" },
    { model_id: modelData.find((m) => m.slug === "crf450l")?.id, variant_name: "Standard", year: 2024, slug: "crf450l-standard-2024", price_usd: 10599, engine_type: "Single", engine_displacement_cc: 449, horsepower_hp: 45, torque_nm: 42, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 131, seat_height_mm: 925, top_speed_kmh: 145, fuel_capacity_liters: 7.6, fuel_consumption_l_per_100km: 4.2, front_brake_type: "Single 260mm disc", rear_brake_type: "Single 240mm disc", front_tire_size: "80/100-21", rear_tire_size: "120/80-18", abs: true, traction_control: false, description: "Street-legal motocross bike with championship DNA" },
    { model_id: modelData.find((m) => m.slug === "nt1100")?.id, variant_name: "DCT", year: 2024, slug: "nt1100-dct-2024", price_usd: 14399, engine_type: "Parallel-Twin", engine_displacement_cc: 1084, horsepower_hp: 101, torque_nm: 104, transmission_type: "6-speed DCT", cooling_system: "Liquid-cooled", weight_kg: 248, seat_height_mm: 820, top_speed_kmh: 200, fuel_capacity_liters: 20.4, fuel_consumption_l_per_100km: 4.9, front_brake_type: "Dual 310mm discs", rear_brake_type: "Single 256mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Sport tourer with Africa Twin engine and DCT" },

    // Yamaha Variants
    { model_id: modelData.find((m) => m.slug === "yzf-r7")?.id, variant_name: "Standard", year: 2024, slug: "yzf-r7-standard-2024", price_usd: 9199, engine_type: "Parallel-Twin", engine_displacement_cc: 689, horsepower_hp: 73, torque_nm: 67, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 188, seat_height_mm: 835, top_speed_kmh: 220, fuel_capacity_liters: 13.0, fuel_consumption_l_per_100km: 4.9, front_brake_type: "Dual 298mm discs", rear_brake_type: "Single 245mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Middleweight supersport with CP2 twin engine" },
    { model_id: modelData.find((m) => m.slug === "yzf-r6")?.id, variant_name: "Standard", year: 2024, slug: "yzf-r6-standard-2024", price_usd: 12199, engine_type: "Inline-4", engine_displacement_cc: 599, horsepower_hp: 117, torque_nm: 61, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 190, seat_height_mm: 850, top_speed_kmh: 262, fuel_capacity_liters: 17.0, fuel_consumption_l_per_100km: 6.3, front_brake_type: "Dual 320mm discs", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: false, description: "Track-focused 600 with race-bred chassis" },
    { model_id: modelData.find((m) => m.slug === "mt-07")?.id, variant_name: "Standard", year: 2024, slug: "mt-07-standard-2024", price_usd: 8199, engine_type: "Parallel-Twin", engine_displacement_cc: 689, horsepower_hp: 73, torque_nm: 67, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 184, seat_height_mm: 805, top_speed_kmh: 210, fuel_capacity_liters: 14.0, fuel_consumption_l_per_100km: 4.6, front_brake_type: "Dual 298mm discs", rear_brake_type: "Single 245mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: false, description: "Lightweight naked with torquey CP2 engine" },
    { model_id: modelData.find((m) => m.slug === "mt-10")?.id, variant_name: "SP", year: 2024, slug: "mt-10-sp-2024", price_usd: 15299, engine_type: "Inline-4", engine_displacement_cc: 998, horsepower_hp: 166, torque_nm: 112, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 212, seat_height_mm: 835, top_speed_kmh: 260, fuel_capacity_liters: 17.0, fuel_consumption_l_per_100km: 6.1, front_brake_type: "Dual 320mm discs, Brembo calipers", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "190/55 ZR17", abs: true, traction_control: true, description: "Hyper naked with R1-derived crossplane engine" },
    { model_id: modelData.find((m) => m.slug === "tenere-700")?.id, variant_name: "Standard", year: 2024, slug: "tenere-700-standard-2024", price_usd: 10799, engine_type: "Parallel-Twin", engine_displacement_cc: 689, horsepower_hp: 72, torque_nm: 68, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 204, seat_height_mm: 875, top_speed_kmh: 175, fuel_capacity_liters: 16.0, fuel_consumption_l_per_100km: 4.3, front_brake_type: "Dual 282mm discs", rear_brake_type: "Single 245mm disc", front_tire_size: "90/90-21", rear_tire_size: "150/70 R18", abs: true, traction_control: true, description: "Rally-inspired adventure bike with CP2 engine" },
    { model_id: modelData.find((m) => m.slug === "tracer-9")?.id, variant_name: "GT", year: 2024, slug: "tracer-9-gt-2024", price_usd: 14499, engine_type: "Inline-3", engine_displacement_cc: 890, horsepower_hp: 117, torque_nm: 93, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 220, seat_height_mm: 810, top_speed_kmh: 220, fuel_capacity_liters: 18.0, fuel_consumption_l_per_100km: 5.2, front_brake_type: "Dual 298mm discs", rear_brake_type: "Single 245mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Sport tourer with triple engine and luggage" },
    { model_id: modelData.find((m) => m.slug === "xsr900")?.id, variant_name: "Standard", year: 2024, slug: "xsr900-standard-2024", price_usd: 10499, engine_type: "Inline-3", engine_displacement_cc: 890, horsepower_hp: 117, torque_nm: 93, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 193, seat_height_mm: 815, top_speed_kmh: 225, fuel_capacity_liters: 14.0, fuel_consumption_l_per_100km: 5.3, front_brake_type: "Dual 298mm discs", rear_brake_type: "Single 245mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Retro-styled roadster with modern triple performance" },
    { model_id: modelData.find((m) => m.slug === "vmax")?.id, variant_name: "Standard", year: 2024, slug: "vmax-standard-2024", price_usd: 18999, engine_type: "V4", engine_displacement_cc: 1679, horsepower_hp: 197, torque_nm: 166, transmission_type: "5-speed", cooling_system: "Liquid-cooled", weight_kg: 310, seat_height_mm: 775, top_speed_kmh: 240, fuel_capacity_liters: 15.0, fuel_consumption_l_per_100km: 7.8, front_brake_type: "Dual 320mm discs", rear_brake_type: "Single 298mm disc", front_tire_size: "120/70 ZR18", rear_tire_size: "200/50 ZR18", abs: false, traction_control: false, description: "Legendary muscle cruiser with V4 power" },

    // Ducati Variants
    { model_id: modelData.find((m) => m.slug === "panigale-v2")?.id, variant_name: "Standard", year: 2024, slug: "panigale-v2-standard-2024", price_usd: 17495, engine_type: "L-Twin", engine_displacement_cc: 955, horsepower_hp: 155, torque_nm: 104, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 200, seat_height_mm: 840, top_speed_kmh: 270, fuel_capacity_liters: 17.0, fuel_consumption_l_per_100km: 6.0, front_brake_type: "Dual 320mm discs, Brembo M4.32", rear_brake_type: "Single 245mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/60 ZR17", abs: true, traction_control: true, description: "Middleweight superbike with Desmo L-Twin soul" },
    { model_id: modelData.find((m) => m.slug === "streetfighter-v4")?.id, variant_name: "S", year: 2024, slug: "streetfighter-v4-s-2024", price_usd: 29995, engine_type: "V4", engine_displacement_cc: 1103, horsepower_hp: 208, torque_nm: 123, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 201, seat_height_mm: 845, top_speed_kmh: 290, fuel_capacity_liters: 16.0, fuel_consumption_l_per_100km: 7.0, front_brake_type: "Dual 330mm discs, Brembo Stylema", rear_brake_type: "Single 245mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "200/60 ZR17", abs: true, traction_control: true, description: "Naked superbike with Panigale V4 engine" },
    { model_id: modelData.find((m) => m.slug === "multistrada-v4")?.id, variant_name: "S", year: 2024, slug: "multistrada-v4-s-2024", price_usd: 25995, engine_type: "V4", engine_displacement_cc: 1158, horsepower_hp: 170, torque_nm: 125, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 243, seat_height_mm: 840, top_speed_kmh: 270, fuel_capacity_liters: 22.0, fuel_consumption_l_per_100km: 5.4, front_brake_type: "Dual 330mm discs, Brembo", rear_brake_type: "Single 265mm disc", front_tire_size: "120/70 ZR19", rear_tire_size: "170/60 ZR17", abs: true, traction_control: true, description: "Sport adventure with V4 Granturismo engine" },
    { model_id: modelData.find((m) => m.slug === "diavel-v4")?.id, variant_name: "Standard", year: 2024, slug: "diavel-v4-standard-2024", price_usd: 26995, engine_type: "V4", engine_displacement_cc: 1158, horsepower_hp: 168, torque_nm: 126, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 236, seat_height_mm: 790, top_speed_kmh: 270, fuel_capacity_liters: 16.0, fuel_consumption_l_per_100km: 6.1, front_brake_type: "Dual 330mm discs, Brembo M50", rear_brake_type: "Single 265mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "240/45 ZR17", abs: true, traction_control: true, description: "Power cruiser with V4 Granturismo performance" },
    { model_id: modelData.find((m) => m.slug === "scrambler-1100")?.id, variant_name: "Sport", year: 2024, slug: "scrambler-1100-sport-2024", price_usd: 14495, engine_type: "L-Twin", engine_displacement_cc: 1079, horsepower_hp: 86, torque_nm: 88, transmission_type: "6-speed", cooling_system: "Air/Oil-cooled", weight_kg: 206, seat_height_mm: 810, top_speed_kmh: 190, fuel_capacity_liters: 15.0, fuel_consumption_l_per_100km: 5.0, front_brake_type: "Dual 330mm discs, Brembo", rear_brake_type: "Single 245mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Big-bore scrambler with modern electronics" },
    { model_id: modelData.find((m) => m.slug === "hypermotard-950")?.id, variant_name: "SP", year: 2024, slug: "hypermotard-950-sp-2024", price_usd: 16995, engine_type: "L-Twin", engine_displacement_cc: 937, horsepower_hp: 114, torque_nm: 96, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 200, seat_height_mm: 890, top_speed_kmh: 240, fuel_capacity_liters: 14.5, fuel_consumption_l_per_100km: 5.7, front_brake_type: "Dual 320mm discs, Brembo M4.32", rear_brake_type: "Single 245mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Supermoto with Öhlins suspension and track focus" },
    { model_id: modelData.find((m) => m.slug === "supersport-950")?.id, variant_name: "S", year: 2024, slug: "supersport-950-s-2024", price_usd: 15995, engine_type: "L-Twin", engine_displacement_cc: 937, horsepower_hp: 110, torque_nm: 93, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 210, seat_height_mm: 810, top_speed_kmh: 240, fuel_capacity_liters: 16.0, fuel_consumption_l_per_100km: 5.4, front_brake_type: "Dual 320mm discs, Brembo M4.32", rear_brake_type: "Single 245mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Everyday superbike with comfortable ergonomics" },
    { model_id: modelData.find((m) => m.slug === "desert-x")?.id, variant_name: "Standard", year: 2024, slug: "desert-x-standard-2024", price_usd: 16795, engine_type: "L-Twin", engine_displacement_cc: 937, horsepower_hp: 110, torque_nm: 92, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 223, seat_height_mm: 875, top_speed_kmh: 200, fuel_capacity_liters: 21.0, fuel_consumption_l_per_100km: 4.9, front_brake_type: "Dual 320mm discs, Brembo", rear_brake_type: "Single 265mm disc", front_tire_size: "90/90-21", rear_tire_size: "150/70 R18", abs: true, traction_control: true, description: "Rally-inspired adventure with Desert X heritage" },

    // Kawasaki Variants
    { model_id: modelData.find((m) => m.slug === "ninja-zx-6r")?.id, variant_name: "Standard", year: 2024, slug: "ninja-zx-6r-standard-2024", price_usd: 10999, engine_type: "Inline-4", engine_displacement_cc: 636, horsepower_hp: 126, torque_nm: 70, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 196, seat_height_mm: 830, top_speed_kmh: 260, fuel_capacity_liters: 17.0, fuel_consumption_l_per_100km: 6.1, front_brake_type: "Dual 310mm discs", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Middleweight supersport legend" },
    { model_id: modelData.find((m) => m.slug === "ninja-h2")?.id, variant_name: "Carbon", year: 2024, slug: "ninja-h2-carbon-2024", price_usd: 34500, engine_type: "Inline-4 Supercharged", engine_displacement_cc: 998, horsepower_hp: 228, torque_nm: 142, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 238, seat_height_mm: 825, top_speed_kmh: 337, fuel_capacity_liters: 17.0, fuel_consumption_l_per_100km: 8.2, front_brake_type: "Dual 330mm discs, Brembo M50", rear_brake_type: "Single 250mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "200/55 ZR17", abs: true, traction_control: true, description: "Supercharged hyperbike with carbon fiber bodywork" },
    { model_id: modelData.find((m) => m.slug === "z650")?.id, variant_name: "Standard", year: 2024, slug: "z650-standard-2024", price_usd: 7799, engine_type: "Parallel-Twin", engine_displacement_cc: 649, horsepower_hp: 67, torque_nm: 64, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 187, seat_height_mm: 790, top_speed_kmh: 200, fuel_capacity_liters: 15.0, fuel_consumption_l_per_100km: 4.7, front_brake_type: "Dual 300mm discs", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "160/60 ZR17", abs: true, traction_control: false, description: "Lightweight naked for everyday fun" },
    { model_id: modelData.find((m) => m.slug === "z-h2")?.id, variant_name: "Standard", year: 2024, slug: "z-h2-standard-2024", price_usd: 18500, engine_type: "Inline-4 Supercharged", engine_displacement_cc: 998, horsepower_hp: 200, torque_nm: 137, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 239, seat_height_mm: 830, top_speed_kmh: 299, fuel_capacity_liters: 19.0, fuel_consumption_l_per_100km: 7.5, front_brake_type: "Dual 320mm discs, Brembo M4.32", rear_brake_type: "Single 250mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "190/55 ZR17", abs: true, traction_control: true, description: "Supercharged naked hyperbike" },
    { model_id: modelData.find((m) => m.slug === "versys-1000")?.id, variant_name: "SE LT+", year: 2024, slug: "versys-1000-se-lt-plus-2024", price_usd: 16799, engine_type: "Inline-4", engine_displacement_cc: 1043, horsepower_hp: 120, torque_nm: 102, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 257, seat_height_mm: 840, top_speed_kmh: 215, fuel_capacity_liters: 21.0, fuel_consumption_l_per_100km: 5.6, front_brake_type: "Dual 310mm discs", rear_brake_type: "Single 250mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Adventure sport tourer with full luggage" },
    { model_id: modelData.find((m) => m.slug === "ninja-400")?.id, variant_name: "Standard", year: 2024, slug: "ninja-400-standard-2024", price_usd: 5299, engine_type: "Parallel-Twin", engine_displacement_cc: 399, horsepower_hp: 45, torque_nm: 38, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 168, seat_height_mm: 785, top_speed_kmh: 190, fuel_capacity_liters: 14.0, fuel_consumption_l_per_100km: 4.0, front_brake_type: "Single 310mm disc", rear_brake_type: "Single 220mm disc", front_tire_size: "110/70-17", rear_tire_size: "140/70-17", abs: true, traction_control: false, description: "Lightweight supersport for new riders" },
    { model_id: modelData.find((m) => m.slug === "vulcan-s")?.id, variant_name: "Cafe", year: 2024, slug: "vulcan-s-cafe-2024", price_usd: 7799, engine_type: "Parallel-Twin", engine_displacement_cc: 649, horsepower_hp: 61, torque_nm: 63, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 226, seat_height_mm: 705, top_speed_kmh: 180, fuel_capacity_liters: 14.0, fuel_consumption_l_per_100km: 4.5, front_brake_type: "Single 300mm disc", rear_brake_type: "Single 250mm disc", front_tire_size: "120/70-18", rear_tire_size: "160/60-16", abs: true, traction_control: false, description: "Cruiser with cafe racer styling and Ergo-Fit system" },
    { model_id: modelData.find((m) => m.slug === "klr650")?.id, variant_name: "Adventure", year: 2024, slug: "klr650-adventure-2024", price_usd: 7299, engine_type: "Single", engine_displacement_cc: 652, horsepower_hp: 47, torque_nm: 54, transmission_type: "5-speed", cooling_system: "Liquid-cooled", weight_kg: 206, seat_height_mm: 890, top_speed_kmh: 160, fuel_capacity_liters: 23.0, fuel_consumption_l_per_100km: 4.8, front_brake_type: "Single 300mm disc", rear_brake_type: "Single 240mm disc", front_tire_size: "90/90-21", rear_tire_size: "130/80-17", abs: true, traction_control: false, description: "Legendary dual-sport with massive fuel tank" },

    // BMW Variants
    { model_id: modelData.find((m) => m.slug === "r-1250-rt")?.id, variant_name: "Standard", year: 2024, slug: "r-1250-rt-standard-2024", price_usd: 19395, engine_type: "Boxer-Twin", engine_displacement_cc: 1254, horsepower_hp: 136, torque_nm: 143, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 281, seat_height_mm: 805, top_speed_kmh: 200, fuel_capacity_liters: 25.0, fuel_consumption_l_per_100km: 4.8, front_brake_type: "Dual 320mm discs", rear_brake_type: "Single 276mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Luxury sport tourer with boxer engine" },
    { model_id: modelData.find((m) => m.slug === "f-900-r")?.id, variant_name: "Standard", year: 2024, slug: "f-900-r-standard-2024", price_usd: 10145, engine_type: "Parallel-Twin", engine_displacement_cc: 895, horsepower_hp: 105, torque_nm: 92, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 211, seat_height_mm: 815, top_speed_kmh: 215, fuel_capacity_liters: 13.0, fuel_consumption_l_per_100km: 4.9, front_brake_type: "Dual 320mm discs", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Dynamic roadster with parallel-twin punch" },
    { model_id: modelData.find((m) => m.slug === "s-1000-r")?.id, variant_name: "Standard", year: 2024, slug: "s-1000-r-standard-2024", price_usd: 15245, engine_type: "Inline-4", engine_displacement_cc: 999, horsepower_hp: 165, torque_nm: 114, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 207, seat_height_mm: 830, top_speed_kmh: 250, fuel_capacity_liters: 16.5, fuel_consumption_l_per_100km: 6.0, front_brake_type: "Dual 320mm discs, M calipers", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "190/55 ZR17", abs: true, traction_control: true, description: "Naked bike with S 1000 RR performance" },
    { model_id: modelData.find((m) => m.slug === "r-ninet")?.id, variant_name: "Pure", year: 2024, slug: "r-ninet-pure-2024", price_usd: 12695, engine_type: "Boxer-Twin", engine_displacement_cc: 1170, horsepower_hp: 109, torque_nm: 116, transmission_type: "6-speed", cooling_system: "Air/Oil-cooled", weight_kg: 220, seat_height_mm: 805, top_speed_kmh: 200, fuel_capacity_liters: 17.0, fuel_consumption_l_per_100km: 5.1, front_brake_type: "Dual 320mm discs", rear_brake_type: "Single 265mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: false, description: "Heritage roadster with classic boxer styling" },
    { model_id: modelData.find((m) => m.slug === "m-1000-rr")?.id, variant_name: "Standard", year: 2024, slug: "m-1000-rr-standard-2024", price_usd: 36995, engine_type: "Inline-4", engine_displacement_cc: 999, horsepower_hp: 212, torque_nm: 113, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 192, seat_height_mm: 832, top_speed_kmh: 306, fuel_capacity_liters: 16.5, fuel_consumption_l_per_100km: 6.8, front_brake_type: "Dual 320mm discs, M calipers", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "200/55 ZR17", abs: true, traction_control: true, description: "M Division track weapon with carbon everything" },
    { model_id: modelData.find((m) => m.slug === "k-1600-gt")?.id, variant_name: "Standard", year: 2024, slug: "k-1600-gt-standard-2024", price_usd: 23495, engine_type: "Inline-6", engine_displacement_cc: 1649, horsepower_hp: 160, torque_nm: 175, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 348, seat_height_mm: 750, top_speed_kmh: 240, fuel_capacity_liters: 26.5, fuel_consumption_l_per_100km: 5.7, front_brake_type: "Dual 320mm discs", rear_brake_type: "Single 320mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "190/55 ZR17", abs: true, traction_control: true, description: "Luxury tourer with silky inline-six engine" },
    { model_id: modelData.find((m) => m.slug === "f-850-gs")?.id, variant_name: "Adventure", year: 2024, slug: "f-850-gs-adventure-2024", price_usd: 14795, engine_type: "Parallel-Twin", engine_displacement_cc: 853, horsepower_hp: 95, torque_nm: 92, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 244, seat_height_mm: 875, top_speed_kmh: 200, fuel_capacity_liters: 23.0, fuel_consumption_l_per_100km: 4.5, front_brake_type: "Dual 305mm discs", rear_brake_type: "Single 265mm disc", front_tire_size: "90/90-21", rear_tire_size: "150/70 R17", abs: true, traction_control: true, description: "Middleweight adventure with large fuel tank" },
    { model_id: modelData.find((m) => m.slug === "g-310-r")?.id, variant_name: "Standard", year: 2024, slug: "g-310-r-standard-2024", price_usd: 4995, engine_type: "Single", engine_displacement_cc: 313, horsepower_hp: 34, torque_nm: 28, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 158, seat_height_mm: 785, top_speed_kmh: 145, fuel_capacity_liters: 11.0, fuel_consumption_l_per_100km: 3.4, front_brake_type: "Single 300mm disc", rear_brake_type: "Single 240mm disc", front_tire_size: "110/70-17", rear_tire_size: "150/60-17", abs: true, traction_control: false, description: "Entry-level roadster with premium BMW quality" },

    // Suzuki Variants
    { model_id: modelData.find((m) => m.slug === "gsx-r1000")?.id, variant_name: "R", year: 2024, slug: "gsx-r1000-r-2024", price_usd: 17699, engine_type: "Inline-4", engine_displacement_cc: 999, horsepower_hp: 202, torque_nm: 118, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 203, seat_height_mm: 825, top_speed_kmh: 299, fuel_capacity_liters: 16.0, fuel_consumption_l_per_100km: 6.7, front_brake_type: "Dual 320mm discs, Brembo", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "190/55 ZR17", abs: true, traction_control: true, description: "Legendary Gixxer with MotoGP technology" },
    { model_id: modelData.find((m) => m.slug === "gsx-r600")?.id, variant_name: "Standard", year: 2024, slug: "gsx-r600-standard-2024", price_usd: 11599, engine_type: "Inline-4", engine_displacement_cc: 599, horsepower_hp: 126, torque_nm: 69, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 187, seat_height_mm: 810, top_speed_kmh: 260, fuel_capacity_liters: 17.0, fuel_consumption_l_per_100km: 6.0, front_brake_type: "Dual 310mm discs", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: false, description: "Middleweight supersport with race heritage" },
    { model_id: modelData.find((m) => m.slug === "hayabusa")?.id, variant_name: "Standard", year: 2024, slug: "hayabusa-standard-2024", price_usd: 18599, engine_type: "Inline-4", engine_displacement_cc: 1340, horsepower_hp: 190, torque_nm: 150, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 264, seat_height_mm: 800, top_speed_kmh: 299, fuel_capacity_liters: 20.0, fuel_consumption_l_per_100km: 6.5, front_brake_type: "Dual 320mm discs, Brembo", rear_brake_type: "Single 260mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "190/50 ZR17", abs: true, traction_control: true, description: "Legendary hyperbike with ultimate top speed" },
    { model_id: modelData.find((m) => m.slug === "gsx-s1000")?.id, variant_name: "GT", year: 2024, slug: "gsx-s1000-gt-2024", price_usd: 13699, engine_type: "Inline-4", engine_displacement_cc: 999, horsepower_hp: 152, torque_nm: 106, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 226, seat_height_mm: 810, top_speed_kmh: 240, fuel_capacity_liters: 19.0, fuel_consumption_l_per_100km: 5.8, front_brake_type: "Dual 310mm discs, Brembo", rear_brake_type: "Single 250mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "190/50 ZR17", abs: true, traction_control: true, description: "Sport touring with GSX-R derived engine" },
    { model_id: modelData.find((m) => m.slug === "v-strom-1050")?.id, variant_name: "XT", year: 2024, slug: "v-strom-1050-xt-2024", price_usd: 15449, engine_type: "V-Twin", engine_displacement_cc: 1037, horsepower_hp: 107, torque_nm: 100, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 247, seat_height_mm: 850, top_speed_kmh: 200, fuel_capacity_liters: 20.0, fuel_consumption_l_per_100km: 5.2, front_brake_type: "Dual 310mm discs", rear_brake_type: "Single 260mm disc", front_tire_size: "110/80 R19", rear_tire_size: "150/70 R17", abs: true, traction_control: true, description: "Adventure tourer with V-Twin character" },
    { model_id: modelData.find((m) => m.slug === "sv650")?.id, variant_name: "X", year: 2024, slug: "sv650-x-2024", price_usd: 7999, engine_type: "V-Twin", engine_displacement_cc: 645, horsepower_hp: 75, torque_nm: 64, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 197, seat_height_mm: 785, top_speed_kmh: 200, fuel_capacity_liters: 14.5, fuel_consumption_l_per_100km: 4.8, front_brake_type: "Dual 290mm discs", rear_brake_type: "Single 240mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "160/60 ZR17", abs: true, traction_control: false, description: "Versatile V-twin with modern styling" },
    { model_id: modelData.find((m) => m.slug === "katana")?.id, variant_name: "Standard", year: 2024, slug: "katana-standard-2024", price_usd: 13699, engine_type: "Inline-4", engine_displacement_cc: 999, horsepower_hp: 152, torque_nm: 106, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 215, seat_height_mm: 825, top_speed_kmh: 240, fuel_capacity_liters: 12.0, fuel_consumption_l_per_100km: 5.7, front_brake_type: "Dual 310mm discs, Brembo", rear_brake_type: "Single 250mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "190/50 ZR17", abs: true, traction_control: true, description: "Iconic design with GSX-S1000 performance" },
    { model_id: modelData.find((m) => m.slug === "boulevard-m109r")?.id, variant_name: "Boss", year: 2024, slug: "boulevard-m109r-boss-2024", price_usd: 14899, engine_type: "V-Twin", engine_displacement_cc: 1783, horsepower_hp: 125, torque_nm: 160, transmission_type: "5-speed", cooling_system: "Liquid-cooled", weight_kg: 347, seat_height_mm: 705, top_speed_kmh: 200, fuel_capacity_liters: 19.5, fuel_consumption_l_per_100km: 6.5, front_brake_type: "Dual 310mm discs", rear_brake_type: "Single 275mm disc", front_tire_size: "130/70 R18", rear_tire_size: "240/40 R18", abs: true, traction_control: false, description: "Muscle cruiser with massive 1783cc V-twin" },
    { model_id: modelData.find((m) => m.slug === "dr-z400sm")?.id, variant_name: "Standard", year: 2024, slug: "dr-z400sm-standard-2024", price_usd: 9799, engine_type: "Single", engine_displacement_cc: 398, horsepower_hp: 40, torque_nm: 36, transmission_type: "5-speed", cooling_system: "Liquid-cooled", weight_kg: 144, seat_height_mm: 895, top_speed_kmh: 160, fuel_capacity_liters: 10.0, fuel_consumption_l_per_100km: 5.2, front_brake_type: "Single 310mm disc", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70-17", rear_tire_size: "150/60-17", abs: false, traction_control: false, description: "Street-legal supermoto fun machine" },
    { model_id: modelData.find((m) => m.slug === "gsx-8s")?.id, variant_name: "Standard", year: 2024, slug: "gsx-8s-standard-2024", price_usd: 9799, engine_type: "Parallel-Twin", engine_displacement_cc: 776, horsepower_hp: 83, torque_nm: 78, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 202, seat_height_mm: 810, top_speed_kmh: 210, fuel_capacity_liters: 14.0, fuel_consumption_l_per_100km: 4.6, front_brake_type: "Dual 310mm discs", rear_brake_type: "Single 240mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "160/60 ZR17", abs: true, traction_control: true, description: "New parallel-twin roadster platform" },

    // Harley-Davidson Variants
    { model_id: modelData.find((m) => m.slug === "road-glide")?.id, variant_name: "Limited", year: 2024, slug: "road-glide-limited-2024", price_usd: 30499, engine_type: "V-Twin", engine_displacement_cc: 1923, horsepower_hp: 100, torque_nm: 168, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 408, seat_height_mm: 685, top_speed_kmh: 185, fuel_capacity_liters: 22.7, fuel_consumption_l_per_100km: 5.9, front_brake_type: "Dual 300mm discs, Brembo", rear_brake_type: "Single 300mm disc", front_tire_size: "130/60 B19", rear_tire_size: "180/55 B18", abs: true, traction_control: true, description: "Touring bagger with frame-mounted fairing" },
    { model_id: modelData.find((m) => m.slug === "street-glide")?.id, variant_name: "ST", year: 2024, slug: "street-glide-st-2024", price_usd: 29999, engine_type: "V-Twin", engine_displacement_cc: 1923, horsepower_hp: 100, torque_nm: 168, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 377, seat_height_mm: 685, top_speed_kmh: 185, fuel_capacity_liters: 22.7, fuel_consumption_l_per_100km: 5.8, front_brake_type: "Dual 300mm discs, Brembo", rear_brake_type: "Single 300mm disc", front_tire_size: "130/60 B19", rear_tire_size: "180/55 B18", abs: true, traction_control: true, description: "Classic touring bagger with modern tech" },
    { model_id: modelData.find((m) => m.slug === "fat-boy")?.id, variant_name: "114", year: 2024, slug: "fat-boy-114-2024", price_usd: 20999, engine_type: "V-Twin", engine_displacement_cc: 1868, horsepower_hp: 94, torque_nm: 155, transmission_type: "6-speed", cooling_system: "Air/Oil-cooled", weight_kg: 317, seat_height_mm: 675, top_speed_kmh: 175, fuel_capacity_liters: 18.9, fuel_consumption_l_per_100km: 5.5, front_brake_type: "Single 300mm disc", rear_brake_type: "Single 292mm disc", front_tire_size: "160/60 B17", rear_tire_size: "240/40 R18", abs: true, traction_control: false, description: "Iconic muscle cruiser with massive presence" },
    { model_id: modelData.find((m) => m.slug === "sportster-s")?.id, variant_name: "Standard", year: 2024, slug: "sportster-s-standard-2024", price_usd: 15999, engine_type: "V-Twin", engine_displacement_cc: 1252, horsepower_hp: 121, torque_nm: 125, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 228, seat_height_mm: 755, top_speed_kmh: 200, fuel_capacity_liters: 11.8, fuel_consumption_l_per_100km: 5.3, front_brake_type: "Single 320mm disc, Brembo", rear_brake_type: "Single 260mm disc", front_tire_size: "160/70 R17", rear_tire_size: "180/70 R16", abs: true, traction_control: true, description: "Modern Sportster with Revolution Max 1250T engine" },
    { model_id: modelData.find((m) => m.slug === "pan-america-1250")?.id, variant_name: "Special", year: 2024, slug: "pan-america-1250-special-2024", price_usd: 18999, engine_type: "V-Twin", engine_displacement_cc: 1252, horsepower_hp: 150, torque_nm: 128, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 258, seat_height_mm: 850, top_speed_kmh: 215, fuel_capacity_liters: 21.2, fuel_consumption_l_per_100km: 5.4, front_brake_type: "Dual 320mm discs, Brembo", rear_brake_type: "Single 280mm disc", front_tire_size: "90/90-21", rear_tire_size: "150/70 R18", abs: true, traction_control: true, description: "Harley's first adventure bike with Revolution Max" },
    { model_id: modelData.find((m) => m.slug === "livewire")?.id, variant_name: "One", year: 2024, slug: "livewire-one-2024", price_usd: 17699, engine_type: "Electric", engine_displacement_cc: 0, horsepower_hp: 84, torque_nm: 194, transmission_type: "Direct Drive", cooling_system: "Liquid-cooled Battery", weight_kg: 225, seat_height_mm: 780, top_speed_kmh: 153, fuel_capacity_liters: 0, fuel_consumption_l_per_100km: 0, front_brake_type: "Single 300mm disc, Brembo", rear_brake_type: "Single 260mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Electric motorcycle with instant torque" },
    { model_id: modelData.find((m) => m.slug === "breakout")?.id, variant_name: "117", year: 2024, slug: "breakout-117-2024", price_usd: 22499, engine_type: "V-Twin", engine_displacement_cc: 1923, horsepower_hp: 100, torque_nm: 166, transmission_type: "6-speed", cooling_system: "Air/Oil-cooled", weight_kg: 310, seat_height_mm: 670, top_speed_kmh: 180, fuel_capacity_liters: 13.2, fuel_consumption_l_per_100km: 5.7, front_brake_type: "Single 300mm disc", rear_brake_type: "Single 260mm disc", front_tire_size: "130/60 B21", rear_tire_size: "240/40 R18", abs: true, traction_control: false, description: "Drag-style power cruiser with 117 Milwaukee-Eight" },
    { model_id: modelData.find((m) => m.slug === "road-king")?.id, variant_name: "Special", year: 2024, slug: "road-king-special-2024", price_usd: 23499, engine_type: "V-Twin", engine_displacement_cc: 1868, horsepower_hp: 94, torque_nm: 155, transmission_type: "6-speed", cooling_system: "Air/Oil-cooled", weight_kg: 370, seat_height_mm: 685, top_speed_kmh: 180, fuel_capacity_liters: 22.7, fuel_consumption_l_per_100km: 5.6, front_brake_type: "Dual 300mm discs", rear_brake_type: "Single 300mm disc", front_tire_size: "130/60 B19", rear_tire_size: "180/55 B18", abs: true, traction_control: false, description: "Classic touring with detachable windshield" },
    { model_id: modelData.find((m) => m.slug === "low-rider-s")?.id, variant_name: "ST", year: 2024, slug: "low-rider-s-st-2024", price_usd: 19999, engine_type: "V-Twin", engine_displacement_cc: 1923, horsepower_hp: 92, torque_nm: 155, transmission_type: "6-speed", cooling_system: "Air/Oil-cooled", weight_kg: 299, seat_height_mm: 660, top_speed_kmh: 185, fuel_capacity_liters: 13.2, fuel_consumption_l_per_100km: 5.4, front_brake_type: "Dual 300mm discs", rear_brake_type: "Single 260mm disc", front_tire_size: "130/60 B19", rear_tire_size: "180/70 B16", abs: true, traction_control: true, description: "Performance cruiser with aggressive styling" },
    { model_id: modelData.find((m) => m.slug === "ultra-limited")?.id, variant_name: "Standard", year: 2024, slug: "ultra-limited-standard-2024", price_usd: 31499, engine_type: "V-Twin", engine_displacement_cc: 1923, horsepower_hp: 100, torque_nm: 168, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 425, seat_height_mm: 690, top_speed_kmh: 180, fuel_capacity_liters: 22.7, fuel_consumption_l_per_100km: 6.0, front_brake_type: "Dual 300mm discs, Brembo", rear_brake_type: "Single 300mm disc", front_tire_size: "130/60 B19", rear_tire_size: "180/55 B18", abs: true, traction_control: true, description: "Fully-loaded luxury tourer with all amenities" },

    // KTM Variants
    { model_id: modelData.find((m) => m.slug === "1290-super-duke-r")?.id, variant_name: "EVO", year: 2024, slug: "1290-super-duke-r-evo-2024", price_usd: 19999, engine_type: "V-Twin", engine_displacement_cc: 1301, horsepower_hp: 180, torque_nm: 140, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 189, seat_height_mm: 835, top_speed_kmh: 280, fuel_capacity_liters: 16.0, fuel_consumption_l_per_100km: 6.3, front_brake_type: "Dual 320mm discs, Brembo M50", rear_brake_type: "Single 240mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "190/55 ZR17", abs: true, traction_control: true, description: "The Beast - hyper naked with 180hp V-twin" },
    { model_id: modelData.find((m) => m.slug === "890-duke-r")?.id, variant_name: "Standard", year: 2024, slug: "890-duke-r-standard-2024", price_usd: 12999, engine_type: "Parallel-Twin", engine_displacement_cc: 889, horsepower_hp: 121, torque_nm: 99, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 166, seat_height_mm: 834, top_speed_kmh: 240, fuel_capacity_liters: 14.0, fuel_consumption_l_per_100km: 4.9, front_brake_type: "Dual 320mm discs, Brembo", rear_brake_type: "Single 240mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Scalpel-sharp middleweight with track focus" },
    { model_id: modelData.find((m) => m.slug === "390-duke")?.id, variant_name: "Standard", year: 2024, slug: "390-duke-standard-2024", price_usd: 5799, engine_type: "Single", engine_displacement_cc: 373, horsepower_hp: 44, torque_nm: 37, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 149, seat_height_mm: 830, top_speed_kmh: 167, fuel_capacity_liters: 13.4, fuel_consumption_l_per_100km: 3.5, front_brake_type: "Single 320mm disc, ByBre", rear_brake_type: "Single 230mm disc", front_tire_size: "110/70-17", rear_tire_size: "150/60-17", abs: true, traction_control: false, description: "Entry-level naked with race-bred chassis" },
    { model_id: modelData.find((m) => m.slug === "1290-super-adventure-s")?.id, variant_name: "Standard", year: 2024, slug: "1290-super-adventure-s-standard-2024", price_usd: 19999, engine_type: "V-Twin", engine_displacement_cc: 1301, horsepower_hp: 160, torque_nm: 138, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 249, seat_height_mm: 849, top_speed_kmh: 220, fuel_capacity_liters: 23.0, fuel_consumption_l_per_100km: 5.2, front_brake_type: "Dual 320mm discs, Brembo", rear_brake_type: "Single 267mm disc", front_tire_size: "90/90-21", rear_tire_size: "150/70-18", abs: true, traction_control: true, description: "Performance adventure tourer with V-twin power" },
    { model_id: modelData.find((m) => m.slug === "890-adventure-r")?.id, variant_name: "Standard", year: 2024, slug: "890-adventure-r-standard-2024", price_usd: 14999, engine_type: "Parallel-Twin", engine_displacement_cc: 889, horsepower_hp: 105, torque_nm: 100, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 196, seat_height_mm: 880, top_speed_kmh: 200, fuel_capacity_liters: 20.0, fuel_consumption_l_per_100km: 4.6, front_brake_type: "Single 320mm disc, Brembo", rear_brake_type: "Single 260mm disc", front_tire_size: "90/90-21", rear_tire_size: "150/70-18", abs: true, traction_control: true, description: "Off-road focused adventure with rally pedigree" },
    { model_id: modelData.find((m) => m.slug === "rc-390")?.id, variant_name: "Standard", year: 2024, slug: "rc-390-standard-2024", price_usd: 6299, engine_type: "Single", engine_displacement_cc: 373, horsepower_hp: 44, torque_nm: 37, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 172, seat_height_mm: 820, top_speed_kmh: 170, fuel_capacity_liters: 13.7, fuel_consumption_l_per_100km: 3.8, front_brake_type: "Single 320mm disc, ByBre", rear_brake_type: "Single 230mm disc", front_tire_size: "110/70-17", rear_tire_size: "150/60-17", abs: true, traction_control: false, description: "Entry-level sport bike with racing DNA" },

    // Triumph Variants
    { model_id: modelData.find((m) => m.slug === "speed-triple-1200-rs")?.id, variant_name: "Standard", year: 2024, slug: "speed-triple-1200-rs-standard-2024", price_usd: 18500, engine_type: "Inline-3", engine_displacement_cc: 1160, horsepower_hp: 178, torque_nm: 125, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 199, seat_height_mm: 830, top_speed_kmh: 260, fuel_capacity_liters: 15.5, fuel_consumption_l_per_100km: 5.7, front_brake_type: "Dual 320mm discs, Brembo Stylema", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "190/55 ZR17", abs: true, traction_control: true, description: "British naked bike legend with 178hp triple" },
    { model_id: modelData.find((m) => m.slug === "street-triple-rs")?.id, variant_name: "Standard", year: 2024, slug: "street-triple-rs-standard-2024", price_usd: 13250, engine_type: "Inline-3", engine_displacement_cc: 765, horsepower_hp: 121, torque_nm: 79, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 187, seat_height_mm: 826, top_speed_kmh: 225, fuel_capacity_liters: 17.4, fuel_consumption_l_per_100km: 5.2, front_brake_type: "Dual 310mm discs, Brembo M50", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Middleweight triple with track-ready suspension" },
    { model_id: modelData.find((m) => m.slug === "tiger-1200")?.id, variant_name: "GT Explorer", year: 2024, slug: "tiger-1200-gt-explorer-2024", price_usd: 20900, engine_type: "Inline-3", engine_displacement_cc: 1160, horsepower_hp: 150, torque_nm: 130, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 255, seat_height_mm: 850, top_speed_kmh: 225, fuel_capacity_liters: 20.0, fuel_consumption_l_per_100km: 5.0, front_brake_type: "Dual 320mm discs, Brembo", rear_brake_type: "Single 282mm disc", front_tire_size: "90/90-21", rear_tire_size: "150/70-18", abs: true, traction_control: true, description: "Adventure tourer with triple power and tech" },
    { model_id: modelData.find((m) => m.slug === "tiger-900")?.id, variant_name: "Rally Pro", year: 2024, slug: "tiger-900-rally-pro-2024", price_usd: 16250, engine_type: "Inline-3", engine_displacement_cc: 888, horsepower_hp: 95, torque_nm: 87, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 201, seat_height_mm: 850, top_speed_kmh: 200, fuel_capacity_liters: 20.0, fuel_consumption_l_per_100km: 4.7, front_brake_type: "Dual 320mm discs, Brembo", rear_brake_type: "Single 255mm disc", front_tire_size: "90/90-21", rear_tire_size: "150/70-17", abs: true, traction_control: true, description: "Rally-ready adventure with Showa suspension" },
    { model_id: modelData.find((m) => m.slug === "bonneville-t120")?.id, variant_name: "Standard", year: 2024, slug: "bonneville-t120-standard-2024", price_usd: 11450, engine_type: "Parallel-Twin", engine_displacement_cc: 1200, horsepower_hp: 80, torque_nm: 105, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 236, seat_height_mm: 790, top_speed_kmh: 190, fuel_capacity_liters: 14.5, fuel_consumption_l_per_100km: 4.8, front_brake_type: "Dual 310mm discs", rear_brake_type: "Single 255mm disc", front_tire_size: "100/90-18", rear_tire_size: "150/70-17", abs: true, traction_control: true, description: "Classic British roadster with modern reliability" },
    { model_id: modelData.find((m) => m.slug === "thruxton-rs")?.id, variant_name: "Standard", year: 2024, slug: "thruxton-rs-standard-2024", price_usd: 15700, engine_type: "Parallel-Twin", engine_displacement_cc: 1200, horsepower_hp: 105, torque_nm: 112, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 203, seat_height_mm: 810, top_speed_kmh: 215, fuel_capacity_liters: 14.5, fuel_consumption_l_per_100km: 5.0, front_brake_type: "Dual 310mm discs, Brembo M50", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "160/60 ZR17", abs: true, traction_control: true, description: "Cafe racer with Öhlins and Brembo equipment" },
    { model_id: modelData.find((m) => m.slug === "rocket-3")?.id, variant_name: "R", year: 2024, slug: "rocket-3-r-2024", price_usd: 24500, engine_type: "Inline-3", engine_displacement_cc: 2458, horsepower_hp: 165, torque_nm: 221, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 291, seat_height_mm: 750, top_speed_kmh: 225, fuel_capacity_liters: 18.0, fuel_consumption_l_per_100km: 6.2, front_brake_type: "Dual 320mm discs, Brembo M50", rear_brake_type: "Single 300mm disc", front_tire_size: "150/70 R17", rear_tire_size: "240/50 R16", abs: true, traction_control: true, description: "World's largest production motorcycle at 2458cc" },
    { model_id: modelData.find((m) => m.slug === "scrambler-1200")?.id, variant_name: "XE", year: 2024, slug: "scrambler-1200-xe-2024", price_usd: 15250, engine_type: "Parallel-Twin", engine_displacement_cc: 1200, horsepower_hp: 89, torque_nm: 110, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 207, seat_height_mm: 860, top_speed_kmh: 190, fuel_capacity_liters: 16.0, fuel_consumption_l_per_100km: 4.9, front_brake_type: "Dual 320mm discs, Brembo", rear_brake_type: "Single 255mm disc", front_tire_size: "90/90-21", rear_tire_size: "150/70-17", abs: true, traction_control: true, description: "Adventure-ready scrambler with off-road capability" },
    { model_id: modelData.find((m) => m.slug === "trident-660")?.id, variant_name: "Standard", year: 2024, slug: "trident-660-standard-2024", price_usd: 8795, engine_type: "Inline-3", engine_displacement_cc: 660, horsepower_hp: 81, torque_nm: 64, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 189, seat_height_mm: 805, top_speed_kmh: 210, fuel_capacity_liters: 14.0, fuel_consumption_l_per_100km: 4.5, front_brake_type: "Dual 310mm discs, Nissin", rear_brake_type: "Single 255mm disc", front_tire_size: "120/70-17", rear_tire_size: "180/55-17", abs: true, traction_control: true, description: "Accessible triple roadster with modern styling" },

    // Royal Enfield Variants
    { model_id: modelData.find((m) => m.slug === "interceptor-650")?.id, variant_name: "Standard", year: 2024, slug: "interceptor-650-standard-2024", price_usd: 6299, engine_type: "Parallel-Twin", engine_displacement_cc: 648, horsepower_hp: 47, torque_nm: 52, transmission_type: "6-speed", cooling_system: "Air/Oil-cooled", weight_kg: 202, seat_height_mm: 804, top_speed_kmh: 170, fuel_capacity_liters: 12.5, fuel_consumption_l_per_100km: 4.1, front_brake_type: "Dual 320mm discs, ByBre", rear_brake_type: "Single 240mm disc", front_tire_size: "100/90-18", rear_tire_size: "130/70-18", abs: true, traction_control: false, description: "Classic parallel-twin with retro charm" },
    { model_id: modelData.find((m) => m.slug === "continental-gt-650")?.id, variant_name: "Standard", year: 2024, slug: "continental-gt-650-standard-2024", price_usd: 6499, engine_type: "Parallel-Twin", engine_displacement_cc: 648, horsepower_hp: 47, torque_nm: 52, transmission_type: "6-speed", cooling_system: "Air/Oil-cooled", weight_kg: 199, seat_height_mm: 790, top_speed_kmh: 170, fuel_capacity_liters: 12.5, fuel_consumption_l_per_100km: 4.2, front_brake_type: "Single 320mm disc, ByBre", rear_brake_type: "Single 240mm disc", front_tire_size: "100/90-18", rear_tire_size: "130/70-18", abs: true, traction_control: false, description: "Cafe racer with classic British styling" },
    { model_id: modelData.find((m) => m.slug === "himalayan")?.id, variant_name: "Standard", year: 2024, slug: "himalayan-standard-2024", price_usd: 5299, engine_type: "Single", engine_displacement_cc: 411, horsepower_hp: 24, torque_nm: 32, transmission_type: "5-speed", cooling_system: "Air/Oil-cooled", weight_kg: 199, seat_height_mm: 800, top_speed_kmh: 130, fuel_capacity_liters: 15.0, fuel_consumption_l_per_100km: 3.6, front_brake_type: "Single 300mm disc, ByBre", rear_brake_type: "Single 240mm disc", front_tire_size: "90/90-21", rear_tire_size: "120/90-17", abs: true, traction_control: false, description: "Affordable adventure bike for all terrain" },
    { model_id: modelData.find((m) => m.slug === "super-meteor-650")?.id, variant_name: "Tourer", year: 2024, slug: "super-meteor-650-tourer-2024", price_usd: 7299, engine_type: "Parallel-Twin", engine_displacement_cc: 648, horsepower_hp: 47, torque_nm: 52, transmission_type: "6-speed", cooling_system: "Air/Oil-cooled", weight_kg: 241, seat_height_mm: 740, top_speed_kmh: 170, fuel_capacity_liters: 15.7, fuel_consumption_l_per_100km: 4.3, front_brake_type: "Dual 320mm discs", rear_brake_type: "Single 300mm disc", front_tire_size: "100/90-19", rear_tire_size: "150/80-16", abs: true, traction_control: true, description: "Twin-cylinder cruiser with touring capability" },

    // Aprilia Variants
    { model_id: modelData.find((m) => m.slug === "rsv4")?.id, variant_name: "Factory", year: 2024, slug: "rsv4-factory-2024", price_usd: 25999, engine_type: "V4", engine_displacement_cc: 1099, horsepower_hp: 217, torque_nm: 125, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 199, seat_height_mm: 845, top_speed_kmh: 299, fuel_capacity_liters: 18.5, fuel_consumption_l_per_100km: 6.9, front_brake_type: "Dual 330mm discs, Brembo Stylema", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "200/55 ZR17", abs: true, traction_control: true, description: "V4 superbike with championship pedigree" },
    { model_id: modelData.find((m) => m.slug === "rs-660")?.id, variant_name: "Standard", year: 2024, slug: "rs-660-standard-2024", price_usd: 11999, engine_type: "Parallel-Twin", engine_displacement_cc: 659, horsepower_hp: 100, torque_nm: 67, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 183, seat_height_mm: 820, top_speed_kmh: 220, fuel_capacity_liters: 15.0, fuel_consumption_l_per_100km: 5.0, front_brake_type: "Dual 320mm discs, Brembo", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Parallel-twin sport bike with race tech" },
    { model_id: modelData.find((m) => m.slug === "tuono-v4")?.id, variant_name: "Factory", year: 2024, slug: "tuono-v4-factory-2024", price_usd: 22999, engine_type: "V4", engine_displacement_cc: 1099, horsepower_hp: 175, torque_nm: 121, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 209, seat_height_mm: 825, top_speed_kmh: 275, fuel_capacity_liters: 18.5, fuel_consumption_l_per_100km: 6.5, front_brake_type: "Dual 330mm discs, Brembo Stylema", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "190/55 ZR17", abs: true, traction_control: true, description: "V4 naked with RSV4 performance" },
    { model_id: modelData.find((m) => m.slug === "tuono-660")?.id, variant_name: "Standard", year: 2024, slug: "tuono-660-standard-2024", price_usd: 10699, engine_type: "Parallel-Twin", engine_displacement_cc: 659, horsepower_hp: 95, torque_nm: 67, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 183, seat_height_mm: 820, top_speed_kmh: 215, fuel_capacity_liters: 15.0, fuel_consumption_l_per_100km: 4.8, front_brake_type: "Dual 320mm discs, Brembo", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Middleweight naked with Italian character" },

    // MV Agusta Variants
    { model_id: modelData.find((m) => m.slug === "f4")?.id, variant_name: "RR", year: 2024, slug: "f4-rr-2024", price_usd: 28999, engine_type: "Inline-4", engine_displacement_cc: 998, horsepower_hp: 201, torque_nm: 115, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 193, seat_height_mm: 812, top_speed_kmh: 299, fuel_capacity_liters: 17.0, fuel_consumption_l_per_100km: 6.8, front_brake_type: "Dual 320mm discs, Brembo", rear_brake_type: "Single 210mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "190/55 ZR17", abs: true, traction_control: true, description: "Exotic Italian superbike with inline-four" },
    { model_id: modelData.find((m) => m.slug === "brutale-1000")?.id, variant_name: "RR", year: 2024, slug: "brutale-1000-rr-2024", price_usd: 29998, engine_type: "Inline-4", engine_displacement_cc: 998, horsepower_hp: 208, torque_nm: 116, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 186, seat_height_mm: 830, top_speed_kmh: 280, fuel_capacity_liters: 16.5, fuel_consumption_l_per_100km: 6.5, front_brake_type: "Dual 320mm discs, Brembo Stylema", rear_brake_type: "Single 220mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "200/55 ZR17", abs: true, traction_control: true, description: "Hyper naked with 208hp inline-four" },

    // Indian Variants
    { model_id: modelData.find((m) => m.slug === "chief")?.id, variant_name: "Dark Horse", year: 2024, slug: "chief-dark-horse-2024", price_usd: 14999, engine_type: "V-Twin", engine_displacement_cc: 1890, horsepower_hp: 97, torque_nm: 162, transmission_type: "6-speed", cooling_system: "Air/Oil-cooled", weight_kg: 304, seat_height_mm: 660, top_speed_kmh: 180, fuel_capacity_liters: 13.3, fuel_consumption_l_per_100km: 5.4, front_brake_type: "Single 298mm disc", rear_brake_type: "Single 298mm disc", front_tire_size: "130/90 B16", rear_tire_size: "180/65 B16", abs: true, traction_control: true, description: "Modern American cruiser with blacked-out styling" },
    { model_id: modelData.find((m) => m.slug === "scout")?.id, variant_name: "Bobber", year: 2024, slug: "scout-bobber-2024", price_usd: 12499, engine_type: "V-Twin", engine_displacement_cc: 1133, horsepower_hp: 94, torque_nm: 98, transmission_type: "5-speed", cooling_system: "Liquid-cooled", weight_kg: 253, seat_height_mm: 643, top_speed_kmh: 185, fuel_capacity_liters: 12.5, fuel_consumption_l_per_100km: 4.9, front_brake_type: "Single 298mm disc", rear_brake_type: "Single 298mm disc", front_tire_size: "130/90 B16", rear_tire_size: "150/80 B16", abs: true, traction_control: false, description: "Bobber-style cruiser with liquid-cooled V-twin" },
    { model_id: modelData.find((m) => m.slug === "challenger")?.id, variant_name: "Dark Horse", year: 2024, slug: "challenger-dark-horse-2024", price_usd: 21999, engine_type: "V-Twin", engine_displacement_cc: 1768, horsepower_hp: 122, torque_nm: 178, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 359, seat_height_mm: 660, top_speed_kmh: 200, fuel_capacity_liters: 22.7, fuel_consumption_l_per_100km: 5.8, front_brake_type: "Dual 320mm discs, Brembo", rear_brake_type: "Single 298mm disc", front_tire_size: "130/60 R19", rear_tire_size: "180/60 R16", abs: true, traction_control: true, description: "Power bagger with PowerPlus V-twin" },
    { model_id: modelData.find((m) => m.slug === "ftr")?.id, variant_name: "Sport", year: 2024, slug: "ftr-sport-2024", price_usd: 14999, engine_type: "V-Twin", engine_displacement_cc: 1203, horsepower_hp: 120, torque_nm: 115, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 233, seat_height_mm: 790, top_speed_kmh: 210, fuel_capacity_liters: 13.0, fuel_consumption_l_per_100km: 5.2, front_brake_type: "Dual 320mm discs, Brembo", rear_brake_type: "Single 265mm disc", front_tire_size: "120/70-19", rear_tire_size: "150/80-18", abs: true, traction_control: true, description: "Flat-track inspired roadster with modern tech" },

    // Moto Guzzi Variants
    { model_id: modelData.find((m) => m.slug === "v100-mandello")?.id, variant_name: "S", year: 2024, slug: "v100-mandello-s-2024", price_usd: 15990, engine_type: "V-Twin", engine_displacement_cc: 1042, horsepower_hp: 115, torque_nm: 105, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 226, seat_height_mm: 815, top_speed_kmh: 225, fuel_capacity_liters: 17.0, fuel_consumption_l_per_100km: 5.1, front_brake_type: "Dual 320mm discs, Brembo", rear_brake_type: "Single 280mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Modern sport tourer with transverse V-twin" },
    { model_id: modelData.find((m) => m.slug === "v85-tt")?.id, variant_name: "Travel", year: 2024, slug: "v85-tt-travel-2024", price_usd: 13490, engine_type: "V-Twin", engine_displacement_cc: 853, horsepower_hp: 80, torque_nm: 80, transmission_type: "6-speed", cooling_system: "Air/Oil-cooled", weight_kg: 229, seat_height_mm: 830, top_speed_kmh: 185, fuel_capacity_liters: 21.0, fuel_consumption_l_per_100km: 4.7, front_brake_type: "Dual 320mm discs, Brembo", rear_brake_type: "Single 260mm disc", front_tire_size: "110/80 R19", rear_tire_size: "150/70 R17", abs: true, traction_control: true, description: "Classic adventure with transverse V-twin" },

    // Husqvarna Variants
    { model_id: modelData.find((m) => m.slug === "vitpilen-701")?.id, variant_name: "Standard", year: 2024, slug: "vitpilen-701-standard-2024", price_usd: 12799, engine_type: "Single", engine_displacement_cc: 692, horsepower_hp: 74, torque_nm: 73, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 157, seat_height_mm: 830, top_speed_kmh: 185, fuel_capacity_liters: 12.0, fuel_consumption_l_per_100km: 4.3, front_brake_type: "Single 320mm disc, Brembo", rear_brake_type: "Single 240mm disc", front_tire_size: "120/70-17", rear_tire_size: "160/60-17", abs: true, traction_control: true, description: "Minimalist street bike with Swedish design" },
    { model_id: modelData.find((m) => m.slug === "svartpilen-701")?.id, variant_name: "Standard", year: 2024, slug: "svartpilen-701-standard-2024", price_usd: 12999, engine_type: "Single", engine_displacement_cc: 692, horsepower_hp: 74, torque_nm: 73, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 161, seat_height_mm: 835, top_speed_kmh: 180, fuel_capacity_liters: 12.0, fuel_consumption_l_per_100km: 4.4, front_brake_type: "Single 320mm disc, Brembo", rear_brake_type: "Single 240mm disc", front_tire_size: "120/70-17", rear_tire_size: "160/60-17", abs: true, traction_control: true, description: "Urban scrambler with modern styling" },
    { model_id: modelData.find((m) => m.slug === "norden-901")?.id, variant_name: "Standard", year: 2024, slug: "norden-901-standard-2024", price_usd: 14299, engine_type: "Parallel-Twin", engine_displacement_cc: 889, horsepower_hp: 105, torque_nm: 100, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 220, seat_height_mm: 854, top_speed_kmh: 195, fuel_capacity_liters: 19.0, fuel_consumption_l_per_100km: 4.8, front_brake_type: "Dual 320mm discs, Brembo", rear_brake_type: "Single 260mm disc", front_tire_size: "90/90-21", rear_tire_size: "150/70-18", abs: true, traction_control: true, description: "Adventure bike with rally spirit and LC8c engine" },

    // Zero Motorcycles Variants
    { model_id: modelData.find((m) => m.slug === "sr-f")?.id, variant_name: "Premium", year: 2024, slug: "sr-f-premium-2024", price_usd: 21995, engine_type: "Electric", engine_displacement_cc: 0, horsepower_hp: 110, torque_nm: 190, transmission_type: "Direct Drive", cooling_system: "Liquid-cooled Motor", weight_kg: 226, seat_height_mm: 787, top_speed_kmh: 200, fuel_capacity_liters: 0, fuel_consumption_l_per_100km: 0, front_brake_type: "Dual 320mm discs, J-Juan", rear_brake_type: "Single 265mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Premium electric sportbike with 14.4kWh battery" },
    { model_id: modelData.find((m) => m.slug === "sr-s")?.id, variant_name: "Standard", year: 2024, slug: "sr-s-standard-2024", price_usd: 19995, engine_type: "Electric", engine_displacement_cc: 0, horsepower_hp: 110, torque_nm: 190, transmission_type: "Direct Drive", cooling_system: "Liquid-cooled Motor", weight_kg: 233, seat_height_mm: 787, top_speed_kmh: 200, fuel_capacity_liters: 0, fuel_consumption_l_per_100km: 0, front_brake_type: "Dual 320mm discs, J-Juan", rear_brake_type: "Single 265mm disc", front_tire_size: "120/70 ZR17", rear_tire_size: "180/55 ZR17", abs: true, traction_control: true, description: "Electric sport tourer with fairings" },

    // CFMoto Variants
    { model_id: modelData.find((m) => m.slug === "700-cl-x")?.id, variant_name: "Heritage", year: 2024, slug: "700-cl-x-heritage-2024", price_usd: 7299, engine_type: "Parallel-Twin", engine_displacement_cc: 693, horsepower_hp: 75, torque_nm: 68, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 213, seat_height_mm: 805, top_speed_kmh: 180, fuel_capacity_liters: 13.0, fuel_consumption_l_per_100km: 4.6, front_brake_type: "Dual 300mm discs", rear_brake_type: "Single 240mm disc", front_tire_size: "110/80-19", rear_tire_size: "150/70-17", abs: true, traction_control: true, description: "Affordable adventure with retro styling" },
    { model_id: modelData.find((m) => m.slug === "300nk")?.id, variant_name: "Standard", year: 2024, slug: "300nk-standard-2024", price_usd: 4599, engine_type: "Single", engine_displacement_cc: 292, horsepower_hp: 29, torque_nm: 25, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 151, seat_height_mm: 795, top_speed_kmh: 145, fuel_capacity_liters: 12.5, fuel_consumption_l_per_100km: 3.2, front_brake_type: "Single 292mm disc", rear_brake_type: "Single 220mm disc", front_tire_size: "110/70-17", rear_tire_size: "140/60-17", abs: true, traction_control: false, description: "Entry-level naked bike with value pricing" },
    { model_id: modelData.find((m) => m.slug === "650mt")?.id, variant_name: "Standard", year: 2024, slug: "650mt-standard-2024", price_usd: 7499, engine_type: "Parallel-Twin", engine_displacement_cc: 649, horsepower_hp: 61, torque_nm: 58, transmission_type: "6-speed", cooling_system: "Liquid-cooled", weight_kg: 213, seat_height_mm: 840, top_speed_kmh: 170, fuel_capacity_liters: 18.0, fuel_consumption_l_per_100km: 4.4, front_brake_type: "Dual 300mm discs", rear_brake_type: "Single 240mm disc", front_tire_size: "110/80-19", rear_tire_size: "150/70-17", abs: true, traction_control: true, description: "Middleweight adventure tourer with value" },
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
