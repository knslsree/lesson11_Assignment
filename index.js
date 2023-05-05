const dbDriver = require('better-sqlite3');
const db = dbDriver('bands.sqlite3');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('frontend'));

/*set up all routes*/
//Get 
app.get('/api/bands', (req,res)=> {
    const statement = db.prepare('SELECT * FROM bands');
    const bands = statement.all();
    res.json(bands);
});
//GET 1
app.get('/api/bands/:id',(req,res)=>{
    const statement = db.prepare('SELECT * FROM bands WHERE ID=?');
    const post = statement.get(req.params.id);
    res.json(post);
});

//POST
app.post('/api/bands',(req,res)=>{
    const post = req.body;
    const statement = db.prepare('INSERT INTO bands(name,genre) VALUES(?,?)');
    const result = statement.run(post.name,post.genre);
    res.json({id:result.lastInsertRowid,success:true});
});

//PUT
app.put('/api/bands/:id',(req,res) => {
    const posts = req.body;
    const statement = db.prepare('UPDATE bands SET name = ? , genre = ? WHERE id = ?');
    const result = statement.run(posts.name, posts.genre, req.params.id);
    res.json({changes: result.changes, success:true});
});

//DELETE
app.delete('/api/bands/:id' , (req,res) => {
    const statement = db.prepare('DELETE FROM bands WHERE ID = ?');
    const result = statement.run(req.params.id);
    res.json({success:true});
});
/* Start server*/
app.listen(5000,console.log('Server started on port 5000'));