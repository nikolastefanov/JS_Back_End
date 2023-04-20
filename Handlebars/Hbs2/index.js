const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];

const express=require('express');

const{ engine }=require('express-handlebars');

const app = express();

app.engine('.hbs', engine({extname:'.hbs'}));
app.set('view engine', '.hbs');
app.set('views','./views');



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