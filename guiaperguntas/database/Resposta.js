import { Sequelize } from "sequelize";
import connection from "./database.js";

const Resposta = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})  

Resposta.sync({ force: false }); //sincroniza com o BD, force false não cria a tabela se ela ja existir 

export default Resposta;