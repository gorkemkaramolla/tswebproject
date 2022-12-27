// const burger: HTMLElement = document.getElementById("menu-icon");
// const ul: HTMLElement = document.querySelector("ul");
// const closeButton: HTMLElement = document.querySelector(".closeButton");
// const nav: HTMLElement = document.querySelector("nav");
/* closeButton.addEventListener("click", () => {
    nav.classList.toggle("active");

    burger.classList.toggle("burgerOpened");
    closeButton.classList.toggle("active");
    document
        .querySelectorAll("ul li")
        .forEach((li) => li.classList.toggle("active"));
    closeButton.classList.toggle("burgerOpened");
});
burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    burger.classList.toggle("burgerOpened");
    closeButton.classList.toggle("active");

    document
        .querySelectorAll("ul li")
        .forEach((li) => li.classList.toggle("active"));
}); */
var container = document.querySelector(".animation-container");
var item = document.querySelector(".item");
var monster = document.querySelector(".monster");
var element = document.querySelector(".animation-element");
var mouseX = 0;
var mouseY = 0;
var x = 0;
var y = 50;
container.addEventListener("mousemove", function (event) {
    // Calculate the position of the mouse cursor relative to the container element
    mouseX = event.clientX;
    mouseY = event.clientY;
    console.log(mouseX, mouseY);
    // Update the position of the animation element
});
function updatePosition() {
    var parentRect = container.getBoundingClientRect();
    var parentWidth = parentRect.width;
    var parentHeight = parentRect.height;
    var distanceX = x - mouseX;
    var distanceY = y - mouseY;
    // Update the position of the item element towards the mouse cursor
    x -= distanceX * 0.1;
    y -= distanceY * 0.1;
    x = Math.max(0, Math.min(container.offsetWidth - item.offsetWidth, x));
    y = Math.max(0, Math.min(container.offsetHeight - item.offsetHeight, y));
    var r = Math.round(Math.random() * mouseX);
    var g = Math.round(Math.random() * mouseY);
    var b = Math.round((Math.random() * mouseX + Math.random() * mouseY) / 2);
    monster.style.fill = "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
    // Update the position of the item element using the updated x and y values
    item.style.left = "".concat(x, "px");
    item.style.top = "".concat(y, "px");
    requestAnimationFrame(updatePosition);
}
updatePosition();
//# sourceMappingURL=index.js.map