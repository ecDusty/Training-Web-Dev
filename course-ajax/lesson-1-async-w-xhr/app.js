(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    const urlLocation = window.location.href;

    const unsplashClientID = `414a0316935f10de86611f476c67d7caad291aec471d62095e4cdd62ee058b14`
    const unsplashAKey = `client_id=414a0316935f10de86611f476c67d7caad291aec471d62095e4cdd62ee058b14`
    const nyTimesAPIKey = `66d918fae86549ae83a55edf4785f4c0`;
    const Request = new XMLHttpRequest();


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
        //req('GET',`https://api.unsplash.com/search/photos/`,`query=${searchedForText}`, unsplashClientID)
    });


    function addImage(data) {
        const images = data.results;
        let htmlContent = `<div><h3>There were no images found</h3></div>`

        if (images[0]) {
            htmlContent = ``;
            for (const image of images) {
                const img = `<figure>
                    <img src="${image.urls.regular}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by ${image.user.name}</figcaption>
                </figure>`;
                htmlContent += img;
            }
            // htmlContent = `<figure>
            //     <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            //     <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            // </figure>`;
        }

        responseContainer.insertAdjacentHTML('afterbegin',htmlContent);
    }
    
    function req(type,url,search,auth) {
        Request.open(type, `${url}?${search}&${auth}`);
        Request.onload = addImage;
        Request.setRequestHeader('Authorization',`Client-ID ${auth}`);
        Request.send()

    }

})();
