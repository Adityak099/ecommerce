export const newSubCategoryQuery = `INSERT INTO sub_category (sub_category_id,name, description,parent_id) VALUES (?,?,?,?);`;
export const deleteSubCategoryQuery = `DELETE FROM sub_category WHERE sub_category_id = ?`;
export const getAllSubCategoriesQuery = `SELECT * FROM sub_category`;
export const getSubCategoryByIdQuery = `SELECT * FROM sub_category WHERE sub_category_id = ?`;
export const getSubCategoryByParentIdQuery = `SELECT * FROM sub_category WHERE parent_id = ?`;
export const getSubCategoryByNameQuery = `SELECT * FROM sub_category WHERE name = ?`;
