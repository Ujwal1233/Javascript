function Outer(){
    var city = "Delhi"
    console.log("Outer function"+city)
    function inner(x,y){
        var result = x+y
        console.log(result)
        console.log("Inner function"+city)
   } 
   return inner
}
var res=Outer()
res(10,20)      