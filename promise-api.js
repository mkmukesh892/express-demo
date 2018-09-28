const p = Promise.resolve({id: 54, name: 'Mukesh Kumar'});
const p1= Promise.reject(new Error('reason for rejection....'));
p.then(result => console.log(result));
p1.catch(err => console.log(err.message));
const p3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('Async operation 1.....');
       resolve(1);
        reject(new Error('reason for rejection 1 ....'));
    },2000)
});
const p4 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('Async operation 2.....');
        resolve(2);
        reject(new Error('reason for rejection 2 ....'));
    },2000)
});
Promise.all([p3,p4]).then(result => console.log(result)).catch(err => console.log(err.message));