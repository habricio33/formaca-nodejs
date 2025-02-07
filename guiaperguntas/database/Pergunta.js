import { Sequelize } from "sequelize";
import connection from "./database.js";


const Pergunta = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
});

Pergunta.sync({ force: false }).then(() => {});

export default Pergunta;