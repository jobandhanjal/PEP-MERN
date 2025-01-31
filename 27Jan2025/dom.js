// // Create and render an h2 element
// const heading = document.createElement("h2");
// heading.textContent = "This is an H2 element rendered with an external JS file!";
// document.getElementById("container").appendChild(heading);

const parent = document.getElementById("container");
const root = ReactDOM.createRoot(parent);

const newTitle = React.createElement("h2", {}, "Hello from REAL React!"); // single child --> text
const newPara = React.createElement("p", {}, "Lorem ipsum delor..."); // single child --> text
const container1 = React.createElement("div", {}, [newTitle, newPara]); // children --> array of react elements

root.render(container1);