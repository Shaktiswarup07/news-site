const APIkey="c17ab4b6c83345d98b50372500d3dbd2";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));
document.querySelector('#nav-toggle').addEventListener('click',()=>{
    document.querySelector('.nav-links').classList.toggle('active');
})
async function fetchNews (query){
    const respons = await fetch(`${url}${query}&apiKey=${APIkey}`);
    const data= await respons.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');

    cardsContainer.innerHTML='';

    articles.forEach(article=>{
        if(!article.urlToImage) return;

        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    })
}
function fillDataInCard(cardClone,article){
    const img=cardClone.querySelector('#news-img');
    const title=cardClone.querySelector('#news-title');
    const source=cardClone.querySelector('#news-source');
    const desc=cardClone.querySelector('#news-desc');
    img.src=article.urlToImage;
    title.innerHTML=article.title;
    desc.innerHTML=article.description;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
    source.innerHTML=`${article.source.name} | ${date}`;
    cardClone.firstElementChild.addEventListener('click',function(){
        window.open(article.url,"_blank");
    })
}

let selectedNav=null;
function OnNavItemClick(id){
    fetchNews(id);
    const item=document.getElementById(id);
    selectedNav?.classList.remove('active');
    selectedNav=item;
    selectedNav.classList.add('active');
}

const searchBtn=document.getElementById('search-btn');
const searchText=document.getElementById('input');

searchBtn.addEventListener('click',function(){
    const query=searchText.value;
    if(!query) return;
    else{
        fetchNews(query);
        selectedNav?.classList.remove('active');
        selectedNav=null;
    }
})
function reload(){
    window.location.reload();
}