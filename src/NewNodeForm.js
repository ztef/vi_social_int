import React from "react";
import Button from '@mui/material/Button/index.js';

import Paper from '@mui/material/Paper/index.js';
import Stack from '@mui/material/Stack/index.js';
import { styled } from '@mui/material/styles/index.js';
import TextField from '@mui/material/TextField/index.js';
import TextSelector from "./TextSelector.js";
import ClassSelector from "./ClassSelector.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 40,
}));



export default class NewNodeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {_object: '',_class:''};

    this.FieldEditor1 = React.createRef();
    this.FieldEditor2 = React.createRef();

  }

  
  
  handleSubmit = e => {
    
    let updated = {};
    updated = {...updated,label:this.FieldEditor1.current.state.value}
    updated = {...updated,type:this.FieldEditor2.current.state.value}

    console.log("NEW :::", updated)
    this.props.onSubmit(updated);
  } 

  

  render() {
     
    return (
      <div>
      <Stack direction="row" spacing={2}>
      <Item><TextSelector ref={this.FieldEditor1} value="" id="o" label="Object" variant="standard" /></Item>
      <Item><ClassSelector ref={this.FieldEditor2} value="persona" id="clase" /></Item>
      <Item>
        <Button variant="contained" size="small"
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

