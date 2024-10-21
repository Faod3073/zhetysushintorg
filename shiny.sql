-- Drop 'cart' table if it exists
IF OBJECT_ID('dbo.cart', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.cart;
END

-- Drop 'account' table if it exists
IF OBJECT_ID('dbo.account', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.account;
END

-- Drop 'contacts' table if it exists
IF OBJECT_ID('dbo.contacts', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.contacts;
END

-- Drop 'products' table if it exists
IF OBJECT_ID('dbo.products', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.products;
END

-- Drop 'users' table if it exists
IF OBJECT_ID('dbo.users', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.users;
END

-- Create the 'users' table
CREATE TABLE dbo.users (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(50) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    password NVARCHAR(50) NOT NULL
);

-- Insert sample data into 'users' table
INSERT INTO users (name, email, password) VALUES ('Vlad', 'kim.vlad@gmail.com', 'fghjkl751');
INSERT INTO users (name, email, password) VALUES ('Vladislav', 'kimvaceslav4@gmail.com', 'esx751adz953');

-- Create the 'products' table
CREATE TABLE dbo.products (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(50) NOT NULL,
    description NVARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL
);

-- Insert sample data into 'products' table
INSERT INTO products (name, description, price, stock) VALUES ('H818', 'Шины для вилочных погрузчиков - производство Китай', 19300, 20);
INSERT INTO products (name, description, price, stock) VALUES ('I-1', 'Сельхоз шины - производство Китай', 45200, 20);

-- Create the 'contacts' table
CREATE TABLE dbo.contacts (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    phone NVARCHAR(15) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample data into 'contacts' table
INSERT INTO contacts (user_id, phone) VALUES (1, '87057724758');
INSERT INTO contacts (user_id, phone) VALUES (2, '87057724758');

-- Create the 'cart' table
CREATE TABLE dbo.cart (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert sample data into 'cart' table
INSERT INTO cart (user_id, product_id, quantity) VALUES (1, 1, 1);
INSERT INTO cart (user_id, product_id, quantity) VALUES (1, 2, 2);
INSERT INTO cart (user_id, product_id, quantity) VALUES (2, 1, 1);

-- Create the 'account' table
CREATE TABLE dbo.account (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample data into 'account' table
INSERT INTO account (user_id) VALUES (1);
INSERT INTO account (user_id) VALUES (2);
