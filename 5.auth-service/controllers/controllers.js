
const loadAllControllers = (app) => {
   
    /** load users controller */
        const usersController = require(`../controllers/users/users`);
        console.log(`Registering users Controller`);
        app.use(`/users`, usersController);

}

module.exports = loadAllControllers;