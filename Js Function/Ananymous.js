// Normal Anonymous Function
let fun=function(){
    console.log("Hello World")
}
fun()

// Parameterized Anonymous Function
let add=function(a,b){
    let sum=a+b
    console.log(sum)
}
add(10,20)

// Anonymous Function with Return
let greet=function(){
    return "Hello World"
}
console.log(greet())

// Parameterized Return Anonymous Function
let multiple=function(a,b){
    let res=a*b
    return res 
}
console.log(multiple(10,20))
