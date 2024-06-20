USE dbecommerce;


CREATE TABLE users(
    user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255),
    avatar VARCHAR(255),
    cover_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP
);
ALTER TABLE users
MODIFY password VARCHAR(255) NOT NULL ;

truncate table users ;

CREATE TABLE product(
    product_id int NOT NULL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL ,
    product_stock BIGINT default 0,
    product_description TEXT,
    product_price DECIMAL(10, 2) NOT NULL,
    product_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE supplier(
    supplier_id INT NOT NULL PRIMARY KEY UNIQUE,
    user_id int NOT NULL ,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- CREATE TABLE shopping_cart(
--     user_id int NOT NULL PRIMARY KEY,
--     order_id INT NOT NULL UNIQUE,
--     created_at TIMESTAMP NOT NULL,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(user_id),
--     FOREIGN KEY (product_id) REFERENCES product(product_id)
-- );

CREATE TABLE address(
    address_id int NOT NULL PRIMARY KEY UNIQUE, 
    user_id int NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    country VARCHAR(255) DEFAULT "India",
    postal_code int NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE orders(
    order_id INT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    payment_id INT DEFAULT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
	status ENUM('PENDING', 'CLOSED') NOT NULL DEFAULT "PENDING",
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (item_id) REFERENCES order_item(item_id)
);

CREATE TABLE order_item(
    item_id int NOT NULL PRIMARY KEY UNIQUE,
    product_id int NOT NULL,
    quantity int NOT NULL DEFAULT 1,
	status ENUM('PENDING', 'TRANSIT', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT "PENDING",
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);


CREATE TABLE category(
    category_id bigint NOT NULL PRIMARY KEY UNIQUE,
    category_name VARCHAR(255) NOT NULL,
    description TEXT
);
CREATE TABLE sub_category(
    sub_category_id bigint NOT NULL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    description TEXT,
    parent_id BIGINT,
    FOREIGN KEY (parent_id) REFERENCES category(category_id)
    
);

CREATE TABLE discounts (
    discount_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    percentage DECIMAL(5, 2) NOT NULL CHECK (
        percentage > 0
        AND percentage <= 100
    ),
    start_Date DATE NOT NULL,
    end_Date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE inventory(
    inventory_id INT NOT NULL PRIMARY KEY,
    product_id INT NOT NULL,
    supplier_id int NOT NULL,
    address_id int NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (address_id) REFERENCES address(address_id)
    
);
CREATE TABLE reviews(
    review_id INT NOT NULL PRIMARY KEY UNIQUE,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK (
        rating >= 0
        AND rating <= 5
    ),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE payments(
    payment_id BIGINT NOT NULL PRIMARY KEY UNIQUE,
    order_id int NOT NULL,
    user_id INT NOT NULL,
    payment_amount DECIMAL(10, 2) NOT NULL,
    payment_options ENUM(
        'debit card',
        'credit card',
        'upi',
        'netbanking',
        'cod',
        'paylater'
    ) NOT NULL,
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE wishlist(
    wishlist_id INT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);
DROP TABLE category;
DROP TABLE orders;
DROP TABLE shopping_cart;
DROP TABLE address;
DROP TABLE product;
DROP TABLE users;
DROP TABLE order_item;
DROP TABLE discounts;
DROP TABLE inventory;
DROP TABLE reviews;
DROP TABLE payments;
DROP TABLE wishlist;

USE dbecommerce;