import * as mongoose from 'mongoose'
//import * as subcategories from '../subcategories/subcategories.model'
import {subCategorySchema, SubCategoryModel} from '../subcategories/subcategories.model'

export interface Category extends mongoose.Document {
    description: string,
    subCategories: SubCategoryModel[]
}

const categorySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        unique: true
    },
    subCategories:{ 
        type: [subCategorySchema],
        required: false,
        select: true,
        default: []
    }
})

export const Category = mongoose.model<Category>('Category', categorySchema)