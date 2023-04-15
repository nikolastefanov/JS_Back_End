const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const app = require('express')();

const hbs=require('express-handlebars');

require('./config/express')(app);
require('./config/routes')(app);


app.engine('.hbs',hbs({
    extname:'.hbs'
}));

app.set('view engine','.hbs');

app.get('/',(req,res)=>{

    const data={
        name:'Peter',
        age:23,
        items:[
            'Lint',
            'Wallert',
            'Bublelogun',
            'Spare coins1'
        ]
    }
    res.render('home',data)
});

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));