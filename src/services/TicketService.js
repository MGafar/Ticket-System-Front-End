import axios from 'axios';

const API_BASE_URL = "/api/ticket";

class TicketService {

    getTickets() {
        return axios.get(API_BASE_URL + "/readAll");
    }

    createTicket(ticket) {
        return axios.post(API_BASE_URL + "/create", ticket);
    }

    getTicketById(id){
        return axios.get(API_BASE_URL + "/readById/" + id);
    }

    getTicketsByDepartment(id){
        return axios.get(API_BASE_URL + "/readByDepartment/" + id);
    }

    getTicketsByTopic(id){
        return axios.get(API_BASE_URL + "/readByTopic/" + id);
    }

    updateTicket(id, ticket){
        return axios.put(API_BASE_URL + "/update/" + id, ticket);
    }

    deleteTicket(id) {
        return axios.delete(API_BASE_URL + "/delete/" + id);
    }

    markAsInProgress(id) {
        return axios.put(API_BASE_URL + "/markAsInProgress/" + id);
    }
}

export default new TicketService()