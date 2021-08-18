import React from 'react';
import { CircularProgress } from '@material-ui/core';
export default props => {
    console.log(props.style)
    return (
        <div className="loader-wrapper" style={props.style}>
            <div className="inside_loader" >
                <CircularProgress disableShrink />
                <p>{props.msg}</p>
            </div>
        </div>
    )
}