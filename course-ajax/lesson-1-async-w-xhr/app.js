(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    const urlLocation = window.location.href;

    const unsplashClientID = `414a0316935f10de86611f476c67d7caad291aec471d62095e4cdd62ee058b14`
    const unsplashAKey = `client_id=414a0316935f10de86611f476c67d7caad291aec471d62095e4cdd62ee058b14`
    const nyTimesAPIKey = `66d918fae86549ae83a55edf4785f4c0`;


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
                    num++
            }
            // htmlContent = `<figure>
            //     <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            //     <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            // </figure>`;
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
        $.ajax({
            url: `https://api.unsplash.com/search/photos/?query=${searchedForText}`,
            headers: {
                'Authorization':`Client-ID ${unsplashClientID}`
            }
        }).done(addImage);
        $.ajax({
            url:`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=66d918fae86549ae83a55edf4785f4c0`
        }).done(addArticle);
    });

})();
