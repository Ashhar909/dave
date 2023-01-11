const initState = {
    msg : null,
    status: null
}

const alertReducer = (state = initState, action) => {
    switch(action.type){
        case 'ANY' :
            return{
                ...state,
                msg:action.msg,
                status:action.status
            }
        case 'SET_NULL':
            return{
                ...state,
                msg:null,
                status:null
            }
        default:
            return state
    }
}

export default alertReducer