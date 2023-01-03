import * as React from 'react';
import Box from '@mui/material/Box/index.js';
import InputLabel from '@mui/material/InputLabel/index.js';
import MenuItem from '@mui/material/MenuItem/index.js';
import FormControl from '@mui/material/FormControl/index.js';
import Select from '@mui/material/Select/index.js';

export default function ClassSelector({onChange}) {
  
  const [_class, setClass] = React.useState('subject');

  const handleChange = (event) => {
    
    setClass(event.target.value); 
    onChange(event.target.value);
     
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl >
        <InputLabel id="select-class">Class</InputLabel>
        <Select
          labelId="select-class"
          id="simple-select"
          value="persona"
          label="Class"
          onChange={handleChange}
        >
          <MenuItem value="persona">Persona</MenuItem>
          <MenuItem value="organizacion">Organización</MenuItem>
          <MenuItem value="pais">Territorio</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}