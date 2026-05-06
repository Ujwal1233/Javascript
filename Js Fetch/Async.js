async function fun1(){
    let response=await fetch('https://fakestoreapi.com/products/1');
    let jsonData=await response.json();
    console.log(jsonData);
    let result=jsonData;
    console.log(result);
}
fun1();