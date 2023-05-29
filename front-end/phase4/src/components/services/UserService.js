import axios from 'axios';

const loginUrl = 'http://localhost:8080/auth/login'
const getUserByEmailUrl = 'http://localhost:8080/api/user/'
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
}

export default new UserService();