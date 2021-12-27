
const loadAllControllers = (app) => {
   
    /** load users controller */
        const eventController = require(`../controllers/events/events`);
        console.log(`Registering events Controller`);
        app.use(`/events`, eventController);

    /** FUTURE -> load job controller */

}

module.exports = loadAllControllers;