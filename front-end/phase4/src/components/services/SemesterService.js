import axios from 'axios';

const getSemestersOfStudentUrl = 'http://localhost:8080/api/semesters/get/'
class SemesterService{

    getSemestersOfStudent(user_id, token){
        return axios.get(getSemestersOfStudentUrl+user_id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }
}

export default new SemesterService();