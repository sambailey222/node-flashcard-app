const express = require('express');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded());
app.use(cookieParser());

const mainRoutes = require("./routes");
const cardRoutes = require("./routes/cards");

app.use(mainRoutes);
app.use("/cards", cardRoutes);
app.use('/static' ,express.static('public'));
// app.use(routes);

// const colors = [
//     'red',
//     'orange',
//     'yellow',
//     'green',
//     'blue',
//     'purple'
//   ];

// app.use((req, res, next) => {
//     console.log('hello');
//     const err = new Error('oh boy');
//     err.status = 500;
//     next(err);
// }
// );

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.render('error');
  });

app.use((req, res, next) => {
    console.log('world');
    next();
});

app.set('view engine', 'pug');



app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
});

// app.all('/hello', (req, res) => {
//     res.cookie('username', req.body.username);
//     res.render('hello', { name: req.body.username });
    
// });

app.listen(3000, () => {
    console.log('The server is running on localhost:3000!');
});

