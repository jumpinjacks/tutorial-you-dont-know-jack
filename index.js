"use strict"

const hapi = require("hapi")
const blankie = require("blankie")
const scooter = require("scooter")
const server = new hapi.Server()

server.connection({
    "port": 3000,
})

server.route({
    "method": "get", "path": "/",
    handler: function (request, reply) {
        reply("hello world")
    },
})

server.register([scooter, {
    "register": blankie,
    "options": {
        // ..CSP directives here
        "defaultSrc": "self",
    }
}], err => {

    server.start(err => {
        if (err) {
            throw err
        }

        console.log("server at " + server.info.uri)
    })

})
