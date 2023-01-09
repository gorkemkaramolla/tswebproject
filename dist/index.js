var gamesList = [
    {
        name: "Gorkem's Special ~The King~",
        game: "../game/game.html",
        image: "../images/character.gif"
    },
    {
        name: "Ski Free",
        game: "skifree.html",
        image: "https://cdn.mos.cms.futurecdn.net/Jmd3aogpW3GV72MHwQWTgg-970-80.jpg.webp"
    },
    {
        name: "Subway Surfers",
        game: "SubwaySurfer.html",
        image: "../images/subway-surfers.jpg"
    },
    {
        name: "Monkey Mart",
        game: "monkeys.html",
        image: "../images/monkey-mart.jpeg"
    },
    {
        name: "Boom ",
        game: "boom.html",
        image: "https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/67a0b9ccd0da47831e4859cf7de8439c.png "
    },
    {
        name: "Fire & Water VI",
        game: "fireandwater6.html",
        image: "../images/fireandwater6.webp"
    },
    {
        name: "Doodle Jump",
        game: "doodlejump.html",
        image: "https://play-lh.googleusercontent.com/aHnvdFTx0LVyfVHQLX51VcWBYkSVGvggr4FvIiP-iwBu4pKBiOQA1OnRi_nyFdCWqlU8=w240-h480-rw"
    },
    {
        name: "Tetris",
        game: "tetris.html",
        image: "https://play-lh.googleusercontent.com/za2Nu_qjMw5GzWfbzet4zeiZT1xvJlTRi4NJzGpJWX9grxFAAko5dGBwe7qeqK01THw"
    },
];
var container = document.querySelectorAll(".grid1-1");
console.log(container);
var allGames = document.querySelector(".grid-4");
container.forEach(function (item, i) {
    var playBtn = document.createElement("div");
    playBtn.classList.add("play-btn");
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("style", "fill: rgb(235, 209, 235); width: 48px; height: 48px;");
    svg.setAttribute("id", "Layer_1");
    svg.setAttribute("x", "0");
    svg.setAttribute("y", "0");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("viewBox", "0 0 29 29");
    svg.setAttribute("xml:space", "preserve");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M6.568 27.002c-.49 0-.98-.127-1.429-.383a2.857 2.857 0 0 1-1.461-2.512V4.892c0-1.053.546-1.992 1.461-2.512.914-.521 2-.51 2.905.029l16.142 9.608c.883.526 1.411 1.454 1.411 2.483s-.528 1.957-1.411 2.483L8.045 26.591a2.884 2.884 0 0 1-1.477.411zM6.572 4a.922.922 0 0 0-.445.119.873.873 0 0 0-.45.773v19.216c0 .467.314.696.45.773a.873.873 0 0 0 .895-.009l16.141-9.608c.392-.233.435-.612.435-.764s-.042-.531-.435-.764L7.021 4.128A.858.858 0 0 0 6.572 4z");
    var h3 = document.createElement("h3");
    h3.innerHTML = gamesList[i].name;
    h3.classList.add("game-icon-h3");
    svg.appendChild(path);
    playBtn.appendChild(svg);
    playBtn.addEventListener("click", function () {
        window.location.href = "./games/".concat(gamesList[i].game);
    });
    item.appendChild(playBtn);
});
gamesList.map(function (item) {
    var game = document.createElement("div");
    var image = document.createElement("img");
    var h3 = document.createElement("h3");
    h3.classList.add("game-icon-h3");
    h3.innerHTML = item.name;
    game.appendChild(h3);
    image.classList.add("game-icon-image");
    image.src = item.image;
    game.appendChild(image);
    game.classList.add("game-icon");
    var link = document.createElement("a");
    link.classList.add("game-icon-link");
    link.innerHTML = "play";
    link.href = "./games/".concat(item.game);
    game.appendChild(link);
    allGames.appendChild(game);
});
//# sourceMappingURL=index.js.map