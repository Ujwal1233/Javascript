function greet(greeting,...names){
    for(let name of names){
        console.log(`${greeting},${name}`)
    }
}
greet("hello","ujwal","chaluva","deepak","vishal","chandan","bharath")