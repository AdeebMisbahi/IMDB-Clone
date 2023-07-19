// const URL=`https://omdbapi.com/?i=tt1231&
// apikey=d0407754`;

 const favListContainer=document.querySelector('.fav-list-container');
favListContainer.addEventListener('click', e=>{
 const clickedEle=e.target;

  if(clickedEle.tagName==='I'){
   // item.parentElement.remove();
        // animation
       
        const   grandParent=clickedEle.parentElement.parentElement;
        const parent=clickedEle.parentElement;
        // console.log(parent);
        // console.log(grandParent);
         grandParent.classList.add("fall");


        //removing local todos;
        removeLocalmovie(parent.dataset.id);
        grandParent.addEventListener('transitionend', function(){
          grandParent.remove();
        })


  }else
  if(clickedEle.tagName==='H3' || clickedEle.tagName==='IMG'){
    var result='newPage.html?q='+encodeURIComponent(clickedEle.parentElement.parentElement.id);
    // console.log()
    window.open(result);

   
  }

})
function removeLocalmovie(ID){
  let dataArr;
  if(localStorage.getItem('dataArr')===null){
    dataArr=[];
  }else{
    dataArr=JSON.parse(localStorage.getItem('dataArr'));

  }
  for(let i=0; i<dataArr.length; i++){
 if(dataArr[i].imdbID===ID){
    const index=dataArr[i];

    dataArr.splice(index, 1);
    // console.log(todos);
    localStorage.setItem('dataArr', JSON.stringify(dataArr));
 }
 
  }
}


export function loadFavMovies(){
    
    const addToFav=document.querySelectorAll('#addTo-fav');
  
   addToFav.forEach(btn=>{
    
    btn.addEventListener('click',  ()=>{

         fetch(`https://www.omdbapi.com/?i=${btn.dataset.id}&apikey=d0407754`)
           .then(res=>res.json())
           .then(data=>{
       addToList(data);
    // Store the data in local storage
    //  localStorage.setItem('dataArr', JSON.stringify(data));

         })

        .catch (error=>{
            console.log("ERROR:", error)
        }) 
            
        
    })

   })
}
// function to add fave movie to list
function addToList(moviesData){
// loadFavList();
   
 const ul=document.createElement('ul');
  ul.classList.add('ul-1');
  ul.id=moviesData.imdbID;
  ul.innerHTML=`
  <li class="fav-item-thumbnail"> <img src="${moviesData.Poster}" alt=""></li>
  <li class="fav-item-info">
      <h3>
          ${moviesData.Title} <span>(${moviesData.Year})</span>
          <p>${moviesData.Actors}</p>
      </h3>
  </li>
 
      <button id="removeFrom-fav" data-id=${moviesData.imdbID}>
          <i class="fa-sharp fa-solid fa-heart" onmouseover="this.classList.replace('fa-solid', 'fa-regular')" onmouseout="this.classList.replace('fa-regular', 'fa-solid')" ></i>
      </button>

  `
  favListContainer.appendChild(ul)

    storeData(moviesData);

 
}



// function to save data in local storage
function storeData(movieData){
    let dataArr;
    if(localStorage.getItem('dataArr')===null){
      dataArr=[];
    }else{
      dataArr=JSON.parse(localStorage.getItem('dataArr'));
    }
    dataArr.push(movieData);
    localStorage.setItem('dataArr', JSON.stringify(dataArr))
    
}

export function loadFavList(){
  // favListContainer.innerHTML="";
  let dataArr;
  if(localStorage.getItem('dataArr')===null){
    dataArr=[];
  }else{
    dataArr=JSON.parse(localStorage.getItem('dataArr'));
  }
 
  // console.log(dataArr)
  Array.from(dataArr).forEach(function(moviesData){
  
  const ul=document.createElement('ul');
  ul.classList.add('ul-1');
  ul.id=moviesData.imdbID;
  ul.innerHTML=`
  <li class="fav-item-thumbnail"> <img src="${moviesData.Poster}" alt=""></li>
  <li class="fav-item-info">
      <h3>
          ${moviesData.Title} <span>(${moviesData.Year})</span>
          <p>${moviesData.Actors}</p>
      </h3>
  </li>
 
      <button id="removeFrom-fav" data-id=${moviesData.imdbID}>
          <i class="fa-sharp fa-solid fa-heart" onmouseover="this.classList.replace('fa-solid', 'fa-regular')" onmouseout="this.classList.replace('fa-regular', 'fa-solid')"
         "></i>
      </button>
 
  `
  favListContainer.appendChild(ul)
   })
}

