"use strict"

const hapi = require("hapi")
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

server.start(err => {
    if (err) {
        throw err
    }

    console.log("server at " + server.info.uri)
})
