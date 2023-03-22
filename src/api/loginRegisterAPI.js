


export async function validateLogin(username, callback) {
    const resp = await fetch("http://localhost:8000/user/" + username)
            .then((res)=>{
                return res.json();
            }).then((resp)=> {
                console.log("resp")
                console.log(resp);
                callback(resp);
            }).catch((err)=>{
                callback({error: err});
            });
    console.log("API LOGIN RESP", resp);
    return resp;
}

export async function createUser(obj, callback) {
    const resp = fetch("http://localhost:8000/user/", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(obj)
            }).then((res) => {
                console.log(res);
                callback(res);
            }).catch((err) => {
                callback({error: err});
            });
    return resp; 
}