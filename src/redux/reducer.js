import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotion';
import { LEADERS } from '../shared/leaders'; 
import {DISHES} from '../shared/dishes';

export const initialState ={
   
        dishes:DISHES,
        comments :COMMENTS,
        promotions:PROMOTIONS,
        leaders:LEADERS,
};

export const Reducer = (state=initialState,action) =>{
    return state;
};