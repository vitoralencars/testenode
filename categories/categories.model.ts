import * as mongoose from 'mongoose'

export interface SubCategoryItem extends mongoose.Document{
    description: String
}

export interface Category extends mongoose.Document {
    description: string
    subCategories: SubCategoryItem[]
}

const subCategorySchema = new mongoose.Schema({
    description:{
        type: String,
        required: true,
        unique: true
    }
})

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