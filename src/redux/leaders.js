
import {LEADER_FAILED,LEADER_LOADING,ADD_LEADER} from './ActionType';

export const Leaders =(state={
    isLoading:true,
    errormess:null,
    leaders:[]
},action) =>{
    switch(action.type)
    {
        case  ADD_LEADER:
            return {...state,isLoading:false,errormess:null,leaders:action.payload}; 
        case LEADER_FAILED:
            return{...state,isLoading:false, leaders:[],errormess:action.payload};
        case LEADER_LOADING:
            return{...state,isLoading:true, leaders:[],errormess:null};
     
        default:
        return state;
    }
}