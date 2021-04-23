import React, { Component } from 'react';
import DepartmentService from '../services/DepartmentService';
import TicketService from '../services/TicketService';
import TopicService from '../services/TopicService';

class ListTicketComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            tickets: [],
            departments: [],
            topics: [],
            filter: 'None',
            subOptionValue: 'All'
        }

        this.createTicket = this.createTicket.bind(this);
        this.editTicket = this.editTicket.bind(this);
        this.deleteTicket = this.deleteTicket.bind(this);
        this.addSolution = this.addSolution.bind(this);
        this.changeFilterOptionHandler = this.changeFilterOptionHandler.bind(this);
        this.changeFilterSubOptionHandler = this.changeFilterSubOptionHandler.bind(this);
    }

    componentDidMount() {
        DepartmentService.getDepartments().then((response) => {
            this.setState({departments : response.data});
        });

        TopicService.getTopics().then((response) => {
            this.setState({topics : response.data});
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

    changeFilterOptionHandler = (event) => {
        this.setState({filter : event.target.value, subOptionValue : 'All'});

        TicketService.getTickets().then((response) => {
            this.setState({tickets : response.data});
        });
    }

    changeFilterSubOptionHandler = (event) => {

        if(event.target.value === 'All') {
            TicketService.getTickets().then((response) => {
                this.setState({tickets : response.data});
            });
        } else if (this.state.filter === 'Departments') {
            TicketService.getTicketsByDepartment(event.target.value).then((response) => {
                this.setState({tickets : response.data});
            });
        } else if (this.state.filter === 'Topics') {
            TicketService.getTicketsByTopic(event.target.value).then((response) => {
                this.setState({tickets : response.data});
            });
        }

        this.setState({subOptionValue : event.target.value});
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

    getFilterOptions(){

        if(this.state.filter === 'None')
            return null;

        let optionsMap = this.state.filter === "Departments" ? this.state.departments : this.state.topics;

        return  (<select value={this.state.subOptionValue} className="select-css" name={this.state.filter} onChange={this.changeFilterSubOptionHandler} data-testid="select-department-topic">
                    <option value='All' key='0'>All {this.state.filter}</option>
                    {
                        optionsMap.map(
                            items => 
                                <option value={items.id} key={items.id}>{items.name}</option>
                            )
                    }
                </select>)
    }

    render() {
        return (
            <div>
                <div> 
                    <button className="btn btn-primary" id="btn-create-ticket" onClick={this.createTicket}> 
                        Create Ticket
                    </button>
                </div>

                <select className="select-css" name="Filter" onChange={this.changeFilterOptionHandler} data-testid="select-filter">
                    <option value='None' key='0'>Filter By</option>
                    <option value='Departments' key='1'>Departments</option>
                    <option value='Topics' key='2'>Topics</option>
                </select>

                {this.getFilterOptions()}

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