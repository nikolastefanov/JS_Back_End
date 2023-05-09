import page from '../../node_modules/page/page.mjs';
import{render} from '../node_modules/lit-html/lit-html.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import {logout as apiLogout} from './api/data.js';
import { catalogPage} from './views/catalog.js';
import { createPage} from './views/create.js';
import { detailsPage} from './views/details.js';
import { editPage} from './views/edit.js';
import { profilePage} from './views/profile.js';
//import { notify} from '../notification.js';






import * as api from './api/api.js';
//import { redirect } from 'page';

//api.settings.host='http://localhost:3030';

const main=document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', logout)

window.api=api;

setUserNav();

page('/',decorateContext,guestUsersOnly,homePage);
page('/login',decorateContext,loginPage);
page('/register',decorateContext,registerPage);
page('/catalog',decorateContext,catalogPage);
page('/create',decorateContext,createPage);
page('/details/:id',decorateContext,detailsPage);
page('/edit/:id',decorateContext,editPage);
page('/profile',decorateContext,profilePage);






page.start();


function guestUsersOnly(ctx,next){


    const token=sessionStorage.getItem('authToken');

    if(token != null){
        return ctx.page.redirect('/catalog')
    }

    next();
}

//middleware

function decorateContext(ctx,next){
    //console.log(ctx)
    ctx.render=(content)=>render(content,main);

    ctx.setUserNav=setUserNav();

    next();
}

function setUserNav(){
    const token=sessionStorage.getItem('authToken');

    if(token != null){
        document.querySelector('.user').style.display='';
        document.querySelector('.guest').style.display='';
    }else{
        document.querySelector('.user').style.display='';
        document.querySelector('.guest').style.display='';
    }
}

async function logout(){
    await apiLogout();
    setUserNav();
    page/redirect('/');
}

//Application- specific request

export async function getMemes(){

    return await api.get(host+'/data/memes?sortBy=_createdOn%20desc')
}

    
