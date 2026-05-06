let res=fetch('https://fakestoreapi.com/products/1')
.then((res)=>res.json())//return promise fulfill
.then((jsondata)=>{
    console.log(jsondata)
})
.catch((error)=>{
    console.log(error+"promise failed")
})