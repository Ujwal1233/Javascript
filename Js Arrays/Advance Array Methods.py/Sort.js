let names=["John","Alice","Bob","Eve"]
let result=names.sort()
console.log(result)

let arr1=[5,2,9,1,5,6]
let result1=arr1.sort(function(a,b){
    return a-b
})
console.log(result1)

let result2=arr1.sort(function(a,b){
    return b-a
})
console.log(result2)