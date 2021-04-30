import axios from 'axios';

const API_BASE_URL = "/api/department";

class DepartmentService {

    getDepartments() {
        return axios.get(API_BASE_URL + "/readAll");
    }

}

export default new DepartmentService()