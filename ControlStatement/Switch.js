function Greet(message) {
    let mes=message.toLowerCase(); // Convert the input message to lowercase for case-insensitive comparison
    switch (mes) {
        case "gm":  
            console.log("Good Morning");
            break;
        case "ga":
            console.log("Good Afternoon");
            break;  
        case "ge":  
            console.log("Good Evening");
            break;  
        default:
            console.log("Invalid Message");
    }   
}
Greet("gm");
Greet("ga");
Greet("ge");
Greet("hello");