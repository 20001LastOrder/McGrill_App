prod = {
    'dburi': process.env.ATLAS_URI
}

dev = {
    'dburi': 'mongodb+srv://q53677610:admin@cluster0-7depn.mongodb.net/test?retryWrites=true&w=majority'
}

test = {
    'dburi': 'mongodb://127.0.0.1/my_database'
}


module.exports = {
    'production': prod,
    'development': dev,
    'testing': test
}

