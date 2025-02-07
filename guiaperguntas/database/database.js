import { Sequelize } from "sequelize";

const connection = new Sequelize('guiaperguntas','root','', {
    host: 'localhost',
    dialect:'mysql'
});

// try {
//     await Sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

export default  connection ;