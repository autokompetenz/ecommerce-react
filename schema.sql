-- =============================================
-- POWER Tools GmbH — Schéma complet
-- Exécuter dans Supabase SQL Editor
-- =============================================

-- Tables
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

-- Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policies — Produits (lecture publique, écriture ouverte)
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Update products" ON products FOR UPDATE USING (true);
CREATE POLICY "Delete products" ON products FOR DELETE USING (true);

-- Policies — Commandes
CREATE POLICY "Insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Update orders" ON orders FOR UPDATE USING (true);

-- Policies — Lignes de commande
CREATE POLICY "Insert order_items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Read order_items" ON order_items FOR SELECT USING (true);
