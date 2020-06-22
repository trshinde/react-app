const config = {
    production:{
        DATABASE: process.env.MONGODB_URI,
    },
    default:{
        DATABASE: 'mongodb://localhost:27017/movieDB'
    }
};

exports.get = function get(env){
    return config[env] || config.default
};
