//Author Harsh Parmar
import React from "react";
import Axios from "axios";
import BookingData from "./BookingData";
import Header from "./Header";

export class BookComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      name: "",
      movieData: [],
      fields: {},
    };
    this.handleSubmit = this.handleChange.bind(this);
    this.openSeat = this.openSeat.bind(this);
  }

  async componentDidMount() {
    const user = await Axios.get(
      "https://group26-project.herokuapp.com/currectUser"
    );

    if (user.data.message === false) {
      this.setState({ isUserLoggedIn: false });
    } else {
      this.setState({ isUserLoggedIn: true });
      BookingData.setEmail(user.data[0].email);
    }

    let apiKey = "d8bcf125fed775e8aa6239f8a8b1e3e6";
    const movie = await Axios.get(
      `https://api.themoviedb.org/3/movie/${this.state.id}?api_key=${apiKey}&language=en-US`
    );
    this.setState({ movieData: movie.data });

    Axios({
      method: "Post",
      url: "https://group26-project.herokuapp.com/movie/getMovieById",
      data: { _id: this.state.id },
    })
      .then((response) => {
        if (response) {
          this.setState({
            name: response.data[0].name,
          });
        }
      })
      .catch((error) => alert(error));
  }

  openSeat(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var theater = document.getElementById("theater").value;
    if (name === "" || date === "" || time === "" || theater === "") {
      alert("Fields cannot be empty");
    } else {
      BookingData.setMovieName(this.state.name);
      window.location.href = "/seat";
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    if (field === "name") {
      BookingData.setName(e.target.value);
    }
    if (field === "date") {
      BookingData.setDate(e.target.value);
    }
    if (field === "time") {
      BookingData.setTime(e.target.value);
    }
    if (field === "theater") {
      BookingData.setTheater(e.target.value);
    }
    this.setState({ fields });
  }

  render() {
    return (
      <div>
        <Header isUserLoggedIn="true" />
        <div id="movieName" className="container">
          <h2>{this.state.name}</h2>
          <hr />
        </div>
        <div className="container" id="bookingForm">
          <h3>Book your Tickets</h3> <hr />
          <br />
          <form>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={this.handleChange.bind(this, "name")}
                  required
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="date" className="col-sm-2 col-form-label">
                Date
              </label>
              <div className="col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  placeholder="Enter Date"
                  min="2020-07-26"
                  onChange={this.handleChange.bind(this, "date")}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="time" className="col-sm-2 col-form-label">
                Movie Time
              </label>
              <div className="col-sm-10">
                <select
                  name="time"
                  id="time"
                  className="form-control"
                  placeholder="Select Time"
                  onChange={this.handleChange.bind(this, "time")}
                >
                  <option defaultValue>Select Time</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                  <option value="09:00 PM">09:00 PM</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <div className="col">
                <select
                  name="theater"
                  id="theater"
                  className="form-control"
                  placeholder="Select Theater"
                  onChange={this.handleChange.bind(this, "theater")}
                >
                  <option defaultValue>Select Theater</option>
                  <option value="Carbon Arc Cinema">Carbon Arc Cinema</option>
                  <option value="Cineplex Cinemas Park Lane">
                    Cineplex Cinemas Park Lane
                  </option>
                  <option value="Scotiabank Theatre Halifax">
                    Scotiabank Theatre Halifax
                  </option>
                  <option value="New Harbour Video">New Harbour Video</option>
                  <option value="Cineplex Cinemas Dartmouth Crossing">
                    Cineplex Cinemas Dartmouth Crossing
                  </option>
                  <option value="alFresco filmFesto">alFresco filmFesto</option>
                </select>
              </div>
            </div>
            <button className="btn-lg btn-success" onClick={this.openSeat}>
              Select Seat
            </button>
          </form>
          <br />
          <br />
        </div>
      </div>
    );
  }
}
