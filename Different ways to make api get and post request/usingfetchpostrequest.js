fetch("https://fakestoreapi.com/products", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        title: "New Product",
        price: 19.99,
        description: "This is a new product",
    })
})
.then((res) => res.json())
.then((jsonData) => {
    console.log(jsonData);
})