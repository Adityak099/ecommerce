export const getUserInfo = `SELECT user_id, username,email,phone,first_name,last_name,avatar,cover_image,created_at,updated_at, refresh_token FROM users WHERE user_id = ?;`;

export const insertUser = `INSERT INTO users (user_id, first_name, last_name, username, email,phone, password, refresh_token, avatar, cover_image, created_at, updated_at) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);`;
