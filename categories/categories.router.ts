import * as restify from 'restify'
import {ModelRouter} from '../common/model-router'
import {Category} from './categories.model'

class CategoriesRouter extends ModelRouter<Category> {

    constructor(){
        super(Category)
        this.on('beforeRender', document=>{
            
        })
    }

    findSubCategory = (req, resp, next)=>{
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

    addSubCategory = (req, resp, next)=>{
        Category.findById(req.params.id)
                .then(category=>{
                    if(category){
                        category.subCategories = req.body
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

    applyRoutes(application: restify.Server){
        application.get('/categories', this.findAll)

        application.get('/categories/:id', [this.validateId, this.findById])

        application.get('/categories/:id/subcategories', [this.validateId, this.findSubCategory])

        application.post('/categories', this.save)

        //application.put('/categories/:id/subcategories', [this.validateId, this.addSubCategory])

        application.put('/categories/:id', [this.validateId, this.replace])

        application.patch('/categories/:id', [this.validateId, this.update])

        application.del('/categories/:id', [this.validateId, this.delete])
    }
}

export const categoriesRouter = new CategoriesRouter()