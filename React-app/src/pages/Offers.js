import React from 'react';
import { AvailOffers } from '../components/AvailOffers';
import Header from '../components/Header';

export default class Offers extends React.Component {
  render(){
    return (
      <div>
      <div><Header></Header></div>
      <div>
          <AvailOffers/>
          <br/>
          <br/>
      </div>
      </div>
     );
  }
  
}

