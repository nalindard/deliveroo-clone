import Products from '../../products.json'

async function getAllProducts() {
    return Products
}
async function getProductById() {}
async function createProduct() {}
async function updateProductById() {}
async function deleteProductById() {}

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
}
