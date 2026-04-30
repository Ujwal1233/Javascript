//template literals (also called templates strings) are a way to work with strings in JS using backticks (`) instead of single or double ("") quotes.

//old way(ES5) using string concatenation
const name = "Ujwal";
const age = 22;
const oldway = "My name is " + name + " and I am " + age + " years old.";
console.log(oldway); //My name is chaluva and I am 22 years old.


//New way(ES6) using template literals with ${}
const newway = `My name is ${name} and I am ${age} years old.`;
console.log(newway); //My name is chaluva and I am 22 years old.


//Expressions inside ${}
//you can also include expressions inside the ${} in template literals. For example:
const price = 100;
const tax = 0.18;
console.log(`total price: ${price + price * tax}`); //total price: 118


//function call inside ${}
function getDiscount(price){
    return price * 0.1;
}
console.log(`discount: ${getDiscount(price)}`); //discount: 10


//Ternary operator inside ${}
const score = 85;
console.log(`result: ${score >= 60 ? "pass" : "fail"}`); //result: pass

//Object property access
const user={
    firstname:'Ujwal',
    lastname:'D',
    age:22
};
console.log('user:${user,firstname} ${user.lastname},Age:${user.age}');

//Array methods inside${}
const numbers=[1,2,3,4,5];
console.log('Sum:${numbers.resuce((a,b)=>a+b,0)}');

//Complex expressions
const items=['apple','banana','orange']
console.log('we have${items.length}items:${items.join(',')}');