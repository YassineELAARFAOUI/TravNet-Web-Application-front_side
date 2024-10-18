export const AddAuth = (authData)=>{
    return {type:"AddAuth", payload: authData};
}
export const RemoveAuth = ()=>{
    return {type:"RemoveAuth"};
}