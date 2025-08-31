-- Sample data for CozyCorner Restaurant Platform

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, category, image_url, is_available, preparation_time, is_vegetarian, is_spicy, calories, created_at, updated_at) VALUES
-- Pizzas
('Margherita Pizza', 'Classic pizza with tomato sauce, mozzarella cheese, and fresh basil', 12.99, 'PIZZA', '/images/margherita.jpg', true, 15, true, false, 280, NOW(), NOW()),
('Pepperoni Pizza', 'Traditional pizza topped with pepperoni and mozzarella cheese', 14.99, 'PIZZA', '/images/pepperoni.jpg', true, 15, false, false, 320, NOW(), NOW()),
('Veggie Supreme', 'Loaded with bell peppers, mushrooms, onions, olives, and tomatoes', 16.99, 'PIZZA', '/images/veggie-supreme.jpg', true, 18, true, false, 290, NOW(), NOW()),
('Meat Lovers', 'Pepperoni, sausage, bacon, and ham on our signature crust', 18.99, 'PIZZA', '/images/meat-lovers.jpg', true, 20, false, false, 420, NOW(), NOW()),

-- Burgers
('Classic Beef Burger', 'Juicy beef patty with lettuce, tomato, onion, and our special sauce', 9.99, 'BURGER', '/images/classic-burger.jpg', true, 12, false, false, 480, NOW(), NOW()),
('Chicken Deluxe', 'Grilled chicken breast with avocado, bacon, and chipotle mayo', 11.99, 'BURGER', '/images/chicken-deluxe.jpg', true, 15, false, true, 520, NOW(), NOW()),
('Veggie Burger', 'Plant-based patty with fresh vegetables and tahini sauce', 10.99, 'BURGER', '/images/veggie-burger.jpg', true, 10, true, false, 380, NOW(), NOW()),
('BBQ Bacon Burger', 'Beef patty with BBQ sauce, crispy bacon, and onion rings', 13.99, 'BURGER', '/images/bbq-bacon.jpg', true, 15, false, false, 580, NOW(), NOW()),

-- Appetizers
('Buffalo Wings', 'Crispy chicken wings tossed in spicy buffalo sauce', 8.99, 'APPETIZER', '/images/buffalo-wings.jpg', true, 12, false, true, 340, NOW(), NOW()),
('Mozzarella Sticks', 'Golden fried mozzarella with marinara dipping sauce', 6.99, 'APPETIZER', '/images/mozzarella-sticks.jpg', true, 8, true, false, 280, NOW(), NOW()),
('Loaded Nachos', 'Tortilla chips with cheese, jalapeños, salsa, and sour cream', 9.99, 'APPETIZER', '/images/loaded-nachos.jpg', true, 10, true, true, 420, NOW(), NOW()),

-- Beverages
('Coca Cola', 'Classic refreshing cola drink', 2.99, 'BEVERAGE', '/images/coca-cola.jpg', true, 2, true, false, 140, NOW(), NOW()),
('Fresh Orange Juice', 'Freshly squeezed orange juice', 3.99, 'BEVERAGE', '/images/orange-juice.jpg', true, 3, true, false, 110, NOW(), NOW()),
('Iced Tea', 'Refreshing iced tea with lemon', 2.49, 'BEVERAGE', '/images/iced-tea.jpg', true, 2, true, false, 70, NOW(), NOW()),

-- Desserts
('Chocolate Brownie', 'Rich chocolate brownie with vanilla ice cream', 5.99, 'DESSERT', '/images/chocolate-brownie.jpg', true, 5, true, false, 380, NOW(), NOW()),
('Cheesecake', 'New York style cheesecake with berry compote', 6.99, 'DESSERT', '/images/cheesecake.jpg', true, 3, true, false, 420, NOW(), NOW());

-- Insert sample users
INSERT INTO users (name, email, password, phone_number, address, role, is_active, created_at, updated_at, loyalty_points) VALUES
('Admin User', 'admin@cozycorner.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', '+1234567890', '123 Admin St, City', 'ADMIN', true, NOW(), NOW(), 0),
('John Customer', 'customer@test.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', '+1234567891', '456 Customer Ave, City', 'CUSTOMER', true, NOW(), NOW(), 100),
('Driver Mike', 'driver@test.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', '+1234567892', '789 Driver Rd, City', 'DRIVER', true, NOW(), NOW(), 0),
('Jane Smith', 'jane.smith@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', '+1234567893', '321 Main St, City', 'CUSTOMER', true, NOW(), NOW(), 250);

-- Insert sample coupons
INSERT INTO coupons (code, description, discount_type, discount_value, minimum_order_amount, maximum_discount_amount, usage_limit, usage_count, valid_from, valid_until, is_active, created_at) VALUES
('WELCOME10', 'Welcome discount for new customers', 'PERCENTAGE', 10.00, 15.00, 5.00, 100, 0, NOW() - INTERVAL '1 day', NOW() + INTERVAL '30 days', true, NOW()),
('PIZZA20', '20% off on all pizzas', 'PERCENTAGE', 20.00, 20.00, 10.00, 50, 0, NOW() - INTERVAL '1 day', NOW() + INTERVAL '7 days', true, NOW()),
('FREEDELIVER', 'Free delivery on orders above $25', 'FIXED_AMOUNT', 5.00, 25.00, 5.00, NULL, 0, NOW() - INTERVAL '1 day', NOW() + INTERVAL '14 days', true, NOW()),
('BURGER5OFF', '$5 off on burger orders', 'FIXED_AMOUNT', 5.00, 10.00, 5.00, 200, 0, NOW() - INTERVAL '1 day', NOW() + INTERVAL '21 days', true, NOW());
