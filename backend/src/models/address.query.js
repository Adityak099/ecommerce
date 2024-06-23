export const newAddressQuery = `INSERT INTO address (address_id, user_id, address_line1, address_line2, city, state, country, postal_code,created_at,updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

export const deleteAddressQuery = `DELETE FROM address WHERE address_id = ?`;
