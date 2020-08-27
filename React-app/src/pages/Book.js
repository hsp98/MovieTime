import React from "react";

import { BookComponent } from "../components/BookComponent";

export class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
    };
  }

  render() {
    return (
      <div>
        <BookComponent id={this.state.id} />
      </div>
    );
  }
}
