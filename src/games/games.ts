const spinnerx: HTMLDivElement = document.querySelector(".spinner");
const wrapperx: HTMLDivElement = document.querySelector(".wrapper");
function displaySpinner() {
    // Hide the content and display the spinner after a delay
    wrapperx.style.display = "none";
    spinnerx.style.display = "block";
}

function hideSpinner() {
    // Hide the spinner and display the content
    spinnerx.style.display = "none";
    wrapperx.style.display = "block";
}

window.onload = () => {
    displaySpinner();

    setTimeout(() => {
        wrapperx.style.display = "flex";
        hideSpinner();
    }, 500);
};
