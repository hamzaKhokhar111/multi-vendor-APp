import axios from 'axios'
// import {server} from '../../server'
// import {s}

export const loadUser=()=>async(dispatch)=>{
    try {
        dispatch({
            type: "LoadUserRequest",
        
        });
        // const {data}=await axios.get(`http://localhost:5000/api/v2/user/getuser`,{withCredentials:true});
        // dispatch({
        //     type:" LoadUserSucess",
        //     payload:data.user,
        // });

    } catch(error) {
        dispatch({
            type:'LoadUserFail',
            payload: error.response.data.message,
        })
    }
}