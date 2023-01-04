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
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default class EdgeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {current: props.value, updated: props.value};

    this.FieldEditor1 = React.createRef();
     

  }
  componentWillReceiveProps(nextProps) {
    this.setState({current: nextProps.value, updated:nextProps.value});
  }

  handleSubmit = e => {
    
    let updatedEdge = {id:this.state.current.id};
    updatedEdge = {...updatedEdge,label:this.FieldEditor1.current.state.value}
     

    this.props.onSubmit(updatedEdge);
  } 

  render() {
    return (
    <div>
       <h2>{this.props.value.label}</h2>
       <Stack direction="column" spacing={2}>
        <TextSelector ref={this.FieldEditor1} value={this.props.value.label} id="o" label="Object" variant="standard" />
        <Item>
        <Button variant="contained" 
          onClick={() => {
              this.handleSubmit();
              }} >Apply
        </Button>
        </Item>
      </Stack>
    </div>
    );
  }
}