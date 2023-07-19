// https://www.omdbapi.com/?s=3%20idiots&pag1=1&apikey=d0407754;

import {loadFavMovies} from "./addToFav.js"
import {loadFavList} from "./addToFav.js"


// Get references to form
const form=document.getElementById('form-control');
// Get references to form input
const input=document.getElementById('search-bar');
// Get references to search list container
const searchListContainer=document.querySelector('.search-list-container');
// get referenece to logo image
const logo=document.querySelector('.logo-image');
// Get references to result grid
const resultGrid=document.getElementById('result-grid');


let addToFav;
let searchListItem;

async function FetchMoviesData(searchTerm){
    const URL=`https://omdbapi.com/?s=${searchTerm}&page=1&
apikey=d0407754`;
try{
    const res=await fetch(URL);
    const data=await res.json();
   
    if(data.Response){
        displayMovies(data.Search);
    }
}
catch(error){
    console.log("Error:", error);
}
}

function findMovies(){
    let searchTerm=(input.value).trim();
     
     if(searchTerm.length > 0){
      searchListContainer.classList.remove('hide-search-list')
        FetchMoviesData(searchTerm);
     }
    else{
        searchListContainer.classList.add('hide-search-list')
    }
    

}

function displayMovies(movies){
    searchListContainer.innerHTML=""
    for(let i=0; i<movies.length; i++){
        searchListItem=document.createElement('div');
       searchListItem.classList.add('search-list-item');
       searchListItem.id=movies[i].imdbID;
         
       searchListItem.innerHTML=`
       <div class="item-thumbnail">
       <img src="${movies[i].Poster}" alt="">
   </div>
   <div class="item-info">
     <h3>${movies[i].Title}</h3>
     <p>${movies[i].Year}</p>
   </div>
   <button id="addTo-fav" data-id="${movies[i].imdbID}">
       
       <i class="fa-sharp fa-regular fa-heart" onmouseover="this.classList.replace('fa-regular', 'fa-solid')" onmouseout="this.classList.replace('fa-solid', 'fa-regular')"></i>
   </button>
       `
       //   get references to the addTo-fav button
 addToFav=document.getElementById('addTo-fav');
       
   searchListContainer.appendChild(searchListItem);
     
    }  


//    call function 
    loadMoviesDetail();

// we will cover this function in addToFav js file using module
    loadFavMovies();
}


function loadMoviesDetail(){
   const searchListMovies=searchListContainer.querySelectorAll('.search-list-item');
   searchListMovies.forEach(movie=>{
      
    movie.addEventListener('click',  e=>{
        const clickElement=e.target;
 if(!clickElement.classList.contains('fa-heart')) {
    

var searchResult='newPage.html?q='+encodeURIComponent(movie.id);
       window.open(searchResult);
      
     }else{

         console.log(e.target);

       }

    }) 
      
    })

}


// EventListeners

input.addEventListener('keyup',e=>{
    e.preventDefault;
    findMovies();
})
document.addEventListener('click',e=>{
    if(!e.target.closest('#form-control')){
        searchListContainer.classList.add('hide-search-list')
    }
    else{
        findMovies();
    }
   
})
document.addEventListener("DOMContentLoaded", loadFavList);
// clicking on logo image reload the page
logo.addEventListener('click',function(){
    window.location.reload()
})