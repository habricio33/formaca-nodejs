import express from "express";
import connection from "./database/database.js";
import perguntaModel from "./database/Pergunta.js"; //sequelize orm
import RespostaModel from "./database/Resposta.js";

connection
    .authenticate()
    .then(() => {
        console.log("Conexão realizada com sucesso")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

const app = express();
const port = 8083;

app.set('view engine', 'ejs'); //setar para usar o ejs
app.use(express.static('public'));

// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 


//ROTAS
app.get("/", (req, res) => {
    perguntaModel.findAll({ raw: true, order: [
        ['id','DESC']
    ]}).then(perguntas => {
         res.render("index", { //renderiza o index que está na pasta views
            perguntas: perguntas // variaveis para serem renderizadas
         });
    })    
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar"); //manda para página perguntar
});

app.post("/salvarpergunta", (req,res) => {
    // let titulo = req.body.titulo;
    // let descricao = req.body.descricao;

    const { titulo, descricao } = req.body;

    perguntaModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    })     
})

app.get("/pergunta/:id", (req, res) => {
    let id = req.params.id;

    perguntaModel.findOne({ //perguntaModel tem os dados do modelo (tabelo do BD)
        where: {
            id: id,
        }
    }).then(pergunta => { //then (promisse) passa a resposta a consulta para "frente"
        if(pergunta != undefined) {
            RespostaModel.findAll({
                where: {
                    perguntaId: pergunta.id
                },
                order: [
                   [ 'id', 'DESC' ]
                ]
            }).then(respostas => {
                  res.render("pergunta", { //manda para página perguntaR na pasta views (pergunta é o nome da view)
                  pergunta: pergunta,
                  respostas: respostas  //passa os dados do bd
                }) 
            })           
        } else {
            res.redirect("/")
        }
    })
});

app.post("/responder", (req, res) => {
    let corpo = req.body.corpo;
    let id = req.body.pergunta;//nome dos campos no form

    RespostaModel.create({ //para salvar no BD
      corpo: corpo,
      perguntaId: id  
    }).then(() => {
        res.redirect(`/pergunta/${id}`)
    });
})
 
app.listen(port, (err) => {
    if(err) {
        console.log("Deu ruim no server");
    } else {
        console.log("Server express iniciado na porta 8083");
    }
})