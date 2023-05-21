
import {html} from '../../node_modules/lit-html/lit-html.js';

import { deleteListing, getAllListings } from '../api/data.js';

//import """confirmed"""

const detailsTemplate=(car,isOwner,onDelete)=>html=`
<section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src="${car.imageUrl}">
                <hr>
                <ul class="listing-props">
                    <li><span>Brand:</span>${car.brand}</li>
                    <li><span>Model:</span>${car.model}</li>
                    <li><span>Year:</span>${car.year}</li>
                    <li><span>Price:</span>${car.price}$</li>
                </ul>

                <p class="description-para">${car.description}</p>
         ${isOwner?html`
                <div class="listings-buttons">
                    <a href="/edit/${car._id}" class="button-list">Edit</a>
                    <a @click=${onDelete}href="javascript:void(0)" class="button-list">Delete</a>
                </div>`:''}
            </div>
        </section>`;

        export async function detailsPge(ctx){

            const carId=ctx.params._id;

            const car=await getListingById(carId);

            const isOwner=car._ownerId==ctx.user._id && ctx.user

            ctx.render(detailsTemplate(car,isOwner));

            async function onDelete(event){

                const confirmed=confirm('Are you sure?');
             
                if(confirmed){
                    await deleteListing(carId);
                    ctx.redirect('/allListings');
                }
            }
        }