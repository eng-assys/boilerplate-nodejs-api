'use strict' // Força javascript a ser bem mais criterioso

const http = require('http')
const app = require('../src/app')
const debug = require('debug')('nodestr:server') // tudo adicionado com aspas simples, sem um caminho ele vai buscar na pasta nodemodules
//  se for para importar algo da aplicação, ele tem que começar com o ./
// ex: const xpto = require('./xpto/teste')


const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const server = http.createServer(app)

server.listen(port)
console.log(`Api rodando na porta ${port}`)
server.on('error', (error) => {
    if (error.syscall !== 'listen') throw error
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`)
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`)
            process.exit(1)
            break
        default:
            throw error
    }
})
server.on('listening', () => {
    const addr = server.address()
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
    debug(`Listening on ${bind}`)
})

function normalizePort(val) {
    const port = parseInt(val, 10)
    if (isNaN(port)) return val
    if (port >= 0) return port
    return false
}

