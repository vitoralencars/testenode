import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { Promise } from 'mongoose'
import {environment} from '../common/environment'
import {Router} from '../common/router'

export class Server{

    initializeDb(){
        (<any>mongoose).Promise = global.Promise
        return mongoose.connect(environment.db.url, {
            useNewUrlParser: true
        })
    }

    application: restify.Server

    initRoutes(routers: Router[]): Promise<any>{
        return new Promise((resolve, reject)=>{
            try{
                
                this.application = restify.createServer({
                    name: 'teste-api',
                    version: '1.0.0'
                })
                
                this.application.use(restify.plugins.queryParser())

                for(let r of routers){
                    r.applyRoutes(this.application)
                }

                this.application.listen(environment.server.port, ()=>{
                    resolve(this.application)
                })

            }catch(error){
                reject(error)
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server>{
        return this.initializeDb().then(()=>
            this.initRoutes(routers).then(()=>this))
    }

}