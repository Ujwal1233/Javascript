function f1(){
    var name="Dhoni"
    function fn(){
        console.log(name)
        console.log("fn is called")
    }
    console.log(name)
    return fn
}
//console.log(name)//error
f1()
//fn()//error

//var keyword example
function fun_1(){
    var name="dhoni"
    if(true){
        console.log(name)
    }
    else{
        var city="Banglore"
        console.log(name)
    }
    console.log(city)
}
fun_1()

//let keyword example
function fun$1(){
    let name="dhoni"
    if(true){
        console.log(name)
    }
    // else{
    //     let city="Banglore"
    //     console.log(name)
    // }
    // console.log(city)//error
}
fun$1()
