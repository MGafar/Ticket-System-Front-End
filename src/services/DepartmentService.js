import axios from 'axios';

const DEPARTMENT_API_BASE_URL = process.env.DEPARTMENT_API_BASE_URL;

class DepartmentService {

    getDepartments() {
        return axios.get(DEPARTMENT_API_BASE_URL + "/readAll");
    }

}

export default new DepartmentService()