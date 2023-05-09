import {html} from'../../node_modules/lit-html/lit-html.js';

import{getMyMemes} from '../api/data.js';

 

 const memeTemplate=(meme)=>html`
<div class="meme">
<div class="card">
    <div class="info">
        <p class="meme-title">${meme.title}</p>
        <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
    </div>
    <div id="data-buttons">
        <a class="button" href="/details/${meme._id}">Details</a>
    </div>
</div>
</div> `;


const profileTemplate=(memes,username,email,gender)=>html`
<section id="user-profile-page" class="user-profile">
<article class="user-info">
    <img id="user-avatar-url" alt="user-profile" src="/images/${gender}.png">
    <div class="user-content">
        <p>Username: ${username}</p>
        <p>Email: ${email}</p>
        <p>My memes count: ${memes.length}</p>
    </div>
</article>
<h1 id="user-listings-title">User Memes</h1>
<div class="user-meme-listings">
   
${memes.length==0?html`<p class="no-memes">No memes in database.</p>`
                 :memes.map(m=>memeTemplate(m))};
    
</div>
</section> `;




export async function profilePage(ctx){

    const memes=await getMyMemes();

    const username=sessionStorage.getItem('username');
    const email=sessionStorage.getItem('emial');
    const gender=sessionStorage.getItem('gender');

    ctx.render(profileTemplate(memes,username,email,gender));

}