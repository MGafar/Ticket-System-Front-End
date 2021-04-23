import axios from 'axios';

const TOPIC_API_BASE_URL = "http://localhost:9002/topic";

class TopicService {

    getTopics() {
        return axios.get(TOPIC_API_BASE_URL + "/readAll");
    }

}

export default new TopicService()