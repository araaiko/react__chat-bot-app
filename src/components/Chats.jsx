import React from "react";
import { Chat } from "./index";
import List from '@mui/material/List';


const Chats = (props) => {

    return (
        <List>
            {props.chats.map((chat, index) => {
                return <Chat text={chat.text} type={chat.type} key={index.toString()} />
            })}
        </List>
    );
}

export default Chats;