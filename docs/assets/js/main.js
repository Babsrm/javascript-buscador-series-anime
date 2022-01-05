"use strict";const searchBtn=document.querySelector(".js-searchBtn"),resetBtn=document.querySelector(".js-resetBtn"),resetBtnFav=document.querySelector(".js-resetBtnfav"),listaFavs=document.querySelector(".js-favlistcontainer"),resultsForDlt=document.querySelector(".js-resultsData"),resultsApi=document.querySelector(".js-resultsData"),logBtn=document.querySelector(".js-paintConsole"),apiURL="https://api.jikan.moe/v3/search/anime?q=",imgIfNone="https://via.placeholder.com/227x320/e5e5e5/666/?text=TV";let addFav=[],textInput="",serieList=[],favorites=[];function executeLog(){for(const e of favorites)console.log(e.title)}function handleResetBtn(){textInput="",serieList=[],favorites=[],listaFavs.innerHTML="",resultsForDlt.innerHTML="",rmvFavsFromLocalStg()}function handleSearchBtn(e){e.preventDefault(),textInput=document.querySelector(".js-userInput").value,callApi()}function callApi(){fetch(`${apiURL}${textInput}`).then(e=>e.json()).then(e=>{serieList=e.results,getSeriesResult()})}function getFavsFromLocalStg(){const e=JSON.parse(localStorage.getItem("favorites"));e&&(favorites=e)}function saveFavsLocalStg(){favorites.length>0?(localStorage.setItem("favorites",JSON.stringify(favorites)),resetBtnFav.classList.remove("hidden")):(rmvFavsFromLocalStg(),resetBtnFav.classList.add("hidden"))}function rmvFavsFromLocalStg(){localStorage.removeItem("favorites")}function getSeriesResult(){resultsApi.textContent="",serieList.length>0&&getDataFromApi()}function getDataFromApi(){const e=getTitle("Resultados"),t=getList();resultsApi.innerHTML="";for(const e of serieList){const s=favorites.findIndex(t=>t.mal_id===e.mal_id),n=getListItemFromApi(e),a=getImageFromApi(e),o=getSecondTitleFromApi(e),r=getType(e);n.appendChild(a),n.appendChild(o),t.appendChild(n),n.appendChild(r),-1!==s&&n.classList.add("favSelectedColors")}resultsApi.appendChild(e),resultsApi.appendChild(t),addFav=document.querySelectorAll(".ulSerie");for(let e of addFav)e.addEventListener("click",handleFavBtn)}function getTitle(e){const t=document.createElement("h5");return t.className="ulSerie__title",t.textContent=e,t}function getList(){const e=document.createElement("ul");return e.className="results__results",e}function getListItemFromApi(e){const t=document.createElement("li");return t.dataset.id=e.mal_id,t.className="ulSerie",t}function getImageFromApi(e){const t=document.createElement("img");return t.className="urlImg",""!==e.image_url?t.src=e.image_url:t.src=imgIfNone,t.src=e.image_url,t}function getSecondTitleFromApi(e){const t=document.createElement("h6");t.className="secondTitle";const s=document.createTextNode(e.title);return t.appendChild(s),t}function getType(e){const t=document.createElement("p");t.className="serieType";const s=document.createTextNode(e.type);return t.appendChild(s),t}function handleFavBtn(e){e.preventDefault(),showFavs(e),getInfoFromFavs(),saveFavsLocalStg(),getDataFromApi()}function showFavs(e){const t=parseInt(e.currentTarget.dataset.id),s=serieList.find(e=>e.mal_id===t);if(void 0===favorites.find(e=>e.mal_id===t))favorites.push(s);else{const e=favorites.findIndex(e=>t===e.mal_id);favorites.splice(e,1)}}function getInfoFromFavs(){listaFavs.innerHTML="";for(const e of favorites){const t=getListItemFromApi(e),s=getImageFromApi(e),n=getSecondTitleFromApi(e);listaFavs.appendChild(s),listaFavs.appendChild(n),listaFavs.appendChild(t)}}resetBtn.addEventListener("click",handleResetBtn),searchBtn.addEventListener("click",handleSearchBtn),resetBtnFav.addEventListener("click",rmvFavsFromLocalStg),logBtn.addEventListener("click",executeLog),getFavsFromLocalStg(),getInfoFromFavs();