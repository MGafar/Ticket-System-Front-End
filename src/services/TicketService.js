import axios from 'axios';

const TICKET_API_BASE_URL = process.env.TICKET_API_BASE_URL;

class TicketService {

    getTickets() {
        return axios.get(TICKET_API_BASE_URL + "/readAll");
    }

    createTicket(ticket) {
        return axios.post(TICKET_API_BASE_URL + "/create", ticket);
    }

    getTicketById(id){
        return axios.get(TICKET_API_BASE_URL + "/readById/" + id);
    }

    getTicketsByDepartment(id){
        return axios.get(TICKET_API_BASE_URL + "/readByDepartment/" + id);
    }

    getTicketsByTopic(id){
        return axios.get(TICKET_API_BASE_URL + "/readByTopic/" + id);
    }

    updateTicket(id, ticket){
        return axios.put(TICKET_API_BASE_URL + "/update/" + id, ticket);
    }

    deleteTicket(id) {
        return axios.delete(TICKET_API_BASE_URL + "/delete/" + id);
    }

    markAsInProgress(id) {
        return axios.put(TICKET_API_BASE_URL + "/markAsInProgress/" + id);
    }
}

export default new TicketService()