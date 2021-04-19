import axios from 'axios';

const TICKET_API_BASE_URL = "http://localhost:9002/ticket";

class TicketService {

    getTickets() {
        return axios.get(TICKET_API_BASE_URL + "/readAll");
    }

    createTicket(ticket) {
        return axios.post(TICKET_API_BASE_URL + "/create", ticket);
    }
}

export default new TicketService()