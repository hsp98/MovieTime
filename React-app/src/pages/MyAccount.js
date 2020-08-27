import React, { Component } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import Header from "../components/Header";
import { Card } from "react-bootstrap";
import "../components/css/MyAccount.css"


class MyAccount extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      name:"",
      phone : 0,
      edit : false
    }
  }
    
  componentDidMount(){

    axios({
      method : "GET",
      url : "https://group26-project.herokuapp.com/currectUser",
    }).then((response) => {
        if(response.data[0].email){
          this.setState({
            name : response.data[0].name,
            email : response.data[0].email,
            phone : response.data[0].phone
          });
      }
      else{
        alert("Please Login First")
        window.location.href="/login";
      }    
    });
  }

  edit(e){
    e.preventDefault();
    this.setState({
      edit : true
    })
  }

  confirm(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;    
    axios({
      method : "POST",
      url : "https://group26-project.herokuapp.com/updateUser",
      data : {'name' : name, 'phone' : phone}
    }).then((response) => {
      if(response.data.message === true){
        alert("Profile updated successfull")
        window.location.href = "/MyAccount"
      }
      else{
        alert(response.data.message);
      }
    });

  }
  viewWatchList(e){
    e.preventDefault();
    window.location.href = "/watchList"
  }

  render(){
    
    return (
      <div>
        <Header/>
        <div id="myaccount"> 
        <center><div className='container'> 
      <h3>{this.state.name} welcome to your account</h3>
      <br />
      {
        this.state.edit ?

        <form>
          
          <h1>Edit Form</h1>

          <div class="form-group row">
          <label for="name" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input type="text"  class="form-control" id="name" placeholder = {this.state.name} defaultValue={this.state.name}/>
            </div>
          </div>

          <div class="form-group row">
            <label for="email" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
            <input type="text" readOnly class="form-control-plaintext" id="email"  value={this.state.email}/>
            </div>
          </div>

          <div class="form-group row">
            <label for="phone" class="col-sm-2 col-form-label">Phone</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" id="phone" placeholder = {this.state.phone} min={0} defaultValue={this.state.phone}/>
            </div>
          </div>
          <button className="btn btn-outline-primary"  onClick= {this.confirm.bind(this)}>Confirm</button>
    </form>
    
    :

        <Card style={{ width: '18rem' }}>
          <Card.Body>
          <Card.Title>{this.state.name}</Card.Title>
            <Card.Text>
              Email : {this.state.email}
            </Card.Text>
            <Card.Text>
              Phone : {this.state.phone}
            </Card.Text>
            <button className="btn btn-outline-primary" onClick={this.viewWatchList}>View WatchList</button>
            <button className="btn btn-outline-primary" onClick={this.edit.bind(this)}>EDIT</button>
          </Card.Body>
        </Card>
    }
    </div></center>
  </div> 
  </div>
    );
  }
}

export default MyAccount;
