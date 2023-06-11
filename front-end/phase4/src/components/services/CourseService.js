import axios from "axios";

const getRegisteredSectionsUrl = 'http://localhost:8080/api/course/get/registeredSections/';
const getCurrentSemesterCoursesUrl = 'http://localhost:8080/api/course/get/currentSemesterCourses/';
const getAddedSectionsInBasketUrl = 'http://localhost:8080/api/course/basket/get/addedSectionsInBasket/';

const getBasketStatisticsUrl = 'http://localhost:8080/api/course/basket/get/basketStatistics/';
const insertSectionToBasketUrl = 'http://localhost:8080/api/course/basket/post/sectionToBasket/';
const deleteSectionFromBasketUrl = 'http://localhost:8080/api/course/basket/delete/sectionFromBasket/';

const getRegistrationStatusUrl = 'http://localhost:8080/api/course/basket/get/registrationStatus/';
const updateRegistrationStatusUrl = 'http://localhost:8080/api/course/basket/update/registrationStatus/';

const updateSectionQuotaUrl = 'http://localhost:8080/api/course/section/update/quota/'


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

    getRegistrationStatus(user_id, token){
        return axios.get(getRegistrationStatusUrl+user_id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }

    updateRegistrationStatus(user_id, token, statusDto){
        console.log(statusDto);
        return axios.put(updateRegistrationStatusUrl+user_id, {
            registration_status: statusDto.registration_status,
            advisor_approval: statusDto.advisor_approval
        }, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }

    updateSectionQuota(section_id, operation, token){
        return axios.put(updateSectionQuotaUrl+section_id+"/"+operation, {}, {
            headers: {"Authorization": `Bearer ${token}`}
        })
    }
}

export default new CourseService();