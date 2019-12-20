const db = require('../../data/dbConfig')

const getUsers = () => db('users')

const getUsersByDepartment = user => {
    return db('users').where("department", user.department)
}

const addUser = user => {
    return db('users').insert(user)
}

const findByUsername = username => {
    return db('users').where(username)
}

module.exports = {
    getUsers,
    addUser,
    findByUsername,
    getUsersByDepartment
}