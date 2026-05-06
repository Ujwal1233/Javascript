let promDemo=new Promise((resolve,reject)=>{
    if(true){
        resolve('Promise Fullfilled')
    }
    else{
        reject("Promise Rejected")
    }
})//fetch()
promDemo.then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})