import React from "react";
import Button from '@mui/material/Button/index.js';
import ClassSelector from "./ClassSelector.js";
import { TableRow } from "@mui/material";

import Paper from '@mui/material/Paper/index.js';
import Stack from '@mui/material/Stack/index.js';
import { styled } from '@mui/material/styles/index.js';
import TextField from '@mui/material/TextField/index.js';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {_object: '',_class:''};

    this.handleObjectChange = this.handleObjectChange.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
  
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  handleObjectChange(event) {
    console.log(event.target.value);
    this.setState({_object: event.target.value});
  }
  
  handleClassChange(clase) {
    console.log(clase);
    this.setState({_class: clase});
  }
  


  handleSubmit = e => {
    console.log("SUBMIT :::", this.state)
    this.props.onSubmit(this.state);
  } 

  render() {
     
    return (
      <div>
      <Stack direction="row" spacing={2}>
        <Item> <TextField id="o" label="Object" variant="standard" onChange={this.handleObjectChange}/></Item>
        <Item><ClassSelector id="clase" onChange={this.handleClassChange}/></Item>
        <Item>
        <Button variant="contained" 
          onClick={() => {
              this.handleSubmit();
              }} >Insert
        </Button>
        </Item>
      </Stack>
    </div>
     
    );
  }
}

/*

 onChange={this.handleObjectChange}
 <Item><ClassSelector id="clase" onChange={this.handleClassChange}/></Item>
 <form onSubmit={this.handleSubmit}>
        <TableRow></TableRow>
        <label>
          Object :
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>

        <ClassSelector />
        <Button variant="contained" 
          onClick={() => {
              this.handleSubmit();
              }} >Insert
        </Button>
         
      </form>
*/