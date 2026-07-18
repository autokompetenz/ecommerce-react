import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "YOUR_SUPABASE_URL";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseKey);

// ---- SQL à exécuter dans Supabase (SQL Editor) ----
/*
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT DEFAULT '',
  price NUMERIC NOT NULL DEFAULT 0,
  old_price NUMERIC,
  image TEXT DEFAULT '',
  hover_image TEXT DEFAULT '',
  badge TEXT DEFAULT '',
  category TEXT DEFAULT '',
  description TEXT DEFAULT '',
  features JSONB DEFAULT '[]',
  specs JSONB DEFAULT '{}',
  delivery TEXT DEFAULT '',
  ean TEXT DEFAULT '',
  part_number TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_phone TEXT DEFAULT '',
  total NUMERIC NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  price NUMERIC NOT NULL DEFAULT 0
);

-- Activer RLS puis créer les policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Lecture publique pour les produits
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
-- Écriture ouverte (à sécuriser plus tard)
CREATE POLICY "Insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Update products" ON products FOR UPDATE USING (true);
CREATE POLICY "Delete products" ON products FOR DELETE USING (true);

CREATE POLICY "Insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Update orders" ON orders FOR UPDATE USING (true);

CREATE POLICY "Insert order_items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Read order_items" ON order_items FOR SELECT USING (true);

-- ====== SUPABASE STORAGE (exécuter dans le SQL Editor) ======
-- Créer un bucket pour les images produits
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Politique de lecture publique
CREATE POLICY "Public read product-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- Politique d'upload ouverte (à sécuriser plus tard)
CREATE POLICY "Upload product-images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images');

-- Politique de suppression ouverte
CREATE POLICY "Delete product-images" ON storage.objects
  FOR DELETE USING (bucket_id = 'product-images');

-- ====== AJOUTER LES COLONNES MANQUANTES (si la table existe déjà) ======
ALTER TABLE products ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]';
ALTER TABLE products ADD COLUMN IF NOT EXISTS specs JSONB DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS delivery TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS ean TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS part_number TEXT DEFAULT '';

-- ====== TABLE SETTINGS (coordonnées bancaires modifiables) ======
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Upsert settings" ON site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Update settings" ON site_settings FOR UPDATE USING (true);

-- Valeurs par défaut (bank transfer info)
INSERT INTO site_settings (key, value) VALUES
  ('bank_holder', 'POWER Tools GmbH'),
  ('bank_iban', 'DE89 3704 0044 0532 0130 00'),
  ('bank_bic', 'COBADEFFXXX'),
  ('bank_bank', 'Commerzbank AG'),
  ('bank_reference', 'POWER-TOOLS'),
  ('bank_note', 'Veuillez indiquer le numéro de commande en référence du virement.')
ON CONFLICT (key) DO NOTHING;
*/
