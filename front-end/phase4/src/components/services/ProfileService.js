import axios from "axios";

const getProfileUrl = 'http://localhost:8080/api/profile/';
const getAdvisorByStudentIdUrl = 'http://localhost:8080/api/profile/advisor/'
const uploadProfilePictureUrl = 'http://localhost:8080/api/profile/upload/'
const getProfilePictureUrl = 'http://localhost:8080/api/profile/picture/'
const getAdvisingStudentsProfilesUrl = 'http://localhost:8080/api/profile/advisor/'

const updateProfileUrl = 'http://localhost:8080/api/profile/update/'

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

    uploadProfilePicture(token, profile_id, formData){
        return axios.put(uploadProfilePictureUrl+profile_id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        })
    }

    getProfilePicture(profile_id, token){
        return axios.get(getProfilePictureUrl+profile_id, {
            headers:{
                'Authorization': `Bearer ${token}`
            },
            responseType: 'arraybuffer'
        })
    }

    getAdvisingStudentsProfiles(teacher_id, token){
        return axios.get(getAdvisingStudentsProfilesUrl+teacher_id+"/students", {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }

    updateProfile(token, profile_id, updated_data){
        return axios.put(updateProfileUrl+profile_id, updated_data,{
            headers: {"Authorization": `Bearer ${token}`}
        })
    }
}

export default new ProfileService();