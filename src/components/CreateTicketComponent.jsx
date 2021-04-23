import React, { Component } from 'react';
import DepartmentService from '../services/DepartmentService';
import TicketService from '../services/TicketService';
import TopicService from '../services/TopicService';


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
            topic_id : 1,
            topic_name : '',
            departments: [],
            topics: [],
            status : '',
            solution : ''
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescrtiptionHandler = this.changeDescrtiptionHandler.bind(this);
        this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
        this.createOrUpdateTicket = this.createOrUpdateTicket.bind(this);
        this.cancelTicket = this.cancelTicket.bind(this);
        this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
        this.changeTopicHandler = this.changeTopicHandler.bind(this);
        this.changeSolutionHandler = this.changeSolutionHandler.bind(this);
    }

    componentDidMount() {

        DepartmentService.getDepartments().then((response) => {
            this.setState({departments : response.data});
        });

        TopicService.getTopics().then((response) => {
            this.setState({topics : response.data});
        });

        if(this.state.id === 'new'){
            return;
        } else {
            TicketService.getTicketById(this.state.id).then(res => {
                let ticket = res.data;
                this.setState({ title           : ticket.title, 
                                author          : ticket.author, 
                                description     : ticket.description, 
                                department_id   : ticket.department.id, 
                                department_name : ticket.department.name,
                                topic_id        : ticket.topic.id, 
                                topic_name      : ticket.topic.name,
                                status          : ticket.status});
            });
        }
    }

    createOrUpdateTicket = (event) => {
        event.preventDefault();

        if(this.state.id === 'new'){
            let ticket = {  title       : this.state.title, 
                            description : this.state.description, 
                            author      : this.state.author, 
                            department  : {id : this.state.department_id},
                            topic       : {id : this.state.topic_id}, 
                            status      : 'OPEN'};

            TicketService.createTicket(ticket).then(res => {
                this.props.history.push('/');
            });
        } else {
            
            let finalStatus = this.state.inSolutionMode ? "DONE" : this.state.status;

            let ticket = {  title       : this.state.title, 
                            description : this.state.description, 
                            author      : this.state.author, 
                            department  : {id : this.state.department_id},
                            topic       : {id : this.state.topic_id}, 
                            status      : finalStatus, 
                            solution    : this.state.solution};
            
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

    changeTopicHandler = (event) => {
        this.setState({topic_id : event.target.value});
    }

    changeSolutionHandler = (event) => {
        this.setState({solution : event.target.value});
    }

    getSaveButtonText(){
        if(this.state.id === 'new') {
            return "Create";
        } else if (this.state.inSolutionMode) {
            return "Mark as Done"
        } 
        
        return "Save"
    }

    generateSolutionBox() {
        if(this.state.inSolutionMode){
           return  (<p> Solution: <input placeholder = "Solution" name="solution" className="form-control" onChange={this.changeSolutionHandler}/> </p>)
        }
    }

    generateTopicOrDepartmentSelector(selectValue, selectName, selectHandler, selectDataTestId, options) {
        return(
        <select value={selectValue} className="select-css" name={selectName} onChange={selectHandler} data-testid={selectDataTestId}>
            <option disabled value> -- Select a {selectName} -- </option>
            {
            options.map(
                items => 
                    <option value={items.id} key={items.id} disabled={this.state.inSolutionMode}>{items.name}</option>
                )
            }
        </select>)
    }

    generateTextInputs(inputPlaceholder, inputName, inputValue, inputHandler){
        return (<input placeholder = {inputPlaceholder} name={inputName} className="form-control" 
            value={inputValue || ''} onChange={inputHandler} disabled={this.state.inSolutionMode}/>)
    }

    render() {
        return (
            <div>
                <button className = "btn btn-success" onClick={this.createOrUpdateTicket}>{this.getSaveButtonText()}</button>
                <button className = "btn btn-danger" onClick={this.cancelTicket} style={{marginLeft: "10px"}}>Cancel</button>
                <div className="ticket">
                    <div className="ticket-content-wrapper">
                        <div className="ticket-left-column">
                            <h2> Title: {this.generateTextInputs("Title", "title", this.state.title, this.changeTitleHandler)} </h2>
                            <p>  Description: {this.generateTextInputs("Description", "description", this.state.description, this.changeDescrtiptionHandler)} </p>
                            {this.generateSolutionBox()}
                        </div>
                        <div className="ticket-right-column">
                            <p> Author: {this.generateTextInputs("Author", "author", this.state.author, this.changeAuthorHandler)} </p>
                            {this.generateTopicOrDepartmentSelector( this.state.department_id, "Department", this.changeDepartmentHandler, "select-department", this.state.departments)}
                            {this.generateTopicOrDepartmentSelector( this.state.topic_id, "Topic", this.changeTopicHandler, "select-topic", this.state.topics)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateTicketComponent;