const authStore = {email:"",id:0,password:"",business:0};
const reducer = (state=authStore,action)=>{
    switch (action.type) {
        case 'AddAuth':
            return {email:action.payload.email,id:action.payload.proId,password:action.payload.password,business:action.payload.business};
        case 'RemoveAuth':
            return {email:"",id:"",password:"",business:0};
        default:
            return state;
    }
}

export default reducer;