function Greet(message){
    let mes=message.toLowerCase();
    if(mes=="gm"){
        console.log("good morning")
    }
    else if(mes=="ga"){
        console.log("good afternoon")
    }
    else if(mes=="ge"){
        console.log("good evening")
    }
    else if(mes=="gn"){
        console.log("good night")
    }
    else{
        console.log("invalid message")
    }
}
Greet("gm")
Greet("GA")