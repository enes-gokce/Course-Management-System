import axios from 'axios';

const getSectionsInDepartmentUrl = 'http://localhost:8080/api/admin/get/sections/'
const getStudentRegistrationsUrl = 'http://localhost:8080/api/admin/get/registrations/'
const getStudentProfilesUrl = 'http://localhost:8080/api/admin/get/students/profiles/'
const getTeacherProfilesUrl = 'http://localhost:8080/api/admin/get/teachers/profiles/'
class AdminService{

    getSectionsInDepartment(department_id, token){
        return axios.get(getSectionsInDepartmentUrl+department_id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }

    getStudentRegistrations(department_id, token){
        console.log(department_id);
        return axios.get(getStudentRegistrationsUrl+department_id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }

    getStudentProfiles(department_id, token){
        console.log(department_id);
        return axios.get(getStudentProfilesUrl+department_id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }

    getTeacherProfiles(department_id, token){
        console.log(department_id);
        return axios.get(getTeacherProfilesUrl+department_id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }
}

export default new AdminService();