//Normal arrow function
let fun=()=>{
    console.log("Hello World")
}
fun()

//Parameterized arrow function
let add=(a,b)=>{
    let sum=a+b
    console.log(sum)
}
add(10,20)

//Return arrow function
let greet=()=>{
    return "Hello World"
}
console.log(greet())

//Parameterized return arrow function
let multiple=(a,b)=>{
    let res=a*b
    return res 
}
console.log(multiple(10,20))

//or

let multiple1=(a,b)=>a*b
console.log(multiple1(10,20))

//Arrow function with callback

greet(()=>{
    var city = "Bengaluru"
    console.log(city)
})

//Parameterized arrow callback function
function mainFunction(a, b, callback) {
    let sum = a + b;
    callback(sum);
    return function () {
        console.log("Returned anonymous function says: Sum is " + sum);
    };
}   

//Return arrow function with callback
let resultFunction = mainFunction(10, 20, (result) => {
    console.log("Callback function says: The result is " + result);
})
resultFunction();

//Parameterized return arrow function with callback
function mainFunction1(a, b, callback) {
    let sum = a + b;
    callback(sum);
    return () => {
        console.log("Returned anonymous function says: Sum is " + sum);
    };  
}
let resultFunction1 = mainFunction1(10, 20, (result) => {
    console.log("Callback function says: The result is " + result);
})      
resultFunction1();

