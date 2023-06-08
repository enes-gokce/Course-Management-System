import axios from 'axios';

const getTranscriptByStudentIdUrl = 'http://localhost:8080/api/transcript/get/'
const getTranscriptInfosUrl = 'http://localhost:8080/api/transcript/get/infos/'
class TranscriptService{

    getTranscriptByStudentId(user_id, token){
        return axios.get(getTranscriptByStudentIdUrl+user_id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }

    getTranscriptInfos(user_id, token){
        return axios.get(getTranscriptInfosUrl+user_id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }
}

export default new TranscriptService();