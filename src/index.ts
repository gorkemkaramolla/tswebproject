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
const container: HTMLElement = document.querySelector(".animation-container");
const item: HTMLElement = document.querySelector(".item");
const monster: HTMLElement = document.querySelector(".monster");
const element: HTMLElement = document.querySelector(".animation-element");
let mouseX: number = 0;
let mouseY: number = 0;
let x: number = 0;
let y: number = 50;
container.addEventListener("mousemove", (event) => {
    // Calculate the position of the mouse cursor relative to the container element
    mouseX = event.clientX;
    mouseY = event.clientY;
    console.log(mouseX, mouseY);
    // Update the position of the animation element
});

function updatePosition() {
    const parentRect = container.getBoundingClientRect();
    const parentWidth = parentRect.width;
    const parentHeight = parentRect.height;
    const distanceX = x - mouseX;
    const distanceY = y - mouseY;

    // Update the position of the item element towards the mouse cursor
    x -= distanceX * 0.1;
    y -= distanceY * 0.1;
    x = Math.max(0, Math.min(container.offsetWidth - item.offsetWidth, x));
    y = Math.max(0, Math.min(container.offsetHeight - item.offsetHeight, y));
    let r = Math.round(Math.random() * mouseX);
    let g = Math.round(Math.random() * mouseY);
    let b = Math.round((Math.random() * mouseX + Math.random() * mouseY) / 2);

    monster.style.fill = `rgb(${r}, ${g}, ${b})`;
    // Update the position of the item element using the updated x and y values
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;

    requestAnimationFrame(updatePosition);
}
updatePosition();
