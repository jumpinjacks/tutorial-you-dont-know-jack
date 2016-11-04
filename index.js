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

    server.state("session", {
        "ttl": 24 * 60 * 60 * 1000,
        "isSecure": false,
        "isHttpOnly": false,
        "path": "/",
        "encoding": "base64json",
    })

    server.route({
        "method": "get", "path": "/",
        handler: function (request, reply) {
            let session = request.state.session

            if (!session) {
                session = {
                    "returning": true
                }
            }

            session.date = Date.now()

            return reply("hello world").state("session", session);
        },
    })

    server.route({
        "method": "GET", "path": "/{params*}",
        "handler": {
            "directory": {
                "path": "public",
                // "listing": true,
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
