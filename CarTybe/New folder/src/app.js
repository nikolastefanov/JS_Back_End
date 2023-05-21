
//create universal request module(api.js)

//create application specific request(data.js)

//setup routing(page)

//create content decorator middleware(utility functions)

//implement wiews

import page from '../../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';

import {getUserData} from './utility.js';
import * as api from './api/data.js';
import { homePage } from './wiews/home.js';
import { loginPage,registerPage } from './wiews/auth.js';
import { catalogPage } from './wiews/catalog.js';
import { detailsPage } from './wiews/details.js';

import {logout as apiLogout} from './api/data.js';


//api.settings.host='http://localhost:3030';

window.api=api; // za proba


const main =document.getElementById('site-content');

document.getElementById('logoutBtn').addEventListener('click',logout);

setUserNav();

page('/',decorateContext,homePage);
page('/login',decorateContext,loginPage);
page('/register',decorateContext,registerPage);
page('/all-listings',decorateContext,catalogPage);
page('/details/:id,decorateContext',detailsPage);

page.start();

function decorateContext(ctx,next){
    //console.log('decorate context',ctx);

    ctx.render=(content)=>render(content,main);

    ctx.setUserNav=setUserNav();
    
    ctx.user=getUserData();

    next();
}

function setUserNav(){

    const user=getUserData();

    if(user){

        document.getElementById('profile').style.display='';
        document.getElementById('guest').style.display='none';
        document.getElementById('user-greeting').textContent=`Welcome ${user.username}`;

    }else{

        document.getElementById('profile').style.display='none';
        document.getElementById('guest').style.display='';

    }
}


function logout(){
    apiLogout();
    setUserNav();
    page.redirect('/');
}


//page 22