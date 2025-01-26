// JS is a single-threaded programming language
// JS does not have the capability to wait

// JS doesn't natively 'wait,' but it can handle asynchronous tasks using browser-provided features
// like setTimeout, fetch, or APIs that support async operations.


console.log("START");

const handleWelcome = () => {
    console.log("WELCOME !");
    setTimeout(function myTimer() {
        console.log("Hello");
    }, 3000);
};

handleWelcome();

console.log("END");

const handleClick = () => {
    console.log("Clicked!", Math.random());
};

handleClick();

const button = document.getElementById("clickButton");
button.addEventListener("click", () => {
    console.log("Button Clicked!");
});