import React from "react";
import Button from '@mui/material/Button/index.js';
import ClassSelector from "./ClassSelector.js";
import Paper from '@mui/material/Paper/index.js';
import Stack from '@mui/material/Stack/index.js';
import { styled } from '@mui/material/styles/index.js';
import TextField from '@mui/material/TextField/index.js';



export default class TextSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.value};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  handleChange = (event) =>  {
    console.log(event.target.value);
    this.setState({value: event.target.value});
  }
  
  render() {   
    return (
            <TextField size="small" value={this.state.value} id="o" label="Object" variant="outlined" onChange={this.handleChange}/>
    );
  }
}

