//Old Way(ES5)-Using \n or concatenation
const oldMultiline="This is line 1\n"+
                    "This is line 2\n"+
                    "This is line 3";
console.log(oldMultiline);

//New way(ES6)-Template literals preserve line breaks
const newMultiline=`This is line 1
This is line 2
This is line 3`;
console.log(newMultiline);