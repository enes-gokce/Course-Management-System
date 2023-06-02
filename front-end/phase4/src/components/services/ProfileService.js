import axios from "axios";

const getProfileUrl = 'http://localhost:8080/api/profile/';
const getAdvisorByStudentIdUrl = 'http://localhost:8080/api/profile/advisor/'
const uploadProfilePictureUrl = 'http://localhost:8080/api/profile/upload/'
const getProfilePictureUrl = 'http://localhost:8080/api/profile/picture/'

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
}

export default new ProfileService();