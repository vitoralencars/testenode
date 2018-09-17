import {Router} from './router'
import * as mongoose from 'mongoose'

export abstract class ModelRouter<D extends mongoose.Document> extends Router{
    constructor(protected model: mongoose.Model<D>){
        super()
    }

    validateId = (req, resp, next)=>{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            //Tratar erro
        }else{
            next()
        }
    }

    findAll = (req, resp, next)=>{
        this.model
            .find()
            .then(this.renderAll(resp, next))
            .catch(next)
    }

    findById = (req, resp, next)=>{
        this.model
            .findById(req.params.id)
            .then(this.render(resp, next))
            .catch(next)
    }

    save = (req, resp, next)=>{
        let document = new this.model(req.body)
        document.save()
            .then(this.render(resp, next))
    }

    replace =  (req, resp, next)=>{
        const options = {overwrite: true}
        this.model.update({_id:req.params.id}, req.body, options)
            .exec()
            .then(result=>{
                if(result.n){
                    return this.model.findById(req.params.id)
                }else{
                    resp.send(404)
                }
            }).then(this.render(resp, next))
    }

    update = (req, resp, next)=>{
        const options = {new: true}
        this.model.findByIdAndUpdate({_id:req.params.id}, req.body, options)
            .then(this.render(resp, next))
    }

    delete = (req, resp, next)=>{
        this.model.remove({_id:req.params.id})
            .exec()
            .then((commandResult: any)=>{
                if(commandResult.result.n){
                    resp.send(200)
                }else{
                    resp.send(404)
                }
                return next()
            })
    }
}