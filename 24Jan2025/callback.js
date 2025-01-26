// -----------------------------------------------------------------------------------

console.log("A -- Start");

function doSomeThing() {
    console.log("B -- Starting...");
    setTimeout(() => {
        console.log("C -- Callback completed");
    }, 0);
    console.log("D -- Done");
}

console.log("E -- Made function ...");

doSomeThing();

console.log("F -- end");
