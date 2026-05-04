//* 01-MATH-OBJECTS.JS 

//! Math is a built-in object in JavaScript that used too perform some specific math operations.

console.log(Math.PI);           // 3.141592653589793    //*pi number
console.log(Math.sqrt(25));     // 5                    //* Square root of 25
console.log(Math.pow(2, 3));    // 8                    //* 2 raised to the power of 3
console.log(Math.round(4.7));   // 5                    //* Rounds 4.7 to the nearest integer
console.log(Math.round(4.4));   // 4                    //* Rounds 4.4 to the nearest integer
console.log(Math.floor(4.7));   // 4                    //* Rounds 4.7 down to the nearest integer
console.log(Math.trunc(239584.123489));  // 239584      //* Removes the decimal part and returns the integer part
console.log(Math.sign(-5));     // -1                   //* Returns -1 if the number is negative, 1 if it's positive, and 0 if it's zero
console.log(Math.sign(0));      // 0                    //* Returns 0 if the number is zero
console.log(Math.sign(5));      // 1                    //* Returns 1 if the number is positive                
console.log(Math.random());     // Random number between 0 and 1    //* Returns a random number between 0 and 1  
console.log(Math.random() * 10); // Random number between 0 and 10   //* Returns a random number between 0 and 10