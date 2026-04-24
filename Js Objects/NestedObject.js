var user={
    name:"Ujwal",
    age:22,
    isplaced:true,
    address:{
        city:"Bangalore",
        state:"Karnataka",
        pincode:560001,
        area:{
            area1:"MG Road",
            area2:"Brigade Road"
        }
    }
}
// Read or crud operations on nested objects
console.log(user)
console.log(user.address)
console.log(user.address.area)
console.log(user.address.area.area1)

// create or insert operations on nested objects
user.dob="01-01-2000"
console.log(user)

// Update or crud operations on nested objects
user.address.pincode=560002
console.log(user)   

// delete operations on nested objects
delete user.address.area
console.log(user)

