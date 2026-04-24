var arr3=[10,20,30,40,50];
var callback=(prev,current)=>{
    return prev+current 
}
var result=arr3.reduce(callback,0)
console.log(result)

