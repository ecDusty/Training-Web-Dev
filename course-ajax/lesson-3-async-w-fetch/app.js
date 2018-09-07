(function () {
    const form = document.querySelector('#search-form'),
          searchField = document.querySelector('#search-keyword'),
          responseContainer = document.querySelector('#response-container'),
          unsplashURL = `https://api.unsplash.com/search/photos/?query=`,
          uSplashAPI = `414a0316935f10de86611f476c67d7caad291aec471d62095e4cdd62ee058b14`,
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

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        //UnSplash integration
        fetch(unsplashURL+searchedForText,{
            headers: { 'Authorization':`Client ID ${uSplashAPI}`}
        }).then(response => response.json())
        .then(addImage).catch(errorDisplay);
    });
})();
