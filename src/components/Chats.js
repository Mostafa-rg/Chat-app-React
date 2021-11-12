import React,{ useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine'

// Components
import Navber from './Navber';

// Styles
import styles from './Chats.module.css'

// Contexts
import { AuthContext } from '../contexts/AuthContextProvider'

const Chats = () => {

    const user = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const history = useNavigate()

    useEffect(() => {
        if(!user) {
            history("/");
            return;
        }

        axios.get("https://api.chatengine.io/users/me", {
            headers: {
                "project-id": "99134166-47e8-4fa2-80ee-49fe1d85e15c",
                "user-name": user.email,
                "user-secret": user.uid
            }
        })
        .then(() => {
            setLoading(false)
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append("email", user.email);
            formdata.append("username", user.email);
            formdata.append("secret", user.uid);
            getFile(user.photoURL)
                .then(avatar => {
                    formdata.append("avatar", avatar, avatar.name)
                    axios.post("https://api.chatengine.io/users/", formdata, {
                        headers: {
                            "private-key": "f322a276-a218-455c-a0d2-676cc9804e06"
                        }
                    })
                    .then(() => setLoading(false))
                    .catch(error => console.log(error))
                    
                })
        })

    }, [user, history])

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userPhoto.jpg", {type: "image/jpeg"})
    }


    const logoutHandler = async() =>{
        await auth.signOut()
        history('/')
    }
    
    if(!user || loading) return <h2 className={styles.loading}>Loading...</h2>
    return (
        <div className={styles.container}>
            <Navber logoutHandler={logoutHandler}/>
            <ChatEngine
                height="calc(100vh - 50px)"
                projectID="99134166-47e8-4fa2-80ee-49fe1d85e15c"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;