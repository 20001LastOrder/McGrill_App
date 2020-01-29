prod = {
    'dburi': process.env.ATLAS_URI
}

dev = {
    'dburi': 'mongodb+srv://q53677610:admin@cluster0-7depn.mongodb.net/test?retryWrites=true&w=majority'
}

module.exports = {
    'production': prod,
    'development': dev
}

