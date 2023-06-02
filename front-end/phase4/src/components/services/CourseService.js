import axios from "axios";

const getRegisteredSectionsUrl = 'http://localhost:8080/api/course/get/registeredSections/';
const getCurrentSemesterCoursesUrl = 'http://localhost:8080/api/course/get/currentSemesterCourses/';
const getAddedSectionsInBasketUrl = 'http://localhost:8080/api/course/basket/get/addedSectionsInBasket/';
const getBasketStatisticsUrl = 'http://localhost:8080/api/course/basket/get/basketStatistics/';
const insertSectionToBasketUrl = 'http://localhost:8080/api/course/basket/post/sectionToBasket/';
const deleteSectionFromBasketUrl = 'http://localhost:8080/api/course/basket/delete/sectionFromBasket/';


class CourseService{

    getRegisteredSections(id, token){
        return axios.get(getRegisteredSectionsUrl+id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }

    getCurrentSemesterCourses(year, token){
        return axios.get(getCurrentSemesterCoursesUrl+year, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }

    getAddedSectionsInBasket(user_id, token){
        return axios.get(getAddedSectionsInBasketUrl+user_id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }

    getBasketStatistics(user_id, token){
        return axios.get(getBasketStatisticsUrl+user_id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }

    insertSectionToBasket(user_id, section_id, token){
        return axios.post(insertSectionToBasketUrl+user_id+"/"+section_id, {}, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }

    deleteSectionFromBasket(user_id, section_id, token){
        console.log("called");
        return axios.delete(deleteSectionFromBasketUrl+user_id+"/"+section_id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }
}

export default new CourseService();