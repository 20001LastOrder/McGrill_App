prod = {
    'dburi': process.env.ATLAS_URI
}

dev = {
    'dburi': 'mongodb://q53677610:admin@cluster0-shard-00-00-7depn.mongodb.net:27017,cluster0-shard-00-01-7depn.mongodb.net:27017,cluster0-shard-00-02-7depn.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
}

test = {
    'dburi': 'mongodb://127.0.0.1/my_database'
}


module.exports = {
    'production': prod,
    'development': dev,
    'testing': test
}

