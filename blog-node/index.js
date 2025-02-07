import express from "express";
import connection from "./database/database.js";
import categoriesController from "./categories/CategoriesController.js"
import articlesController from "./articles/ArticlesController.js"
import usersController from "./users/UsersController.js"
import Article from "./articles/Article.js";
import Category from "./categories/Category.js";
import User from "./users/User.js"; 
import session from "express-session";

const app = express();
const port = 8083;

app.set('view engine', 'ejs');

// Sessions
app.use(session({
    secret: "qualquercoisa", cookie: { maxAge: 30000000 }
}))

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //verificar necessidade

connection
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados realizada com sucesso!");
    })
    .catch((err) => {
        console.log("Erro ao conectar com o banco de dados: ", err);
    });

// rota categories
app.use("/", categoriesController);
// rota articles
app.use("/", articlesController);
// rota users
app.use("/", usersController);
 

//rota principal
app.get("/", (req, res) => {
    Article.findAll({
        limit: 4,
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {

        Category.findAll().then(categories => { 
            res.render("index", {articles: articles, categories: categories});  
        })
    })       
});


app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {slug: slug}
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => { 
                res.render("article", {article: article, categories: categories});
            });
            
        } else {
            res.redirect("/");
        }        
    }).catch( err => {
        console.log(err);
        res.redirect("/");
    })
});

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: { slug: slug },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories => { 
                res.render("index", {articles: category.articles, categories: categories});
            });
            
        } else {
            res.redirect("/");
        }        
    }).catch( err => {
        console.log(err);
        res.redirect("/");
    })
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});