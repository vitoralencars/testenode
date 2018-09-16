import * as mongoose from 'mongoose'

export interface Category extends mongoose.Document {
    description: string
}

const categorySchema = new mongoose.Schema({
    description: {
        type: String,
        unique: true
    }
})

export const Category = mongoose.model<Category>('Category', categorySchema)