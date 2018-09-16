import * as restify from 'restify'

const mpContentType = 'application/merge-patch+json'

export const mergePatchBodyParser = (req: restify.Request, resp: restify.Response, next)=>{
    if(req.getContentType() === mpContentType && req.method === 'PATCH'){
        try{
            req.body = JSON.parse(req.body)
            return next()
        }catch(e){
            return next(new Error(`Conteúdo inválido: ${e.message}`))
        }
    }
}