var arr2=[101,300,20,155,600]
var result=arr2.filter(function(value,index){
    return value>200
})
console.log(result)

let person=[
    {name:"John",age:25},
    {name:"Alice",age:30},
    {name:"Bob",age:20},
    {name:"Eve",age:35}
]
let result2=person.filter(function(value,index){
    return value.age>40
})
console.log(result2)
