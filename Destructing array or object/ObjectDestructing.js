var obj={
    name:"Ujwal",
    age:22,
    city:"banglore",
    gender:"male"
}

//old approach
// var name=obj.name
// var age=obj.age
// var city=obj.city
// console.log(name)
// console.log(age)

//new approach
const{name,age,city}=obj
console.log(name)
console.log(age)
console.log(city)