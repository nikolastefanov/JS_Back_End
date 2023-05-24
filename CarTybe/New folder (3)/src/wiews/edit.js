import {html} from '../../node_modules/lit-html/lit-html.js';

import {createListing, createListings} from '../api/data.js';

const editTemplate=(car,onSubmit)=>html`
<section id="edit-listing">
<div class="container">

    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Car Listing</h1>
        <p>Please fill in this form to edit an listing.</p>
        <hr>

        <p>Car Brand</p>
        <input type="text" placeholder="Enter Car Brand" name="brand" .value="${car.brand}">

        <p>Car Model</p>
        <input type="text" placeholder="Enter Car Model" name="model" .value="${car.model}">

        <p>Description</p>
        <input type="text" placeholder="Enter Description" name="description" .value="${car.description}">

        <p>Car Year</p>
        <input type="number" placeholder="Enter Car Year" name="year" .value="${car.year}">

        <p>Car Image</p>
        <input type="text" placeholder="Enter Car Image" name="imageUrl" .value="${car.imageUrl}">

        <p>Car Price</p>
        <input type="number" placeholder="Enter Car Price" name="price" .value="${car.ptrice}">

        <hr>
        <input type="submit" class="registerbtn" value="Edit Listing">
    </form>
</div>
</section> `; 


export async function editPage(ctx){

    const carId=ctx.params._id;

    const car=await getListingById(carId);

    ctx.render(editTemplate(car,onSubmit));


    async function onSubmit(event){

        event.preventDefault();

        const formData=new FormData(event.target);

          const editedCar={
                            brand:formData.get('brand'),
                            model:formData.get('model'),
                            desceription:formData.get('description'),
                            year:Number(formData.get('year')),
                            imageUrl:formData.get('imageUrl'),
                             price:Number(formData.get('price'))
                        }

    if(Number.isNaN(editedCar.year)||Number.isNaN(editedCar.price)){
          return alert('Year and price nust be numbers');
      }

    if(Object.values(editedCar).some(x!=x)){
         return alert('All fields are required!');
     }

         await updateListing(carId,editedCar);

         event.target.rest(); // ZA4ISTVA FORMATA !!!!!!

       ctx.page.redirect('details/'+carId);

    }
 }



