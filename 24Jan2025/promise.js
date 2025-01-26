
// we will be handling promise with THEN & CATCH
// it is the old way, new way is ASYNC AWAIT (but it is just a wrapper on then catch)
// so will start with basics then learn about async await as well.

// --------------------------------------------------------------------------------

// const showData = (val) => {
//     console.log("YES YES", val);
// };

// const successCallback = (val) => {
//     console.log("YES", val);

//     const pr = val.json();

//     pr.then(showData).catch(errorCallback);
// };

// const errorCallback = (err) => {
//     console.log("NO", err);
// };

// const request = fetch("https://www.redbus.in/seowapi/offers");

// request.then(successCallback).catch(errorCallback);

// ----------------------------------SHORT WAY (CODE)----------------------------------------------

// console.log("START");
// const request = fetch("https://www.redbus.in/seowapi/offers");

// request
//     .then((val) => {
//         console.log("LEVEL 1 - START", val);
//         const pr = val.json();
//         console.log("LEVEL 1 - MID", val);
//         pr.then((val) => {
//             console.log("YES YES", val);
//         }).catch((err) => {
//             console.log("NO", err);
//         });
//         console.log("LEVEL 1 - END", val);
//     })
//     .catch((err) => {
//         console.log("NO", err);
//     });

// console.log("END");

// ------------------------- EXPANDED CODE ----------------------------

console.log("START");
const request = fetch("https://www.redbus.in/seowapi/offers");

const ff1 = (val) => {
    console.log("YES YES", val);
};

const ff2 = (err) => {
    console.log("NO", err);
};

const fn1 = (val) => {
    console.log("LEVEL 1 - START", val);
    const pr = val.json();
    console.log("LEVEL 1 - MID", val);
    pr.then(ff1).catch(ff2);
    console.log("LEVEL 1 - END", val);
};

const fn2 = (err) => {
    console.log("NO", err);
};

request.then(fn1).catch(fn2);

console.log("END");
