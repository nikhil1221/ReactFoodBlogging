import React from 'react';
import {Card,CardBody,CardTitle,CardSubtitle,CardText,CardImg} from 'reactstrap';

function RenderCard({item}) {
  return(
   <Card>
     <CardImg src={item.image} alt={item.name}/>
     <CardBody>
       <CardTitle>{item.name}</CardTitle>
       {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle>:null}
        <CardText>{item.description}</CardText>
     </CardBody>
   </Card>
  );
}


function Home(props) {
    return(
      <div className="container">
        <div className='row align-items-start'>
         <div className='col-12 col-md m-1'>
           <RenderCard item={props.dish}></RenderCard>
         </div>
         <div className='col-12 col-md m-1'>
           <RenderCard item={props.promotion}></RenderCard>
         </div>
         <div className='col-12 col-md m-1'>
           <RenderCard item={props.leader}></RenderCard>
         </div>
        </div>
      </div>
    );
}

export default Home;   