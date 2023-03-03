import * as actionTypss from '../actions/types'
const initialState = {
  user_name: "Unavailable",
  profile_picture: "../BackEnd/Uploads/pictures/default_profile_picture.png",
  user_id:"0",
  user_bio:"0",
  user_email:""

}
const user_reducer = (state= initialState,action)=>{
    switch(action.type){
        case 'getUserData':
            return {
              user_name: action.name,
              profile_picture: "../BackEnd/Uploads/pictures/"+action.picture,
              user_id:action.id,
              user_bio:action.bio,
              user_email:action.email
            };
        default:
            return state;
    }
}
export default user_reducer;

// const initialUserState = {
//   currentUser: null,
//   isLoading:true
// }
// const user_reducer = (state = initialUserState,action) =>{
//   switch(action.type){
//     case actionTypss.SET_USER:
//       return{
//         currentUser : action.payload.currentUser,
//         isLoading:false
//       }
//       default:
//         return state
//   }
// }
// export default user_reducer