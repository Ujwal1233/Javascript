let promDemo=new Promise((resolve,reject)=>{
    if(true){
        resolve('Promise Fullfilled')
    }
    else{
        reject("Promise Rejected")
    }
})//fetch()