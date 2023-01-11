export const showAlert = (message, status) => {
    return (dispatch) => {
      dispatch({
        type: "ANY",
        msg: message,
        status:status
      })
      setTimeout(() => {
          dispatch({
            type:"SET_NULL"
          })
      }, 1500);
    }
  }