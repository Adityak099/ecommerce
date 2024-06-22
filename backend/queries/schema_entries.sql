
INSERT INTO users
VALUES(
        '',
        'John',
        'Doe',
        'jhondoe11',
        'jhon@gmail.com',
        'Jhon@123',
        '',
        '',
        '',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
        
    );
INSERT INTO product
VALUES(
        101,
        'Laptop',
        10,
        'Dell Laptop : Discover our sleek laptop featuring robust performance with ample RAM and storage. Ideal for work and play, it offers seamless multitasking and ample storage space for all your files. Experience speed, reliability, and style in one portable package. ',
        50000.00,
        '',
        '',
        ''
    );
INSERT INTO shopping_cart
VALUES(
        1,
        1,
        101,
        1,
        '',
        ''
    );
INSERT INTO address
VALUES(
        1,
        1,
        '123 Main Street',
        'Apt 1',
        'New York',
        'Bihar',
        'USA',
        10001,
        '',
        ''
    );
INSERT INTO orders
VALUES(
        1,
        1,
        1,
        'pending',
        50000.00,
        '',
        ''
    );
INSERT INTO category(
        001,
        'Electronics',
        'Electronic Gadgets',
        ''
    );
INSERT INTO order_item
VALUES(
        1,
        1,
        101,
        1,
        '',
        ''
    );
INSERT INTO discounts
VALUES(
        1,
        'Summer Sale',
        'Get 15% off on selected items during the summer season',
        15.00,
        '2022-12-31',
        '2022-12-31',
        ''
    );
INSERT INTO inventory
VALUES(
        1,
        101,
        'New York',
        10,
        '',
        ''
    );
INSERT INTO reviews
VALUES(
        1,
        101,
        1,
        'Great product. I am happy with my purchase.',
        5,
        '',
        ''
    ),
    (
        2,
        101,
        1,
        'The laptop is fast and reliable. Great value for money.',
        5,
        '',
        ''
    );

INSERT INTO payments VALUES(
    1,
    1,
    1,
    50000.00,
    'upi',
    'paid',
    '',
    ''
);

INSERT INTO wishlist VALUES(
    1,
    1,
    101,
    '',
    ''
);
