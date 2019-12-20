const express = require('express');
const sessions = require("express-session");
const KnexSessionStore = require("connect-session-knex")(sessions);

const db = require('./data/dbConfig')

const usersRouter = require('./schema/users/router')

const server = express();

const sessionConfiguration = {
    name: "authsession",
    secret: "this is our secret string that we don't want getting out.",
    saveUninitialized: true,
    resave: false,

    store: new KnexSessionStore({
        db,
        createtable: true,
        clearInterval: 1000 * 60 * 10,
        sidfieldname: "sid",
        tablename: "sessions"
    }),

    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true
    }
}

server.use(express.json());
server.use(sessions(sessionConfiguration));
server.use('/api/', usersRouter)

module.exports = server;