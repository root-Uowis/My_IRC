import React, { Component } from 'react';
import { VERIFY_USER } from '../Events'

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nickname: "",
            error: ""
        }
    }

    setUser = ({ user, isUser }) => {
        if (isUser) {
            this.setError("Nickname taken")
        } else {
            this.props.setUser(user)
            this.setError("")
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { socket } = this.props
        const { nickname } = this.state

        socket.emit(VERIFY_USER, nickname, this.setUser)
    }

    handleChange = (e) => {
        this.setState({ nickname: e.target.value })

    }

    setError = (error) => {
        this.setState({ error })
    }

    render() {
        const { nickname, error } = this.state
        return (
            <div className="container">
                <div className="login">
                    <form onSubmit={this.handleSubmit} classname="login-form">
                        <label htmlFor="nickname">
                            <h2>Write Your NickName</h2>
                        </label>
                        <input
                            ref={(input) => { this.textInput = input }}
                            id="nickname"
                            value={nickname}
                            onChange={this.handleChange}
                            placeholder="?????"
                            type="text" />
                        <div className="error">{error ? error : null}</div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;