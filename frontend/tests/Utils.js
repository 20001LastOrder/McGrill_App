const axios = require('axios');

module.exports = {     
    signupCustomer: async function(user){
        let res = await axios.post('http://localhost:5000/user/signup', user);
        return  res;
    },
    signupRestaurantOwner: async function(user){
        try{
            let res = await axios.post('http://localhost:5000/owner/signup', user);
            return  res;
        }catch(e){
            console.error(e);
        }
    },
    signupAdministrator: async function(user){
        let res = await axios.post('http://localhost:5000/admin/signup', user);
        return  res;
    },
    /**
     * 
     * @param {*} loginInfo: object with email and password attribute 
     */
    loginCustomer: async function(loginInfo){
        let res = await axios.get('http://localhost:5000/user/login', {headers: loginInfo});
        return res;
    },
    /**
     * 
     * @param {*} loginInfo: object with email and password attribute 
     */
    loginRestaurantOwner: async function(loginInfo){
        let res = await axios.get('http://localhost:5000/owner/login', {headers: loginInfo});
        return res;
    },
    /**
     * 
     * @param {Object} loginInfo: object with email and password attribute 
     */
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
    },
    addMenuItem: async function(restaurantId, header, body){
        try{
            let res = await axios.post('http://localhost:5000/menu/item/create?restaurantId='+restaurantId, body, {headers: header});
            return res;
        }catch(e){
            console.log(e);
            throw e;
        }
    },
    /**
     * @param {string} token
     * @param {Object} body: needs: customerId, restaurantId and order_items
     */
    createOrder: async function(token, body){
        try{
            let res = await axios.post('http://localhost:5000/order/create', body, {
                headers:{'Authorization':`Bearer ${token}`}
            });
            return res;
        }catch(e){
            console.log(e);
            throw e;
        }
    },

    /**
     * @param {string} token
     * @param {Object} body: needs: restaurantId
     */
    searchRestaurant: async function(token, body){
        try{
            let res = await axios.get('http://localhost:5000/restaurant/search?restaurantId='+body, {
                headers:{'Authorization':`Bearer ${token}`}
            });
            return res;
        }catch(e){
            console.log(e);
            throw e;
        }
    },

    /**
     * @param {string} token
     * @param {Object} body: needs: restaurantId
     */
    filterByCategory: async function(token, body){
        try{
            let res = await axios.get('http://localhost:5000/restaurant/getByCategory?category='+body, {
                headers:{'Authorization':`Bearer ${token}`}
            });
            return res;
        }catch(e){
            throw e;
        }
    }, 
    updateStatus: async function(token, body){
        try{
            let res = await axios.post('http://localhost:5000/order/update', body, {
                headers:{'Authorization':`Bearer ${token}`}
            });
            return res;
        }catch(e){
            console.log(e);
            throw e;
        }
    },
    pause: function(client, ms){
        return new Promise((resolve, reject)=>{
            client.pause(ms, ()=>{
                resolve();
            });
        })
    }
}