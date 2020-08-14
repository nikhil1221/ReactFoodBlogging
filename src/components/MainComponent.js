import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import { Switch,Redirect,Route,withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import {connect} from 'react-redux';
import {postComment,fetchDishes,fetchComments,fetchPromos,fetchLeader,postFeedback} from '../redux/ActionCreator';
import {actions} from 'react-redux-form';
import {TransitionGroup,CSSTransition} from 'react-transition-group';
const mapDispatchToProps=dispatch =>({
  
  postComment: (dishId,rating,author,comment)=> 
  dispatch(postComment(dishId,rating,author,comment)),
  fetchDishes:()=> {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments:()=> {dispatch(fetchComments())},
  fetchPromos:()=> {dispatch(fetchPromos())},
  fetchLeader:()=> {dispatch(fetchLeader())},
  postFeedback:(firstname,lastname,telnum,email,agree,contactType,message)=>
  dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message)),
})


const mapStateToProps= state =>{
  return {
    dishes:state.dishes,
    comments:state.comments,
    leaders:state.leaders,
    promotions:state.promotions,
  }
}

 
class Main extends Component{
   
   
  constructor(props)
  {
    super(props);
  }
  onSelectedDish(dish) {
    this.setState({
        selectedDish: dish
    })
}
componentDidMount()
 {
   this.props.fetchDishes();
   this.props.fetchComments();
   this.props.fetchPromos();
   this.props.fetchLeader();
 }

  render(){
    const Homepage =(props)=>{
      return(
        <Home 
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        isLoading={this.props.dishes.isLoading}
        errormess={this.props.dishes.errormess}
        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promoisLoading={this.props.promotions.isLoading}
        promoerrormess={this.props.promotions.errMess}
      leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
      leaderisLoading={this.props.leaders.isLoading}
      leadererrormess={this.props.leaders.errorMess}

    />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
           DishisLoading={this.props.dishes.isLoading}
           DishErrorMessage={this.props.dishes.errormess}
           
           CommentErrorMessage={this.props.comments.errormess}
           comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} >
          postComment={this.props.postComment}
            </DishDetail>
      );
    };
  return (
    <div className="App">
      <Header></Header>
      <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
      <Switch location={this.props.location}>
        <Route path='/home' component={Homepage}></Route>
        <Route exact path='/menu' component={()=> <Menu dishes={this.props.dishes}/>}/>
        <Route path='/menu/:dishId' component={DishWithId} />
        <Route exact path='/contactus' component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}></Route>
        <Route exact path='/aboutus'component={()=> <About leaders={this.props.leaders} leaderisLoading={this.props.leaders.isLoading} errormess={this.props.leaders.errormess}></About>}></Route>
        <Redirect path="/home" component={Homepage}></Redirect>
      </Switch>
      </CSSTransition>
      </TransitionGroup>
      <Footer></Footer>
    </div>
  );
  }
}

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
