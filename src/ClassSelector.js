import React from "react";
import Box from '@mui/material/Box/index.js';
import InputLabel from '@mui/material/InputLabel/index.js';
import MenuItem from '@mui/material/MenuItem/index.js';
import FormControl from '@mui/material/FormControl/index.js';
import Select from '@mui/material/Select/index.js';

export default class ClassSelector extends React.Component {
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
      <Box sx={{ minWidth: 120 }}>
      <FormControl size="small">
        <InputLabel id="select-class">Class</InputLabel>
        <Select
          labelId="select-class"
          id="simple-select"
          value={this.state.value}
          label="Class"
          onChange={this.handleChange }
        >
          <MenuItem value="persona">Persona</MenuItem>
          <MenuItem value="organizacion">Organización</MenuItem>
          <MenuItem value="territorio">Territorio</MenuItem>
          <MenuItem value="inmueble">Inmueble</MenuItem>
          <MenuItem value="movil">Vehículo</MenuItem>
          
        </Select>
      </FormControl>
    </Box>     
    );
  }
}












/*import * as React from 'react';
import Box from '@mui/material/Box/index.js';
import InputLabel from '@mui/material/InputLabel/index.js';
import MenuItem from '@mui/material/MenuItem/index.js';
import FormControl from '@mui/material/FormControl/index.js';
import Select from '@mui/material/Select/index.js';

export default function ClassSelector({value, onChange}) {
  
  const [_class, setClass] = React.useState(value);

  const handleChange = (event) => {   
    setClass(event.target.value); 
    onChange(event.target.value);
  };

  React.useEffect(() => { 
      setClass(value);
   },[value]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl >
        <InputLabel id="select-class">Class</InputLabel>
        <Select
          labelId="select-class"
          id="simple-select"
          value={_class}
          label="Class"
          onChange={handleChange}
        >
          <MenuItem value="persona">Persona</MenuItem>
          <MenuItem value="organizacion">Organización</MenuItem>
          <MenuItem value="territorio">Territorio</MenuItem>
          <MenuItem value="inmueble">Inmueble</MenuItem>
          <MenuItem value="movil">Vehículo</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
  );
}
*/