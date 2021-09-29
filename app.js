require('dotenv').config();
const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT;
const app = express();

// Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')
// Servir contenido estatico

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('home', {
        nombre: 'EricLouteiro',
        titulo: 'App NodeJs'
    });
});

app.get('/generic', (req, res)=>{
    res.render('generic', {
        nombre: 'EricLouteiro',
        titulo: 'App NodeJs'
    });
});
app.get('/elements', (req, res)=>{
    res.render('elements', {
        nombre: 'EricLouteiro',
        titulo: 'App NodeJs'
    });
});
app.get('/hola-mundo', (req, res)=>{
    res.send('holamundo en su respectiva ruta');
});

app.get('*', (req, res)=>{
    res.send('404 | Page not found');
});

app.listen(port, ()=>{
    console.log(`app listenning on port: ${port}`)
});
