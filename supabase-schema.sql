-- ====== TABLES ======

CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10,2) DEFAULT 0,
  old_price NUMERIC(10,2),
  category TEXT DEFAULT '',
  description TEXT DEFAULT '',
  image TEXT DEFAULT '',
  badge TEXT DEFAULT '',
  rating NUMERIC(2,1) DEFAULT 4.5,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  features JSONB DEFAULT '[]',
  specs JSONB DEFAULT '{}',
  delivery TEXT DEFAULT '',
  ean TEXT DEFAULT '',
  part_number TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_address TEXT DEFAULT '',
  customer_phone TEXT DEFAULT '',
  total NUMERIC(10,2) DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT,
  quantity INTEGER DEFAULT 1,
  price NUMERIC(10,2) DEFAULT 0
);

-- ====== RLS ======

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Update products" ON products FOR UPDATE USING (true);
CREATE POLICY "Delete products" ON products FOR DELETE USING (true);

CREATE POLICY "Insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Update orders" ON orders FOR UPDATE USING (true);
CREATE POLICY "Delete orders" ON orders FOR DELETE USING (true);

CREATE POLICY "Insert order_items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Read order_items" ON order_items FOR SELECT USING (true);

-- ====== STORAGE ======

INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read product-images' AND tablename = 'objects') THEN
    CREATE POLICY "Public read product-images" ON storage.objects
      FOR SELECT USING (bucket_id = 'product-images');
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Upload product-images' AND tablename = 'objects') THEN
    CREATE POLICY "Upload product-images" ON storage.objects
      FOR INSERT WITH CHECK (bucket_id = 'product-images');
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Delete product-images' AND tablename = 'objects') THEN
    CREATE POLICY "Delete product-images" ON storage.objects
      FOR DELETE USING (bucket_id = 'product-images');
  END IF;
END $$;

-- ====== SETTINGS ======

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Upsert settings" ON site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Update settings" ON site_settings FOR UPDATE USING (true);

INSERT INTO site_settings (key, value) VALUES
  ('bank_holder', 'POWER Tools GmbH'),
  ('bank_iban', 'DE89 3704 0044 0532 0130 00'),
  ('bank_bic', 'COBADEFFXXX'),
  ('bank_bank', 'Commerzbank AG'),
  ('bank_reference', 'POWER-TOOLS'),
  ('bank_note', 'Veuillez indiquer le numéro de commande en référence du virement.')
ON CONFLICT (key) DO NOTHING;
