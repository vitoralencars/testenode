import * as restify from 'restify'
import {Router} from '../common/router'
import {Category} from './categories.model'

class CategoriesRouter extends Router {

    constructor(){
        super()
        this.on('beforeRender', document=>{
            
        })
    }

    applyRoutes(application: restify.Server){
        application.get('/categories', (req, resp, next)=>{
            Category.find().then(this.render(resp, next))
        })

        application.get('/categories/:id', (req, resp, next)=>{
            Category.findById(req.params.id).then(this.render(resp, next))
        })

        application.post('/categories', (req, resp, next)=>{
            let category = new Category(req.body)
            category.save().then(this.render(resp, next))
        })

        application.put('/categories/:id', (req, resp, next)=>{
            const options = {overwrite: true}
            Category.update({_id:req.params.id}, req.body, options)
                .exec()
                .then(result=>{
                    if(result.n){
                        return Category.findById(req.params.id)
                    }else{
                        resp.send(404)
                    }
                }).then(this.render(resp, next))
        })

        application.patch('/categories/:id', (req, resp, next)=>{
            const options = {new: true}
            Category.findByIdAndUpdate({_id:req.params.id}, req.body, options)
                .then(this.render(resp, next))
        })

        application.del('/categories/:id', (req, resp, next)=>{
            Category.remove({_id:req.params.id})
                .exec()
                .then((commandResult: any)=>{
                    if(commandResult.result.any){
                        resp.send(200)
                    }else{
                        resp.send(404)
                    }
                    return next()
                })
        })
    }
}

export const categoriesRouter = new CategoriesRouter()