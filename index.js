const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4 : uuidv4 } = require('uuid');
const methodOverride = require('method-override');

//uuidv4(); // ⇨ 'b18794e8-5d0d-417c-b361-ba38e78411b4'

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(methodOverride('_method'));

let posts = [
    {
        id : uuidv4(),
        username : "chetankhanna",
        content : "Hi There, I have started my career in I.T field with a starting Salary of 8.5LPA."
    },
    {
        id : uuidv4(),
        username : "iamchetankhanna",
        content : "Hi There, Polytrade token with ticker $TRADE has touched the price of $15 and I have sold my holding of that token at $14.5 per token."
    },
    {
        id : uuidv4(),
        username : "anshulgarg",
        content : "Hi There, Mujhe Shaadi karni hai..."
    }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    console.log(post);
    //res.send(`request working for ${id}`);
    if(post){res.render("show.ejs", { post });}
    else{ throw new Error(`This post doesn't exist`);}; 
});

app.post("/posts", (req, res) => {
    console.log(req.body);
    let id = uuidv4();
    let { username, content } = req.body;
    posts.unshift({ id, username, content });
    res.redirect("/posts");
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    console.log(newContent);
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    //res.send('Patch Request Working');
    res.redirect('/posts');
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post.content);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    //res.send("Delete Success");
    res.redirect("/posts");
    
});


app.listen(port, () => {
    console.log(`Listening to Port ${port}`);
});

