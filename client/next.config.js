module.exports = {
    webpack: (config) => {
        config.watchOptions.poll = 300;
        return config;
    },
}

//Whenever our peoject starts up,
//this project loaded up automatically
//Next then starts reading this file,
//then it calls this file with middle pack configurations that it has created by default
//Pull all the different files inside our project directory, automatically once every 300 miliseconds




