function printDataOnScreen1(likes, hearts, name) {
    
    const result = `${name}'s engagements on the page are ${likes + hearts}`;
    console.log(result);
}
printDataOnScreen1(11, 11, "Joban"); 



const printDataOnScreen2 = function printDataOnScreen2(likes, hearts, name) {
    
    const result = `* ${name}'s engagements on the page are ${likes + hearts}`;
    console.log(result);
};
printDataOnScreen2(11, 11, "Joban"); 


const printDataOnScreen3 = function (likes, hearts, name) {
    
    const result = `** ${name}'s engagements on the page are ${likes + hearts}`;
    console.log(result);
};

printDataOnScreen3(11, 11, "Joban"); 




const printDataOnScreen4 = (likes, hearts, name) => {
 
    const result = `*** ${name}'s engagements on the page are ${likes + hearts}`;
    console.log(result);
};

printDataOnScreen4(11, 11, "Joban"); 