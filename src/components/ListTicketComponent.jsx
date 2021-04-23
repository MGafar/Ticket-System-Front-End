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
        this.addSolution = this.addSolution.bind(this);
        this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
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

    addSolution(id){
        this.props.history.push({pathname: `/solution/${id}`});
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

    markAsInProgress(id){
        TicketService.markAsInProgress(id).then(res => {
            TicketService.getTickets().then((response) => {
                this.setState({tickets : response.data});
            });
        });
    }

    getStatusButton(status, id){

        if(status === 'OPEN') {
            return <button onClick={() => this.markAsInProgress(id)} className = "btn btn-light" data-testid = {"statusbutton" + id}>Start Work</button>
        } else if(status === 'INPROGRESS') {
            return <button onClick={() => this.addSolution(id)} className = "btn btn-light" data-testid = {"statusbutton" + id}>Mark As Done</button>
        } else {
            return <button className = "btn btn-light disabled" data-testid = {"statusbutton" + id} disabled={true}>Done</button>
        }
    }

    getSolution(solution){
        if(solution != null)
            return(<p><b>Solution: </b>{solution}</p>)
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
                                        <h2><b>Title: </b>{tickets.title}</h2>
                                        <p><b>Description: </b>{tickets.description}</p>
                                        {this.getSolution(tickets.solution)}
                                    </div>
                                    <div className="ticket-right-column">
                                        <button onClick={() => this.editTicket(tickets.id)} className = "btn btn-info" data-testid = {"updatebutton" + tickets.id} disabled={tickets.status === 'DONE'}>Update</button>
                                        <button onClick={() => this.deleteTicket(tickets.id)} className = "btn btn-danger" data-testid = {"deletebutton" + tickets.id} disabled={tickets.status === 'DONE'}>Delete</button>
                                        {this.getStatusButton(tickets.status, tickets.id)}
                                        <p><b>ID:</b> {tickets.id}</p>
                                        <p><b>Department:</b> {tickets.department.name}</p>
                                        <p><b>Topic:</b> {tickets.topic.name}</p>
                                        <p><b>Author:</b> {tickets.author}</p>
                                        <p><b>Created:</b> {new Date(tickets.timeCreated).toUTCString()}</p>
                                        <p><b>Updated:</b> {new Date(tickets.timeUpdated).toUTCString()}</p>
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