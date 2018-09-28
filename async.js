class User {
    logUser(){
        console.log('Before');
        this.getUser(1).then((user)=>{
            console.log('User: '+JSON.stringify(user));
            this.getRepositiories(user.gitHubUserName).then((repo)=>{
                console.log('User Repository: '+JSON.stringify(repo));
            });
        });
        console.log('After');

    }
    getUser(id) {
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log(`Reading a user from a DataBase....`);
                resolve({id: id,gitHubUserName: 'mosh'});
            },2000); 
        })
        
    }
    getRepositiories(username) {
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log(`Reading repository list from user: ${username}`);
                resolve(['repo1','repo2','repo3']);
            },2000);
        })
        
    }
}
module.exports = User;