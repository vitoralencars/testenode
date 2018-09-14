import * as mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    descricao:{
        type: String,
        unique: true
    }
})

export const Category = mongoose.model('Category', categorySchema)