import React from "react";
import { Chat } from "./index";
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';

const MyStylesList = styled(List)({
    height: 400,
    padding: 0,
    overflow: 'auto',
});


const Chats = (props) => {

    return (
        <MyStylesList id={"js-scroll-area"}>
            {props.chats.map((chat, index) => {
                return <Chat text={chat.text} type={chat.type} key={index.toString()} />
            })}
        </MyStylesList>
    );
}

export default Chats;