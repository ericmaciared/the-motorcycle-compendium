import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Manufacturer = {
  id: string;
  name: string;
  slug: string;
  country: string | null;
  founded_year: number | null;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type MotorbikeModel = {
  id: string;
  manufacturer_id: string;
  name: string;
  slug: string;
  year_start: number | null;
  year_end: number | null;
  category: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type MotorbikeVariant = {
  id: string;
  model_id: string;
  variant_name: string;
  year: number;
  slug: string;
  price_usd: number | null;
  engine_type: string | null;
  engine_displacement_cc: number | null;
  horsepower_hp: number | null;
  torque_nm: number | null;
  weight_kg: number | null;
  seat_height_mm: number | null;
  top_speed_kmh: number | null;
  abs: boolean;
  traction_control: boolean;
  description: string | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
};
