import React, { Component } from 'react';
import TicketService from '../services/TicketService';
import DepartmentService from '../services/DepartmentService';

class CreateTicketComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            title : '',
            description : '',
            author : '',
            department_id : 1,
            department_name : '',
            departments: [],
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescrtiptionHandler = this.changeDescrtiptionHandler.bind(this);
        this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
        this.createOrUpdateTicket = this.createOrUpdateTicket.bind(this);
        this.cancelTicket = this.cancelTicket.bind(this);
    }

    componentDidMount() {

        DepartmentService.getDepartments().then((response) => {
            this.setState({departments : response.data});
        });

        if(this.state.id === 'new'){
            return;
        } else {
            TicketService.getTicketById(this.state.id).then(res => {
                let ticket = res.data;
                this.setState({title : ticket.title, author : ticket.author, description: ticket.description, department_id: ticket.department.id, department_name: ticket.department.name});
            });
        }
    }

    createOrUpdateTicket = (event) => {
        event.preventDefault();

        let ticket = {title : this.state.title, description : this.state.description, author : this.state.author, department : {id : this.state.department_id}};

        if(this.state.id === 'new'){
            TicketService.createTicket(ticket).then(res => {
                this.props.history.push('/');
            });
        } else { 
            TicketService.updateTicket(this.state.id, ticket).then( res => {
                this.props.history.push('/');
            });
        }
    }

    cancelTicket = (event) => {
        event.preventDefault();
        this.props.history.push('/');
    }

    changeTitleHandler = (event) => {
        this.setState({title : event.target.value});
    }

    changeDescrtiptionHandler = (event) => {
        this.setState({description : event.target.value});
    }

    changeAuthorHandler = (event) => {
        this.setState({author : event.target.value});
    }

    changeDepartmentHandler = (event) => {
        this.setState({department_id : event.target.value});
    }

    getCreateOrSaveButton(){
        if(this.state.id === 'new') {
            return <button className = "btn btn-success" onClick={this.createOrUpdateTicket}>Create</button>
        } else {
            return <button className = "btn btn-success" onClick={this.createOrUpdateTicket}>Save</button>
        }
    }

    render() {
        return (
            <div>
                {this.getCreateOrSaveButton()}
                <button className = "btn btn-danger" onClick={this.cancelTicket} style={{marginLeft: "10px"}}>Cancel</button>
                <div className="ticket">
                    <div className="ticket-content-wrapper">
                        <div className="ticket-left-column">
                            <h2>
                                Title: <input placeholder = "Title" name="title" className="form-control" 
                                            value={this.state.title || ''} onChange={this.changeTitleHandler}/> 
                            </h2>
                            <p> Description: <input placeholder = "Description" name="description" className="form-control" 
                                            value={this.state.description || ''} onChange={this.changeDescrtiptionHandler}/> 
                            </p>
                        </div>
                        <div className="ticket-right-column">
                            <p> Author: <input placeholder = "Author" name="author" className="form-control" 
                                            value={this.state.author || ''} onChange={this.changeAuthorHandler}/></p>
                        
                            <select value={this.state.department_id} className="select-css" name="Departments" onChange={this.changeDepartmentHandler} data-testid="select-department">
                                <option disabled value> -- Select a Department -- </option>
                                {
                                this.state.departments.map(
                                    departments => 
                                        <option value={departments.id} key={departments.id}>{departments.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateTicketComponent;