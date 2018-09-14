import {Server} from './server/server'
import { error } from 'util';
import {categoriesRouter} from './categories/categories.router'

const server = new Server()
server.bootstrap([categoriesRouter]).then(server=>{
    console.log('Deu certo')
}).catch(error=>{
    console.log('Deu errado')
    console.error(error)
    process.exit(1)
})