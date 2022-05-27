import * as React from 'react';
import TextField from '@mui/material/TextField';

const TextInput = (props) => {

    return (
        <TextField
            fullWidth={true}
            id="outlined-basic"
            label={props.label}
            margin={'dense'}
            multiline={props.multiline}
            rows={props.rows}
            value={props.value}
            type={props.type} //textなのかemailなのか、ここで指定できるようにする
            onChange={props.onChange}
            variant="standard" //MUIの見た目の種類
        />
    );
}

export default TextInput;