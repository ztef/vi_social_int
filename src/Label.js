import React from "react";

export default class Label extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {
    return (
        <label>
          {this.props.caption} {this.props.value}
        </label>
    );
  }
}