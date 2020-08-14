import * as ActionType from './ActionType';
import {BaseUrl} from '../shared/BaseUrl';

export const addComment =(comment) =>({
   type:ActionType.ADD_COMMENT,
   payload:comment

});

export const postComment=(dishId,rating,name,comment)=>(dispatch)=>{
    const newcomment={
        dishId:dishId,
        rating:rating,
        name:name,
        comment:comment
    }
    newcomment.date=new Date().toISOString();

    return fetch(BaseUrl+'comments',{
        method:'POST',
        body:JSON.stringify(newcomment),
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"same-origin"
    })
    .then(response=>{
        if(response.ok)
        {
          return response;
        }
        else{
         var error=new Error("ERROR" +response.status+response.statusText);
         error.response=response;
         throw error;
        }
    },
    error=>{throw error}
    )
    .then(response=>response.json())
    .then(response =>dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); })
}

export const postFeedback=(firstname,lastname,telnum,email,agree,contactType,message)=>(dispatch)=>{
    const feedback={
        firstname:firstname,
        lastname:lastname,
        telnum:telnum,
        email:email,
        agree:agree,
        contactType:contactType,
        message:message
    }
    feedback.date=new Date().toISOString();

    return fetch(BaseUrl+'feedback',{
        method:'POST',
        body:JSON.stringify(feedback),
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"same-origin"
    })
    .then(response=>{
        if(response.ok)
        {
          return response;
        }
        else{
         var error=new Error("ERROR" +response.status+response.statusText);
         error.response=response;
         throw error;
        }
    },
    error=>{throw error}
    )
    .then(response=>response.json())
    .then(response =>dispatch(handleSubmit(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); })
}

export const handleSubmit=(response)=>{
  alert("Thank You for Your Feedback"+JSON.stringify(response));
}


export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    return fetch(BaseUrl + 'dishes')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading=()=>({
    type: ActionType.DISHES_LOADING
});
export const dishesFailed=(errormess) =>({
    type:ActionType.DISHES_FAILED,
    payload:errormess
});
export const addDishes= (dishes) =>({
    type:ActionType.ADD_DISHES,
    payload:dishes
});


export const fetchComments = () => (dispatch) => {    
    return fetch(BaseUrl + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};
 
 export const commentsFailed=(errormess) =>({
     type:ActionType.COMMENTS_FAILED,
     payload:errormess
 });
 export const addComments= (comments) =>({
     type:ActionType.ADD_COMMENTS,
     payload:comments
 });

 export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(BaseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}
 export const promosLoading=()=>({
     type: ActionType.PROMOS_LOADING
 });
 export const promosFailed=(errormess) =>({
     type:ActionType.PROMOS_FAILED,
     payload:errormess
 });
 export const addPromos= (promos) =>({
     type:ActionType.ADD_PROMOS,
     payload:promos
 });


 
export const fetchLeader = () => (dispatch) => {
    
    dispatch(leaderLoading(true));
    return fetch(BaseUrl + 'leaders')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(leaders => dispatch(addleader(leaders)))
    .catch(error => dispatch(leaderFailed(error.message)));
}

export const leaderLoading=()=>({
    type: ActionType.LEADER_LOADING
});
export const leaderFailed=(errormess) =>({
    type:ActionType.LEADER_FAILED,
    payload:errormess
});
export const addleader= (leaders) =>({
    type:ActionType.ADD_LEADER,
    payload:leaders
});