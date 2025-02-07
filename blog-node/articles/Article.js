import { Sequelize } from "sequelize";
import connection from "../database/database.js";
import Category from "../categories/Category.js";

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
})

Article.belongsTo(Category); //belongsTo = pertence a (1-1) 
Category.hasMany(Article) //1-N tem muitos  

Article.sync({force: false})

export default Article;