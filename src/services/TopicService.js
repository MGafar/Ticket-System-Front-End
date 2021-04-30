import axios from 'axios';

const API_BASE_URL = "/api/topic";

class TopicService {

    getTopics() {
        return axios.get(API_BASE_URL + "/readAll");
    }

}

export default new TopicService()