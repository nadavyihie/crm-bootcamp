require('dotenv').config();
const express = require('express');
const app = express();

// const md5=require('md5');
/********************************* */

/**Init Controllers */
const controller = require('./controllers/controllers');

/**Init Middlewares */
const middlewares = require('./middlewares/middlewares');

/*Init Services  */


async function main() {
    app.listen(process.env.PORT, () => {
        console.log('[main]', 'API is running on port', process.env.PORT)
    })

     await middlewares(app); /*JWT, morgan, ... */
     await controller(app); 

    //  await loadAllServices(app); /*MongoDB, customService, Singleton, ... */

    return "Server has been initialized successfully"
}

main()
    .then(console.log)
    .catch(console.error)



