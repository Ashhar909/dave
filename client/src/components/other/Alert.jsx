import React from 'react'
import { connect } from 'react-redux'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function AlertComponent(props) {
    const capitalize = (word)=>{
        if(word === "danger") {
            word = "error"
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
      <div className='d-flex justify-content-center'>
        <div style={{height: '50px', width:"40%"}}>
        {props.alert.status && <Alert severity={props.alert.status} style={{borderRadius:"0px 0px 20px 20px"}}>
        <AlertTitle>{capitalize(props.alert.status)}</AlertTitle>
        <strong>{props.alert.msg}</strong>
        </Alert>}
        </div>
      </div>
    )
}

const mapStateToProps = (state) => {
  return{
    alert:state.alert
  }
}

export default connect(mapStateToProps)(AlertComponent);