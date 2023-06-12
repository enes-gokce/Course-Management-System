import axios from 'axios';

const getSectionsByTeacherIdUrl = 'http://localhost:8080/api/teacher/get/sections/all/'
const getStudentsBySectionIdUrl = 'http://localhost:8080/api/teacher/get/students/'
const enterGradeUrl = 'http://localhost:8080/api/teacher/update/grades'
const getSectionGradesStatsUrl = 'http://localhost:8080/api/teacher/get/section/grades-stats/'
class TeacherService{

    getSectionsByTeacherId(user_id, token){
        return axios.get(getSectionsByTeacherIdUrl+user_id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }

    getStudentsBySectionId(section_id, token){
        return axios.get(getStudentsBySectionIdUrl+section_id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }

    enterGrade(grades, token){
        return axios.put(enterGradeUrl, grades, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }

    getSectionGradesStats(section_id, token){
        return axios.get( getSectionGradesStatsUrl+section_id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }
}

export default new TeacherService();