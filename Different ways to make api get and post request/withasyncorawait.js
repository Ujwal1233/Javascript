async function getData(){
    try{
        const response=await fetch("https://fakestoreapi.com/products/1");
        const data=await response.json();
        console.log(data);
    }catch(error){
        console.error(error);
    }
}
getData();
