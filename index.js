const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const routes = require('./routes/router');

const app = express();
const PORT = process.env.PORT || 7500;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('tiny'));

app.use('/', routes);

app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} Not Found`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        }
    });
});


app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));