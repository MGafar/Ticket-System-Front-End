import React, { Component } from 'react';
import TicketService from '../services/TicketService';
import DepartmentService from '../services/DepartmentService';

class ListTicketComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            tickets: [],
            departments: []
        }

        this.createTicket = this.createTicket.bind(this);
        this.editTicket = this.editTicket.bind(this);
        this.deleteTicket = this.deleteTicket.bind(this);
    }

    componentDidMount() {
        DepartmentService.getDepartments().then((response) => {
            this.setState({departments : response.data});
        });

        TicketService.getTickets().then((response) => {
            this.setState({tickets : response.data});
        });
    }

    createTicket(){
        this.props.history.push('/create/new');
    }

    editTicket(id){
        this.props.history.push(`/create/${id}`);
    }

    deleteTicket(id){
        TicketService.deleteTicket(id).then(res => {
            TicketService.getTickets().then((response) => {
                this.setState({tickets : response.data});
            });
        });
    }

    changeDepartmentHandler = (event) => {

        if(event.target.value === 'All') {
            TicketService.getTickets().then((response) => {
                this.setState({tickets : response.data});
            });
        } else {
            TicketService.getTicketsByDepartment(event.target.value).then((response) => {
                this.setState({tickets : response.data});
            });
        }
        
        this.setState({department_id : event.target.value});
    }

    render() {
        return (
            <div>
                <div> 
                    <button className="btn btn-primary" id="btn-create-ticket" onClick={this.createTicket}> 
                        Create Ticket
                    </button>
                </div>

                <select className="select-css" name="Departments" onChange={this.changeDepartmentHandler} data-testid="select-department">
                    <option value='All' key='0'>All Departments</option>
                    {
                    this.state.departments.map(
                        departments => 
                            <option value={departments.id} key={departments.id}>{departments.name}</option>
                        )
                    }
                </select>

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
                                        <button onClick={() => this.editTicket(tickets.id)} className = "btn btn-info" data-testid = {"updatebutton" + tickets.id}>Update</button>
                                        <button onClick={() => this.deleteTicket(tickets.id)} className = "btn btn-danger" data-testid = {"deletebutton" + tickets.id}>Delete</button>
                                        <p>ID: {tickets.id}</p>
                                        <p>Department: {tickets.department != null ? tickets.department.name : ""}</p>
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