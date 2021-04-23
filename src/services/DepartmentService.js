import axios from 'axios';

const DEPARTMENT_API_BASE_URL = "http://localhost:9002/department";

class DepartmentService {

    getDepartments() {
        return axios.get(DEPARTMENT_API_BASE_URL + "/readAll");
    }

}

export default new DepartmentService()