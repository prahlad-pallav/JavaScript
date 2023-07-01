let searchButton = document.querySelector('.search-btn');
let searchText = document.querySelector('.news-input');

const Api_Key = 'f9af11fe5d8d4c589a2ff9709e3f685f';

const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener('load', () => News('politics'));
function reload(){
    window.location.reload(); 
}

async function News(query){
    let response = await fetch(`${url}${query}&apiKey=${Api_Key}`);
    let data = await response.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.querySelector('#cards-container');
    const newsCardTemplate = document.querySelector('#template-news-card');

    cardContainer.innerHTML='';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        dataFilling(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}

function dataFilling(cardClone, article){
    let newsImg = cardClone.querySelector('#news-img');
    let newsTitle = cardClone.querySelector('#news-title');
    let newsSource = cardClone.querySelector('#news-source');
    let newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone :'Asia/Jakarta'
    });
    
    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click', () =>{
        window.open(article.url, "_blank");
    })

}

searchButton.addEventListener('click', () =>{
    let query = searchText.value;
    if(query === "") return;
    else{
        try{
            News(query);
        }
        catch(e){
            alert("Invalid Search!");
        }
    }
})

