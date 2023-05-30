import axios from "axios";

const getProfileUrl = 'http://localhost:8080/api/profile/';
const getAdvisorByStudentIdUrl = 'http://localhost:8080/api/profile/advisor/'

class ProfileService{

    getProfileById(id, token){
        return axios.get(getProfileUrl+id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }

    getAdvisorProfileByStudentId(student_id, token){
        return axios.get(getAdvisorByStudentIdUrl+student_id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }
}

export default new ProfileService();