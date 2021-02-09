import React, { Component } from 'react'

import { Dialog } from "@reach/dialog"

interface IConfirmationForm {
    title: string,
    description: string
}
export default class ConfirmChange extends Component<IConfirmationForm> {
    state = {
        open: false,
        callback: null
    }

    show = callback => event => {
        event.preventDefault()

        event = {
            ...event,
            target: { ...event.target, value: event.target.value }
        }

        this.setState({
            open: true,
            callback: () => callback(event)
        })
    }

    hide = () => this.setState({ open: false, callback: null })

    confirm = () => {
        this.state.callback()
        this.hide()
    }

    render() {
        return (
            <React.Fragment>

                {this.state.open && (
                    <Dialog>
                        <h1>{this.props.title}</h1>
                        <p>{this.props.description}</p>

                        <button onClick={this.hide}>Cancel</button>
                        <button onClick={this.confirm}>OK</button>
                    </Dialog>
                )}
            </React.Fragment>
        )
    }
}
