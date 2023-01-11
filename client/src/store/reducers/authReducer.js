const initState = {
    error:null,
    token:null,
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case "LOGIN_ERROR":
            return{
                ...state,
                error:action.err
            }

        case "LOGIN_SUCCESS":
            return{
                ...state,
                token:action.authtoken,
                error:null,
            }

        case "LOGOUT":
            return{
                ...state,
                token:null,
                error:null
            }
        default:
            return state
    }
}


export default authReducer;