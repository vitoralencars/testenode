import * as restify from 'restify'
import {ModelRouter} from '../../common/model-router'
import {Category} from './categories.model'
import {SubCategoryModel, SubCategory} from '../subcategories/subcategories.model'
import {ProductModel} from '../products/products.model'

class CategoriesRouter extends ModelRouter<Category> {

    constructor(){
        super(Category)
        this.on('beforeRender', document=>{
            
        })
    }

    sortSubCategoriesArray(subCategories: SubCategoryModel[]){
        return subCategories.sort((a, b) => {
            if (a.description > b.description) {
                return 1
            }
        
            if (a.description < b.description) {
                return -1
            }
        
            return 0
        })
    }

    sortProductsArray(products: ProductModel[]){
        return products.sort((a, b) => {
            if (a.description > b.description) {
                return 1
            }
        
            if (a.description < b.description) {
                return -1
            }
        
            return 0
        })
    }

    findSubCategories = (req, resp, next)=>{
        Category.findById(req.params.id)
            .then(category=>{
                if(category){
                    resp.json(category.subCategories)
                    return next()
                }else{
                
                }
            })
            .catch(next)
    }

    findSubCategory = (req, resp, next)=>{
        Category.findById(req.params.idCategory)
            .then(category=>{
                if(category){     
                    category.subCategories.forEach(element => {
                        if(element._id.equals(req.params.idSubCategory)){
                            resp.json(element)
                        }
                    });               
                    return next()
                }else{

                }
            })
            .catch(next)
    }

    addSubCategories = (req, resp, next)=>{
        Category.findById(req.params.id)
            .then(category=>{
                if(category){
                    category.subCategories = this.sortSubCategoriesArray(
                        category.subCategories.concat(req.body))
                    return category.save()
                }else{
                    
                }
            })
            .then(category=>{
                resp.json(category.subCategories)
                return next()
            })
            .catch(next)
    }

    addProducts = (req, resp, next)=>{
        Category.findById(req.params.idCategory)
            .then(category=>{
                if(category){
                    category.subCategories.forEach(element => {
                        if(element._id.equals(req.params.idSubCategory)){
                            element.products = this.sortProductsArray(
                                element.products.concat(req.body)
                            )
                        }
                    });        
                    return category.save()
                }else{
                    
                }
            })
            .then(category=>{
                resp.json(category)
                return next()
            })
            .catch(next)
    }

    applyRoutes(application: restify.Server){
        application.get('/categories', this.findAll)

        application.get('/categories/:id', [this.validateId, this.findById])

        application.get('/categories/:id/subcategories', [this.validateId, this.findSubCategories])

        application.get('/categories/:idCategory/subcategories/:idSubCategory', this.findSubCategory)//[this.validateId, this.findSubCategory2])

        application.post('/categories', this.save)

        application.put('/categories/:id/subcategories', [this.validateId, this.addSubCategories])

        application.put('/categories/:idCategory/subcategories/:idSubCategory/products', this.addProducts)

        application.put('/categories/:id', [this.validateId, this.replace])

        application.patch('/categories/:id', [this.validateId, this.update])

        application.del('/categories/:id', [this.validateId, this.delete])

        application.del('/categories/:id/subcategories/:description', [this.validateId, this.delete])
    }
}

export const categoriesRouter = new CategoriesRouter()