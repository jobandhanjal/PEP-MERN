
// REST OPERATOR In Objects
const user = { name: "Vishal", age: 20, country: "India" };
const { name, ...details } = user;

console.log(name); // Output: Vishal
console.log(details); // Output: { age: 21, country: "India" }

// REST OPERATOR In Arrays
const [first, second, ...rest] = [10, 20, 30, 40, 50];
console.log(first); // Output: 10
console.log(second); // Output: 20
console.log(rest); // Output: [30, 40, 50]


// Array Destructuring
const numbers = [10, 20, 30];
const [a, b, c] = numbers;

console.log(a); // Output: 10
console.log(b); // Output: 20
console.log(c); // Output: 30




// Array initialization
const arr = ["Moon", "Sun", "Sun", "Planets", "Galaxy", "Humans", "Animals"];

// 1. FOR_EACH
console.log("1. forEach Method:");
const myCustomFunction = (cb) => {
    for (let i = 0; i < arr.length; i++) {
        cb(arr[i], i, arr);
    }
};

const cb = (a, b, c) => {
    console.log(a, b, c);
};

myCustomFunction(cb);

// Alternative using built-in forEach
console.log("\nUsing built-in forEach:");
arr.forEach((item, index, array) => {
    console.log(item, index, array);
});


// MAP
console.log("\n2. map Method:");
const upperCaseItems = arr.map(item => item.toUpperCase());
console.log(upperCaseItems);


// The main difference between FOR EACH and MAP function is that
// FOR EACH doesnt return anything where as MAP returns some value





// FILTER
console.log("\n3. filter Method:");
const itemsWithA = arr.filter(item => item.includes('a'));
console.log(itemsWithA);


// SLICE
console.log("\n12. slice Method:");
console.log("Slice(1,4):", arr.slice(1, 4));

// SPLICE
console.log("\n13. splice Method:");
const arrCopy = [...arr];
const removedItems = arrCopy.splice(2, 2, "Stars");
console.log("After splice:", arrCopy);
console.log("Removed items:", removedItems);

// CONCAT
console.log("\n14. concat Method:");
const newArr = arr.concat(["Meteors", "Comets"]);
console.log(newArr);

// JOIN
console.log("\n15. join Method:");
console.log("Joined with '-':", arr.join(" - "));


// SORT
console.log("\n17. sort Method:");
const sortedArr = [...arr].sort();
console.log("Sorted array:", sortedArr);
