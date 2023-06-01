import axios from "axios";

const getRegisteredSectionsUrl = 'http://localhost:8080/api/course/registeredSections/';

class CourseService{

    getCurrentSemesterCourses(id, token){
        return axios.get(getRegisteredSectionsUrl+id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }



}

export default new CourseService();