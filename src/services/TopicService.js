import axios from 'axios';

const TOPIC_API_BASE_URL = process.env.TOPIC_API_BASE_URL;

class TopicService {

    getTopics() {
        return axios.get(TOPIC_API_BASE_URL + "/readAll");
    }

}

export default new TopicService()