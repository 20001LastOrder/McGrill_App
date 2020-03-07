const axios = require('axios');

module.exports = {     
    signupCustomer: async function(user){
        let res = await axios.post('http://localhost:5000/user/signup', user);
        return  res;
    },
    signupRestaurantOwner: async function(user){
        let res = await axios.post('http://localhost:5000/owner/signup', user);
        return  res;
    },
    signupAdministrator: async function(user){
        let res = await axios.post('http://localhost:5000/admin/signup', user);
        return  res;
    },
    loginCustomer: async function(loginInfo){
        let res = await axios.get('http://localhost:5000/user/login', {headers: loginInfo});
        return res;
    },
    loginRestaurantOwner: async function(loginInfo){
        let res = await axios.get('http://localhost:5000/owner/login', {headers: loginInfo});
        return res;
    },
    loginAdministrator: async function(loginInfo){
        let res = await axios.get('http://localhost:5000/admin/login', {headers: loginInfo});
        return res;
    },
    deleteUser: async function(userInfo){
        try{
            let res = await axios.delete('http://localhost:5000/user/delete', {headers: userInfo});
            return res;
        }catch(e){
            console.log(e);
            throw e;
        }
    }
}