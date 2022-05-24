import React from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';


const MyStylesButton = styled(Button)({
    color: '#FFB549',
    borderColor: '#FFB549',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    marginBottom: '8px',
    '&:hover': {
        backgroundColor: '#FFB549',
        color: '#fff'
    },
});

const Answer = (props) => {
    return (
        <>
            <MyStylesButton variant="outlined" onClick={() => {props.select(props.content, props.nextId)}}>
                {props.content}
            </MyStylesButton>
        </>
    );
}

export default Answer;