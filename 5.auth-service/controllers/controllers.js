
const loadAllControllers = (app) => {
   
    /** load users controller */
        const usersController = require(`../controllers/users/users`);
        console.log(`Registering users Controller`);
        app.use(`/users`, usersController);

    /** FUTURE -> load job controller */

}

module.exports = loadAllControllers;