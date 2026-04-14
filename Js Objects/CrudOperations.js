let product={
    pname:"Laptop",
    price:50000,
    rating:4.5,
    stock:true,
    category:"Electronics"
}
console.log(product)
// Read or crud operations on objects
// syntax:
// object_name.key_name
// object_name["key_name"]
console.log(product.pname)
console.log(product["pname"])

// update or crud operations on objects
// Syntax:
// object_name.key_name=new_value
console.log(product)
product.pname="Smartphone"
product.rating=4.8
console.log(product)

// create or insert operations on objects
// Syntax:
// object_name.key_name=new_valu
//or
// object_name["key_name"]=new_value
product.brand="Apple"
product["color"]="Silver"
console.log(product)

// delete operations on objects
// Syntax:
// delete object_name.key_name
delete product.stock
console.log(product)
