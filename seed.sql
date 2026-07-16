-- =============================================
-- POWER Tools GmbH — Seed data (17 produits)
-- Exécuter dans Supabase SQL Editor APRÈS le schema
-- =============================================

INSERT INTO products (name, brand, price, old_price, image, hover_image, badge, category, description) VALUES

-- Tournevis (8)
('Tournevis sans fil 18V', 'POWER Tools', 89.90, NULL, '/img/product-img/product1.png', '/img/product-img/product2.png', '', 'Tournevis',
 'Tournevis sans fil 18V haute performance. Couple maximal 40 Nm, 2 vitesses, chargeur rapide inclus.'),

('Tournevis à cliquets sans fil', 'POWER Tools', 119.00, NULL, '/img/product-img/product3.png', '/img/product-img/product4.png', 'Nouveau', 'Tournevis',
 'Tournevis à cliquets sans fil 18V. 20+1 positions de couple, embout magnétique, led intégrée.'),

('Tournevis de construction sans fil', 'POWER Tools', 149.00, 169.00, '/img/product-img/product5.png', '/img/product-img/product6.png', 'Promo', 'Tournevis',
 'Tournevis de construction sans fil conçu pour les chantiers exigeants. Carcasse renforcée, 60 Nm de couple.'),

('Tournevis articulé sans fil', 'POWER Tools', 135.00, NULL, '/img/product-img/product7.png', '/img/product-img/product8.png', '', 'Tournevis',
 'Tournevis articulé sans fil. Tête pivotante 5 positions pour accéder dans les espaces restreints.'),

('Tournevis à dégagement rapide', 'POWER Tools', 59.90, NULL, '/img/product-img/product1.png', '/img/product-img/product2.png', '', 'Tournevis',
 'Tournevis à dégagement rapide sans fil. Système one-hand pour changer d\'embout en une seconde.'),

('Tournevis de magazine sans fil', 'POWER Tools', 169.00, NULL, '/img/product-img/product3.png', '/img/product-img/product4.png', 'Nouveau', 'Tournevis',
 'Tournevis de magazine sans fil. Réservoir rotatif 6 embouts intégrés, autonomie prolongée.'),

('Tournevis à angle sans fil', 'POWER Tools', 129.00, NULL, '/img/product-img/product5.png', '/img/product-img/product6.png', '', 'Tournevis',
 'Tournevis à angle sans fil. Tête fine 10 mm pour les applications en cornière et zones étroites.'),

('Tourneur à vis électronique', 'POWER Tools', 199.00, 229.00, '/img/product-img/product7.png', '/img/product-img/product8.png', 'Promo', 'Tournevis',
 'Tourneur à vis électronique sans fil. Contrôle électronique du couple, mode vissage automatique.'),

-- Clés à choc (2)
('Clé à choc sans fil 1/2"', 'POWER Tools', 249.00, NULL, '/img/product-img/product1.png', '/img/product-img/product2.png', '', 'Clés à choc',
 'Clé à choc sans fil 1/2 pouce. 500 Nm de couple, 3 modes de vitesse, motor brushless.'),

('Clé à choc rotative sans fil', 'POWER Tools', 299.00, 349.00, '/img/product-img/product3.png', '/img/product-img/product4.png', 'Promo', 'Clés à choc',
 'Clé à choc rotative sans fil. Tête rotative 360°, 600 Nm max, idéale pour serrage étagère.'),

-- Perceuses (3)
('Perceuse à fil 13 mm', 'POWER Tools', 79.90, NULL, '/img/product-img/product5.png', '/img/product-img/product6.png', '', 'Perceuses',
 'Perceuse à fil 13 mm. Moteur 750W, 2 vitesses, mandrin auto-serrant, poignée ergonomique.'),

('Marteau de forage sans fil', 'POWER Tools', 219.00, NULL, '/img/product-img/product7.png', '/img/product-img/product8.png', '', 'Perceuses',
 'Marteau de forage sans fil SDS-Plus. 3 modes (perçage, perçage marteau, burinage), 2.6 J.'),

('Tournevis et ensemble de forage', 'POWER Tools', 139.00, NULL, '/img/product-img/product1.png', '/img/product-img/product2.png', 'Nouveau', 'Perceuses',
 'Ensemble complet : tournevis sans fil + set 50 accessoires de forage. Idéal pour débuter.'),

-- Rivets (2)
('Pistolet à noix de rivet sans fil', 'POWER Tools', 159.00, NULL, '/img/product-img/product3.png', '/img/product-img/product4.png', '', 'Rivets',
 'Pistolet à noix de rivet sans fil. Écartement 2.4 - 5 mm, bac chargeur 20 rivets, motor brushless.'),

('Pistolet de rivet batterie', 'POWER Tools', 189.00, 209.00, '/img/product-img/product5.png', '/img/product-img/product6.png', 'Promo', 'Rivets',
 'Pistolet de rivet batterie 18V. Force de traction 8 kN, compatible rivets acier et inox.'),

-- Meulage (1)
('Meuleuse d\'angle 125 mm', 'POWER Tools', 109.00, NULL, '/img/product-img/product7.png', '/img/product-img/product8.png', '', 'Meulage',
 'Meuleuse d\'angle 125 mm. Moteur 900W, disque inclut, protecteur basculement rapide.'),

-- Accessoires (1)
('Cliquets de batterie 18V', 'POWER Tools', 49.90, NULL, '/img/product-img/product1.png', '/img/product-img/product2.png', '', 'Accessoires',
 'Cliquet de batterie compatible gamme 18V. Indicateur LED charge, chargeur rapide 45 min.');
