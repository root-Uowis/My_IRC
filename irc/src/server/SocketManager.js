const io = require('./server').io
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../Events')
const { createUser, createMessage, createChat } = require('../Factories')

let connectedUser = {  }



module.exports = function (socket) {
    console.log("Socket id :" + socket.id)


    socket.on(VERIFY_USER, (nickname, callback) => {
        if (isUser(connectedUser, nickname)) {
            callback({ isUser: true, user: null })
        } else {
            callback({ isUser: false, user: createUser({ name: nickname }) })
        }
    })

    socket.on(USER_CONNECTED, (user) => {
        connectedUser = addUser(connectedUser, user)
        socket.user = user

        io.emit(USER_CONNECTED,connectedUser)
        console.log(connectedUser)
    })
}

/**
 * @param userList {Object}
 * @param user {User}
 * @return userList {Object}
 */
function addUser(userList, user) {
    let newList = Object.assign({}, userList)
    newList[user.name] = user
    return newList
}

/**
 * @param userList {Object}
 * @param username {string}
 * @return userList {Object}
 */

function removeUser(userList, username) {
    let newList = Object.assign({}, userList)
    delete newList[username]
    return newList
}

/**
 * @param userList {Object}
 * @param username {string}
 * @return userList {Object}
 */

function isUser(userList, username) {
    return username in userList
}