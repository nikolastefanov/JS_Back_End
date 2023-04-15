const express=require('express');


const app=express();

app.get('/',(req,res)=>{
   res.send('Hello Express!');
});

app.get('/catalog',(req,res)=>{
    res.send('Catalog page');
 });

 app.get('/contact',(req,res)=>{
   res.redirect('about');
});

app.get('/about',(req,res)=>{
   res.send('About page');
});

 app.all('*',(req,res)=>{
    res.send(404,'404 Not Found');
 });



app.listen(3000,console.log('Server lstenning on port 3000'))