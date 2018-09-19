import * as mongoose from 'mongoose'

export interface ProductModel extends mongoose.Document{
    description: String
}

export const productSchema = new mongoose.Schema({
    description:{
        type: String
    }
})