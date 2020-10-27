const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const port = 5001;

// Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ha Quang Huy_home'
    });
});

app.get('/products', (req, res) => {
    if (!req.query.name) {
        return res.send({
            error: 'You must provide a name term'
        })
    }
    res.send({
        name: req.query.name
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ha Quang Huy_help'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});