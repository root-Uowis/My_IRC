import React, { Component } from 'react';
import { COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED, TYPING } from '../../Events'
import SideBar from './SideBar'
import ChatHeading from './ChatHeading'
import Messages from '../messages/Messages'
import MessageInput from '../messages/MessageInput'

class ChatContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chats: [],
            activeChat: null
        };
    }
    componentDidMount() {
        const { socket } = this.props
        socket.emit(COMMUNITY_CHAT, this.resetChat)
    }

	/*
	* 	@param chat {Chat}
	*/
    resetChat = (chat) => {
        return this.addChat(chat, true)
    }

	/*
	*	@param chat {Chat} 
	*	@param reset {boolean}
	*/
    addChat = (chat, reset) => {
        const { socket } = this.props
        const { chats } = this.state

        const newChats = reset ? [chat] : [...chats, chat]
        this.setState({ chats: newChats})

        const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`
        const typingEvent = `${TYPING}-${chat.id}`

        socket.on(typingEvent)
        socket.on(messageEvent, this.addMessageToChat(chat.id))
    }
    /*
	* 	@param chatId {number}
	*/
    addMessageToChat = (chatId) => {
        return message => {
            const { chats } = this.state
            let newChats = chats.map((chat) => {
                if (chat.id === chatId)
                    chat.messages.push(message)
                return chat
            })

            this.setState({ chats: newChats })
        }
    }

	/*
	*	@param chatId {number}
	*/
    updateTypingInChat = (chatId) => {
        return ({ isTyping, user }) => {
            if (user !== this.props.user.name) {

                const { chats } = this.state

                let newChats = chats.map((chat) => {
                    if (chat.id === chatId) {
                        if (isTyping && !chat.typingUsers.includes(user)) {
                            chat.typingUsers.push(user)
                        } else if (!isTyping && chat.typingUsers.includes(user)) {
                            chat.typingUsers = chat.typingUsers.filter(u => u !== user)
                        }
                    }
                    return chat
                })
                this.setState({ chats: newChats })
            }
        }
    }
    /**
     * @param chatId {number}
     * @param message {string}
     */
    sendMessage = (chatId, message) => {
        const { socket } = this.props
        socket.emit(MESSAGE_SENT, { chatId, message })
    }
    /**
     * @param chatId {number}
     * @param typing {boolean}
     */
    sendTyping = (chatId, isTyping) => {
        const { socket } = this.props
        socket.emit(TYPING, { chatId, isTyping })
    }
    setActiveChat = (activeChat) => {
        this.setState({ activeChat })
    }

    render() {
        const { user, logout } = this.props
        const { chats, activeChat } = this.state

        return (
            <div className="container">
                <SideBar
                    logout={logout}
                    chats={chats}
                    user={user}
                    activeChat={activeChat}
                    setActiveChat={this.setActiveChat}
                />

                <div className="chat-room-container">
                    {
                        activeChat !== null ? (
                            <div className="chat-room">
                                <ChatHeading name={activeChat.name} />
                                <Messages
                                    user={user}
                                    typingUser={activeChat.typingUsers}
                                    messages={activeChat.messages} />
                                <MessageInput
                                    sendMessage={(message) => {
                                        this.sendMessage(activeChat.id, message)
                                    }}
                                    sendTyping={(isTyping) => {
                                        this.sendTyping(activeChat.id, isTyping)

                                    }}
                                />
                            </div>
                        ) : 
                        <div className="chat-room choose">
                            <h3>Choose a Room</h3>
                        </div>
                    }

                </div>
            </div>
        );
    }
}

export default ChatContainer;