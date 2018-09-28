const p = new Promise((resolve, reject)=>{
setTimeout(()=>{
    // resolve('Successfuly called.');
    reject(new Error('Unsuccessful'));
},2000);
});
p.then(result => console.log('Result: '+result)).catch(err=> console.log('Error: '+err.message));