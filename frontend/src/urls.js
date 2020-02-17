let dev = {
    user_signup:  "http://localhost:5000/user/signup",
    owner_signup: "http://localhost:5000/owner/signup",
    all_restaurants:"http://localhost:5000/restaurant/all"
}

module.exports = {
    'development': dev,
    'testing': dev
}