import {useSelector,useDispatch} from 'react-redux'
import jwt_decode from "jwt-decode";
import {useEffect} from 'react'
function Test(){
    let name = useSelector((state) => state.user.user_name)

    return(
        <div>
           <h1>Hi my name is {name}</h1>
        </div>
    )
}
export default Test;