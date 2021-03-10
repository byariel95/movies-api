const { config } = require('./config/index');
const app = require('./app');


async function main() {

    await app.listen(config.port,()=>{
        console.log(`Listening http://localhost:${config.port}`);
    });

};
 

main();