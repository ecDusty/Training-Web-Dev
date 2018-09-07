(function () {
    const form = document.querySelector('#search-form'),
          searchField = document.querySelector('#search-keyword'),
          responseContainer = document.querySelector('#response-container'),
          unsplashURL = `https://api.unsplash.com/search/photos/?query=`,
          uSplashAPI = `414a0316935f10de86611f476c67d7caad291aec471d62095e4cdd62ee058b14`,
          nyTURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?`
          nyAPI = `66d918fae86549ae83a55edf4785f4c0`;
    let searchedForText;

    function errorDisplay(e) { console.log('Seems we have an error\n'+e) };

    function addImage(data) {
        const images = data.results;
        let htmlContent = `<div class="error-no-articles"><h3>There were no images found</h3></div>`

        if (images[0]) {
            htmlContent = ``;
            let num = 0
            for (const image of images) {
                const img = `<figure>
                    <img src="${image.urls.regular}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by ${image.user.name}</figcaption>
                </figure>`;
                htmlContent += img;
                if (num >= 3)
                    break;
                else
                    num++;
            }
        }
        responseContainer.insertAdjacentHTML('afterbegin',htmlContent);
    }

    function addArticle(data) {
        const arts = data.response;
        let htmlContent = `<div class="error-no-articles"><h3>No articles available</h3></div>`

        if(arts && arts.docs && arts.docs.length > 1) {
            htmlContent = '<ul class="articles">' + arts.docs.map(article => `<li class="article">
            <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
            <p>${article.snippet}</p>
            </li>`
            ).join('') + '</ul>'
        }
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        //UnSplash integration
        fetch(unsplashURL+searchedForText,{
            headers: { 'Authorization': `Client-ID ${uSplashAPI}`}
        }).then(response => response.json())
        .then(addImage).catch(errorDisplay);

        //New York Times Integration
        fetch(`${nyTURL}query=${searchedForText}&api-key=${nyAPI}`)
        .then(response => response.json())
        .then(addArticle).catch(errorDisplay);
    });
})();
