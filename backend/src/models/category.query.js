export const getCategoryQuery = `SELECT category_id,category_name,description FROM category WHERE category_id = ?;`;
export const getAllCategoriesQuery = `SELECT * FROM category;`;
