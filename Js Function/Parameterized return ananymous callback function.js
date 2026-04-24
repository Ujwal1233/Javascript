function mainFunction(a, b, callback) {
    let sum = a + b;
    callback(sum);
    return function () {
        console.log("Returned anonymous function says: Sum is " + sum);
    };
}
let resultFunction = mainFunction(10, 20, function (result) {
    console.log("Callback function says: The result is " + result);
})
resultFunction();