const API_URL = "http://localhost:3000";

export async function login(email, password) {
    
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });
    

    // zwraca token
    const data = await res.json();
    // console.log(data);
    return data;
}

export async function loginViaToken( token ) {
    const res = await fetch(`${API_URL}/api/auth/login/token`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({token})
    });

    const data = await res.json();
    
    return data;
}

