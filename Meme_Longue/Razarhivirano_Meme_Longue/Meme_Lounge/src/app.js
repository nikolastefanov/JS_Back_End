import page from '../../node_modules/page/page.mjs';
import{render} from '../node_modules/lit-html/lit-html.js';
import { homePage } from './views/home.js';
import * as api from './api/api.js';

api.settings.host='http://localhost:3030';

const main=document.querySelector('main');

setUserNav();

page('/',homePage);

page.start();

console.log(ctx)
//middlewarw

function decorateContext(ctx,next){
    console.log(ctx)
    ctx.render()=(content)=>render(content,main);

    ctx.setUserNav();

    next();
}

function setUserNav(){
    const token=sessionStorage.getItem('authToken');

    if(token != null){
        document.querySelector('.user').style.display='';
        document.querySelector('.guest').style.display='none';
    }else{
        document.querySelector('.user').style.display='none';
        document.querySelector('.guest').style.display='';
    }
}