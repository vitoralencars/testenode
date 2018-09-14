import * as restify from 'restify'
import {Router} from '../common/router'
import {Category} from './categories.model'

class CategoriesRouter extends Router {
    applyRoutes(application: restify.Server){
        application.get('/categorias', (req, resp, next)=>{
            Category.find().then(categories=>{
                resp.json(categories)
                return next()
            })
        })

        application.get('/categorias/:id', (req, resp, next)=>{
            Category.findById(req.params.id).then(category=>{
                if(category){
                    resp.json(category)
                    return next()
                }
                resp.send(404)
                return next()
            })
        })
    }
}

export const categoriesRouter = new CategoriesRouter()