import { Request, Response, NextFunction } from 'express'
import ProductService from '../../services/delete/product.service'

async function getProducts(req: Request, res: Response, next: NextFunction) {
    try {
        // A random error,
        if (Math.round(Math.random())) throw 'Lovely made error'

        console.log('getProducts')
        res.status(200).json(await ProductService.getAllProducts())
    } catch (error) {
        next(error)
    }
}

async function getProduct(req: Request, res: Response, next: NextFunction) {
    try {
        console.log('getProduct')
        res.status(200).send('getProduct')
    } catch (error) {
        next(error)
    }
}

async function addProduct(req: Request, res: Response, next: NextFunction) {
    try {
        console.log('addProduct')
        res.status(200).send('addProduct')
    } catch (error) {
        next(error)
    }
}

async function updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
        console.log('updateProduct')
        res.status(200).send('updateProduct')
    } catch (error) {
        next(error)
    }
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
        console.log('deleteProduct')
        res.status(200).send('deleteProduct')
    } catch (error) {
        next(error)
    }
}

export default {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
}
