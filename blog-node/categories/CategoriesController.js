import express from "express";
import Category from "./Category.js";
import slugify from "slugify";

const router = express.Router();

router.get("/categories", (req, res) => {
  res.send("Rota de categories");
});

router.post("/categories/save", (req, res) => {
    let title = req.body.title;
    if(title != undefined){

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => { 
            res.redirect("/admin/categories");
        });

    } else {
        res.redirect("/admin/categories/new")
    }
  });

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

router.get("/admin/categories", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index",{ categories: categories });
    })   
});

router.post("/categories/delete", (req, res) => {
    let id = req.body.id;
    if (id === undefined || isNaN(id)) {   
        res.redirect("/admin/categories");
    } else {
        Category.destroy({ 
            where: { id: id } 
        }).then( () => {
            res.redirect("/admin/categories");
        })
    }
});

router.get("/admin/categories/edit/:id", (req, res) => {
    let id = req.params.id;
    if(isNaN(id)) {
        res.redirect("/admin/categories");
    }
    Category.findByPk(id).then(category => {
        if(category != undefined) {
            res.render("admin/categories/edit", {category: category});
        } else {
            res.redirect("/admin/categories");
        }
     }).catch(err => {  
        res.redirect("/admin/categories");
    })
   
});


router.post("/categories/update", (req, res) => {
    let id = req.body.id;
    let title = req.body.title;

    if (id === undefined || isNaN(id)) {   
        res.redirect("/admin/categories");
    } else {

        Category.update({ title: title, slug: slugify(title) },{
            where: { id: id } 
        }).then( () => {
            res.redirect("/admin/categories");
        })    
    }
});


export default router;