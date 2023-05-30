import axios from 'axios';

const loginUrl = 'http://localhost:8080/auth/login'
const getUserByEmailUrl = 'http://localhost:8080/api/user/'
const getRoleOfUserUrl = 'http://localhost:8080/api/user/role/'
class UserService{

      login(email, password){
          return axios.post(loginUrl, {
            email: email,
            password:password
        })
      }

      getUserByEmail(email, token){
          return axios.get(getUserByEmailUrl+email, {
              headers: {"Authorization": `Bearer ${token}`}
          })
      }

      getRoleOfUser(user_id, token){
        return axios.get(getRoleOfUserUrl+user_id, {
            headers: {"Authorization": `Bearer ${token}`}
        })
      }
}

export default new UserService();