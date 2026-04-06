import { useState } from "react";
import { login } from "../../services/api/api";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    

    const handleLogin = async () => {
        console.log("Login works");
        const data = await login(email, password);

        if (data.error) {
            alert(data.error);
            return;
        }

        // zapis tokena
        localStorage.setItem("token", data.token);

        // powiadom App.jsx
        onLogin(data.token);
    };

    return (
        <div>
            <h2>Login</h2>

            <input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}

export default Login;