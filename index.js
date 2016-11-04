"use strict"

const hapi = require("hapi")
const blankie = require("blankie")
const scooter = require("scooter")
const inert = require("inert")

const server = new hapi.Server()

server.connection({
    "port": 3000,
})

server.register([inert, scooter, {
    "register": blankie,
    "options": {
        // ..CSP directives here
        "defaultSrc": "self",
    }
}], err => {

    server.route({
        "method": "get", "path": "/",
        handler: function (request, reply) {
            reply("hello world")
        },
    })

    server.route({
        "method": "GET", "path": "/{params*}",
        "handler": {
            "directory": {
                "path": "public",
                "listing": true,
            },
        },
    })

    server.start(err => {
        if (err) {
            throw err
        }

        console.log("server at " + server.info.uri)
    })

})
