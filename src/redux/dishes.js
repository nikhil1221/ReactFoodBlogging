
import { ADD_DISHES, DISHES_FAILED, DISHES_LOADING } from './ActionType';


export const Dishes =(state={
    isLoading:true,
    dishes:[],
    errormess:null,
},action) =>{
    switch(action.type)
    {
        case ADD_DISHES:
            return{...state,isLoading:false, dishes:action.payload,errormess:null};
        case DISHES_FAILED:
              return{...state,isLoading:false, dishes:[],errormess:action.payload};
        case DISHES_LOADING:
              return{...state,isLoading:true, dishes:[],errormess:null};
        default:
        return state;
    }
}