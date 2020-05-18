const uuidv4 = require('uuid')

/**
 * @prop id {string}
 * @prop name {string}
 * @param {object}
 *  name {string}
 */
const createUser = ({ name = "" } = {}) => (
    {
        id: uuidv4.v4(),
        name
    })



/**
 * @prop id {string}
 * @prop time {Date}
 * @prop messages {string}
 * @prop sender {string}
 * @param {object}
 *         messages {string}
 *         sender {string}
 */

const createMessage = ({ message = "", sender = "" } = {}) => (
    {
        id: uuidv4.v4(),
        time: getTime(new Date(Date.now())),
        message,
        sender
    }
)

/**
* @prop id {string}
* @prop name {string}
* @prop messages {Array.Message}
* @prop users {Array.string}
* @prop users {Array.string}
* @param {object}
*         messages {Array.Message}
*         name {string}
*         users {Array.string}
*/

const createChat = ({ messages = [], name = "Community", users = [] } = {}) => (
    {
        id: uuidv4.v4(),
        name,
        messages,
        users,
        typingUsers: []
    }
)

/**
 * @param date {Date}
 * @return
 */

const getTime = (date) => {
    return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`
}

module.exports = {
    createMessage,
    createChat,
    createUser
}