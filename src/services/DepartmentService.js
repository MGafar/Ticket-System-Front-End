import axios from 'axios';

const TICKET_API_BASE_URL = "http://localhost:9002/department";

class DepartmentService {

    getDepartments() {
        return axios.get(TICKET_API_BASE_URL + "/readAll");
    }

}

export default new DepartmentService()