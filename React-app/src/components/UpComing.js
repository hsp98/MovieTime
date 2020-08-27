import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./css/UpComingCss.css"


export default class UpComing extends React.Component  {
  constructor(props){
    super()
    this.state = {
      movieList:[],
    moreMovies:false}
  }

  async componentDidMount(){
    Axios({
      method : "GET",
      url : "https://group26-project.herokuapp.com/movie/getUpcomingMovies"
    }).then((response) =>{
      this.setState({movieList:response.data})
    })
  }

  handleSeeMore(){
    this.setState({moreMovies:true})
  }

  handleSeeLess(){
    this.setState({moreMovies:false})
  }
  
  render(){
    return(
      <div id="root1">
        <div className="row">
          <div className="col-md-6">
            <h3>Upcoming Shows</h3>
          </div>
          <div className="col-md-6">
            {
              this.state.moreMovies?
              <button style={{float:"right"}} className="btn btn-outline-primary" onClick={this.handleSeeLess.bind(this)}>See Less</button>
              :
              <button style={{float:"right"}} className="btn btn-outline-primary" onClick={this.handleSeeMore.bind(this)}>See More</button>
            }
          </div>
        </div>
        <br/>

        {
          this.state.moreMovies?
          <div className="row">
           {
            this.state.movieList.map((movie, index)=>{
                return(
                    <div className="col-md-3">
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={movie.img} height="200px" width="100px" />
                      <Card.Body>
                        <Card.Title><Link to={"/movie/"+movie._id}>{movie.name}</Link></Card.Title>
                      </Card.Body>
                    </Card>
                    </div>
                ) 
            })
            }
            </div>
          :
          <div className="row">
           {
            this.state.movieList.map((movie, index)=>{
                return(
                  index <=3 ?
                    <div className="col-md-3">
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={movie.img} height="200px" width="100px" />
                      <Card.Body>
                        <Card.Title><Link to={"/movie/"+movie._id}>{movie.name}</Link></Card.Title>
                      </Card.Body>
                    </Card>
                    </div>
                  :null
                ) 
            })
            }
            </div>
        }
      </div>

    );
  }
}
