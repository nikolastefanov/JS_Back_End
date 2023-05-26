import {html, render} from'../../node_modules/lit-html/lit-html.js';
import * as api from './api/api.js';

const homeTemplate=()=>html`
<h1>MEMEMEME</h1>`;

export async function homePage(ctx){
    ctx.render(homeTemplate());
}