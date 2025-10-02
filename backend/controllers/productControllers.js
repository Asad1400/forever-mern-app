import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

const addProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, subCategory, sizes, bestSeller } = req.body
        const image1 = req.files.image1 && req.files.image1[0]       
        const image2 = req.files.image2 && req.files.image2[0]       
        const image3 = req.files.image3 && req.files.image3[0]       
        const image4 = req.files.image4 && req.files.image4[0]       

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        // console.log(name, description, price, image, category, subCategory, sizes, bestSeller, images)
        // console.log(image1, image2, image3, image4)
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"});
                return result.secure_url
            })
        )
        // console.log(imagesUrl)
        
        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === "true" ? true : false,
            date: Date.now()
        }

        const product = new productModel(productData)
        await product.save()
        res.json({
            success: true,
            message: "Product added successfully"
        });

    }
    catch (e) {
        res.json({
            success: false, message: e.message
        })
    }
}

const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({
            success: true,
            products
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
}

const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        
        if (!product) {
            res.json({
                success: false,
                message: "Product does not exist"
            })
        }

        await productModel.findByIdAndDelete(req.body.id)
        res.json({
            success: true,
            message: "Product removed successfully"
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
}

const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({
            success: true,
            product
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
}

export { addProduct, listProduct, removeProduct, singleProduct }