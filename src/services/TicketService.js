import axios from 'axios';

const TICKET_API_BASE_URL = "http://localhost:9002/ticket";

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

    updateTicket(id, ticket){
        return axios.put(TICKET_API_BASE_URL + "/update/" + id, ticket);
    }

    deleteTicket(id) {
        return axios.delete(TICKET_API_BASE_URL + "/delete/" + id);
    }
}

export default new TicketService()