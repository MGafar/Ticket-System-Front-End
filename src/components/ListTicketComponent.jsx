import React, { Component } from 'react';
import TicketService from '../services/TicketService';

class ListTicketComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            tickets: []
        }

        this.createTicket = this.createTicket.bind(this);
    }

    componentDidMount() {
        TicketService.getTickets().then((response) => {
            this.setState({tickets : response.data});
        });
    }

    createTicket(){
        this.props.history.push('/create');
    }

    render() {
        return (
            <div>
                <div> 
                    <button className="btn btn-primary" onClick={this.createTicket}> 
                        Create Ticket
                    </button>
                </div>
                <div data-testid = "tickets">
                    {
                        this.state.tickets.map(
                            tickets => 
                            <div className="ticket" key={tickets.id}>
                                <div className="ticket-content-wrapper">
                                    <div className="ticket-left-column">
                                        <h2>{tickets.title}</h2>
                                        <p>{tickets.description}</p>
                                    </div>
                                    <div className="ticket-right-column">
                                        <p>ID: {tickets.id}</p>
                                        <p>Author: {tickets.author}</p>
                                        <p>Created: {new Date(tickets.timeCreated).toUTCString()}</p>
                                        <p>Updated: {new Date(tickets.timeUpdated).toUTCString()}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

        );
    }
}

export default ListTicketComponent;