let games;

fetch('https://api.rawg.io/api/platforms?key=d52876343bfb4f4c8f51243103bd2355')
.then(resp => resp.json())
.then(data => {

    renderPlatforms(data.results);
    renderNamePlatforms(data.results);

});

fetch('https://api.rawg.io/api/games?key=d52876343bfb4f4c8f51243103bd2355')
.then(resp => resp.json())
.then(data => {
    games = data.results;
    renderGames(data.results);

});

function renderPlatforms(platforms){
    platforms.forEach( platform => {
        renderGames(platform.games);
    });
}

function renderGames(games){
    let cardGames = document.querySelector('#cardGames');
    cardGames.innerHTML = '';
    games.forEach( game => {
        let col = document.createElement('div');
        col.classList.add('col-12', 'col-md-4', 'my-2');
        col.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="./me.jpg" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${game.name}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
        `;
        cardGames.appendChild(col);
    });
}

function renderNamePlatforms(platforms){
    
    let platformname = Array.from(
        new Set(platforms.map(platform => platform.name)
        // .map(el => el.map(x => x.name))
        .flat())
        )
        
        let platformcontainer = document.querySelector('#platformcontainer');
        platformname.forEach(name => {
            let li = document.createElement('li');
            li.classList.add("dropdown-item");
            li.innerHTML = name;
            platformcontainer.appendChild(li)
            li.addEventListener('click', () => renderGamesByPlatform(name))
        })

}

function renderGamesByPlatform(piattaforma){
   let result;
   console.log(games[0].platforms[0].platform)
   result = games.filter(game => game.platforms.filter(platform => platform.platform.name == piattaforma).length > 0)
   renderGames(result)
}

