export const getCategoryQuery = `SELECT category_id,category_name,description FROM category WHERE category_id = ?;`;
export const getAllCategoriesQuery = `SELECT * FROM category;`;
export const getCategoryByNameQuery = `SELECT category_id,category_name,description FROM category WHERE category_name = ?;`;
export const getCategoryByIdQuery=`SELECT * FROM category WHERE category_id = ?;`