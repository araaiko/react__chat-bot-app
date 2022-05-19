import React from "react";
// import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';


// const UseStylesButton = styled(Button)({
//     color: '#000',
//     backgroundColor: 'green',
//     transition: 'all 0.3s ease',
//     '&:hover': {
//         backgroundColor: '#fff',
//     },
// });

const Answer = (props) => {
    return (
        <>
            {/* <UseStylesButton variant="contained">Test</UseStylesButton> */}
            <Button variant="contained" onClick={() => {props.select(props.content, props.nextId)}}>
                {props.content}
            </Button>
        </>
    );
}

export default Answer;