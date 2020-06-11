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
    this.state={
     
    };
  }
  onSelectedDish(dish) {
    this.setState({
        selectedDish: dish
    })
}

  render(){
    const Homepage =(props)=>{
      return(
        <Home 
        dish={this.props.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]}
    />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} >

            </DishDetail>
      );
    };
  return (
    <div className="App">
      <Header></Header>
      
      <Switch>
        <Route path='/home' component={Homepage}></Route>
        <Route exact path='/menu' component={()=> <Menu dishes={this.props.dishes}/>}/>
        <Route path='/menu/:dishId' component={DishWithId} />
        <Route exact path='/contactus' component={Contact}></Route>
        <Route exact path='/aboutus'component={()=> <About leaders={this.props.leaders}></About>}></Route>
        <Redirect path="/home" component={Homepage}></Redirect>
      </Switch>
      <Footer></Footer>
    </div>
  );
  }
}

export default  withRouter(connect(mapStateToProps)(Main));