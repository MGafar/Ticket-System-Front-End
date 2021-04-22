import React, { Component } from 'react';
import TicketService from '../services/TicketService';
import DepartmentService from '../services/DepartmentService';

class CreateTicketComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            inSolutionMode : this.props.canAddSolution === true,
            title : '',
            description : '',
            author : '',
            department_id : 1,
            department_name : '',
            departments: [],
            status : '',
            solution : ''
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
                this.setState({title : ticket.title, author : ticket.author, description: ticket.description, department_id: ticket.department.id, department_name: ticket.department.name, status : ticket.status});
            });
        }
    }

    createOrUpdateTicket = (event) => {
        event.preventDefault();

        if(this.state.id === 'new'){
            let ticket = {title : this.state.title, description : this.state.description, author : this.state.author, department : {id : this.state.department_id}, status : 'OPEN'};

            TicketService.createTicket(ticket).then(res => {
                this.props.history.push('/');
            });
        } else {
            
            let finalStatus = this.state.inSolutionMode ? "DONE" : this.state.status;

            let ticket = {title : this.state.title, description : this.state.description, author : this.state.author, department : {id : this.state.department_id}, status : finalStatus, solution : this.state.solution};
            
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

    changeSolutionHandler = (event) => {
        this.setState({solution : event.target.value});
    }

    getSaveButton(){
        if(this.state.id === 'new') {
            return <button className = "btn btn-success" onClick={this.createOrUpdateTicket}>Create</button>
        } else if (this.state.inSolutionMode) {
            return <button className = "btn btn-success" onClick={this.createOrUpdateTicket}>Mark as Done</button>
        } else {
            return <button className = "btn btn-success" onClick={this.createOrUpdateTicket}>Save</button>
        }
    }

    addSolutionBox() {
        if(this.state.inSolutionMode){
           return  (<p> Solution: <input placeholder = "Solution" name="solution" className="form-control" onChange={this.changeSolutionHandler}/> </p>)
        }
    }

    render() {
        return (
            <div>
                {this.getSaveButton()}
                <button className = "btn btn-danger" onClick={this.cancelTicket} style={{marginLeft: "10px"}}>Cancel</button>
                <div className="ticket">
                    <div className="ticket-content-wrapper">
                        <div className="ticket-left-column">
                            <h2>
                                Title: <input placeholder = "Title" name="title" className="form-control" 
                                            value={this.state.title || ''} onChange={this.changeTitleHandler} disabled={this.state.inSolutionMode}/> 
                            </h2>
                            <p> Description: <input placeholder = "Description" name="description" className="form-control" 
                                            value={this.state.description || ''} onChange={this.changeDescrtiptionHandler} disabled={this.state.inSolutionMode}/> 
                            </p>
                            {this.addSolutionBox()}
                        </div>
                        <div className="ticket-right-column">
                            <p> Author: <input placeholder = "Author" name="author" className="form-control" 
                                            value={this.state.author || ''} onChange={this.changeAuthorHandler} disabled={this.state.inSolutionMode}/></p>
                        
                            <select value={this.state.department_id} className="select-css" name="Departments" onChange={this.changeDepartmentHandler} data-testid="select-department">
                                <option disabled value> -- Select a Department -- </option>
                                {
                                this.state.departments.map(
                                    departments => 
                                        <option value={departments.id} key={departments.id} disabled={this.state.inSolutionMode}>{departments.name}</option>
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