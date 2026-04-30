var person={
    name:"ujwal",
    age:22,
    city:"Bengaluru",
    gender:"male"
}
const{name,age,...data}=person
console.log(name)
console.log(data)