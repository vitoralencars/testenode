import * as mongoose from 'mongoose'
import {productSchema, ProductModel} from '../products/products.model'

export interface SubCategoryModel extends mongoose.Document{
    description: String,
    products: ProductModel[]
}

export const subCategorySchema = new mongoose.Schema({
    description:{
        type: String,
        unique: true
    },
    products:{
        type: [productSchema],
        required: false,
        select: true,
        default: []
    }
})

export const SubCategory = mongoose.model<SubCategoryModel>('SubCategory', subCategorySchema)