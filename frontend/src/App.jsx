import { useEffect, useState } from "react";
import { connect, sendMessage, joinRoom } from "./services/socket/socket";
import Login from "./components/login/Login";
import "./styles/m_style.css";
import ChatArea from "./components/chat/ChatArea";
import TopBar from "./components/top_bar/TopBar";
import SideBarLeft from "./components/sidebars/left/SideBarLeft";
import SideBarRight from "./components/sidebars/right/SideBarRight";
import { loginViaToken } from "./services/api/api";


function App() {
    const [ token, setToken ] = useState(null);
    const [ messages, setMessages ] = useState([]);
    const [ rooms, setRooms ] = useState([]);
    const [ currentRoom, setCurrentRoom ] = useState(null);
    const [ nick, setNick ] = useState("");
    const [ socket, setSocket ] = useState(null);

    useEffect(() => {
        

        const savedToken = localStorage.getItem("token");
        
        if (!savedToken) return;
        
            // handleLogin(savedToken);
        setToken(savedToken);
        
        loginViaToken(savedToken)
            .then( user => {
                console.log("Auto login: ", user);

                setNick(user.nick);

                connect(savedToken, {
                    authSuccess: (data) => {
                        setNick(data.nick);
                        console.log(nick);
                        console.log("test");
                    },
                    chat: (data) => {
                        setMessages(prev => [
                            ...prev,
                            {
                                nick: data.nick,
                                connect: data.message
                            }
                        ]);
                    },
                    history: (data) => {
                        setMessages(data.messages);
                    },
                
                    userRooms: (data) => {
                        setRooms(data.rooms);
                    
                        if (data.rooms.length > 0){
                            const firstRoom = data.rooms[0].code;
                            setCurrentRoom(firstRoom);
                            joinRoom(firstRoom);
                        }
                    }

        });
            })
        
    
        
    }, []);
    const handleLogin = ( token ) => {
        console.log("token: " + token);
        setToken(token);

        connect(token, {
            authSuccess: (data) => {
                setNick(data.nick);
                console.log("Zalogowano jako:", data.nick);
            },
            error: (err) => {
                console.log(err.message);
            }
        });
    };

    if (!token) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div id="page">
            <TopBar/>
            <SideBarLeft/>
            <ChatArea messages={messages}/>
            <SideBarRight nick={nick}/>
        </div>
    );
}

export default App;