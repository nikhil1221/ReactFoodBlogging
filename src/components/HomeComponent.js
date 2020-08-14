import React from 'react';
import {Card,CardBody,CardTitle,CardSubtitle,CardText,CardImg} from 'reactstrap';
import  { Loading } from './LoadingComponent';
import  { BaseUrl } from '../shared/BaseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item,isLoading,errormess}) {
  if (isLoading) {
    return(
            <Loading />
    );
}
else if (errormess) {
    return(
            <h4>{errormess}</h4>
    );
}
else 
  return(
    <FadeTransform in 
    tranformProps={
      {exitTransform: 'scale(0.5) translateY(-50%)'}
    }>
   <Card>
     <CardImg src={BaseUrl+item.image} alt={item.name}/>
     <CardBody>
       <CardTitle>{item.name}</CardTitle>
       {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle>:null}
        <CardText>{item.description}</CardText>
     </CardBody>
   </Card>
   </FadeTransform>
  );
}


function Home(props) {
    return(
      <div className="container">
        <div className='row align-items-start'>
         <div className='col-12 col-md m-1'>
           <RenderCard item={props.dish} isLoading={props.isLoading} errormess={props.errormess}></RenderCard>
         </div>
         <div className='col-12 col-md m-1'>
           <RenderCard item={props.promotion} isLoading={props.promoisLoading} errormess={props.promoerrormess}></RenderCard>
         </div>
         <div className='col-12 col-md m-1'>
           <RenderCard item={props.leader} isLoading={props.leaderisLoading} errormess={props.leadererrormess}></RenderCard>
         </div>
        </div>
      </div>
    );
}

export default Home;   