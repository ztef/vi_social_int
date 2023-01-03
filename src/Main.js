import * as React from 'react';
import Graph from "./Graph.js";
import NameForm from "./NameForm.js";
import Label from "./Label.js";
import "./style.css";


import { styled } from '@mui/material/styles/index.js';
import Box from '@mui/material/Box/index.js';
import Paper from '@mui/material/Paper/index.js';
import Grid from '@mui/material/Grid/index.js';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
 // padding: theme.spacing(1),
 // textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const section = {
  height: "100%",
  paddingTop: 5,
  backgroundColor: "#fff"
};


export default class Main extends React.Component {
 

origin;

lastID;
graphRef;


constructor(props) {
    super(props);   
    this.lastID = React.createRef();
    this.graphRef = React.createRef();
    this.state = {
      selected_node: {},
      selected_edge: {}
    }
  }

  



  width = "100%";
  height = "400px";

  layout = {
    name: "breadthfirst",
    fit: true,
    // circle: true,
    directed: true,
    padding: 50,
    // spacingFactor: 1.5,
    animate: true,
    animationDuration: 1000,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false
  };

  graphData = {
    nodes: [
      { data: { id: "1", label: "Esteban Ortiz", type: "persona" } },
      { data: { id: "2", label: "Mexico", type: "pais" } },
      
    ],
    edges: [
      {
        data: { source: "1", target: "2", label: "nacionalidad" }
      },
     
    ]
  }

  styleSheet = [
    {
      selector: "node",
      style: {
        backgroundColor: "#4a56a6",
        width: 30,
        height: 30,
        label: "data(label)",

       
        "overlay-padding": "6px",
        "z-index": "10",
        //text props
        //"text-outline-color": "#4a56a6",
        //"text-outline-width": "1px",
        color: "blue",
        fontSize: 10
      }
    },
    


    {
      selector: "node:selected",
      style: {
        "border-width": "6px",
        "border-color": "#AAD8FF",
        "border-opacity": "0.5",
        "background-color": "#77828C",
        width: 50,
        height: 50,
        //text props
        "text-outline-color": "#77828C",
        "text-outline-width": 8
      }
    },
    {
      selector: "node.hover",
       
      style: {
        label: "XXXXX"
      }
    },
    {
      selector: "node[type='pais']",
      style: {
        shape: "rectangle"
      }
    },
    {
      selector: "edge",
      style: {
        width: 3,
        label: "data(label)",
        fontSize: 5,
        // "line-color": "#6774cb",
        "line-color": "#AAD8FF",
        "target-arrow-color": "#6774cb",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier"
      },
      
    },
    {
      selector: "edge:selected",
      style: {
        width: 3,
        label: "data(label)",
        fontSize: 5,
       
        "line-color": "#6778FF",
        "target-arrow-color": "#6774cb",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier"
      },
      
    },

  ];

  handleAdd = (node_data) => {
    
    let max = 4;
    //this.graphRef.current.getMax();
    console.log("MAX : ",max);
//id: max + 1,
    let n = { data: {  label: node_data._object, type: node_data._class } };
   
    console.log(n);
    this.graphRef.current.add(n);
    
  };

   

  callBack = (action, n) => {    
      if(action == "node_selection"){
         console.log(n)
         this.setState({selected_node: n.data});
      }

      if(action == "edge_selection"){
        console.log(n)
        this.setState({selected_edge: n.data});
     }

  }
  
  render() {
    return (

    <Box sx={{ flexGrow: 1 }}>
       <Grid container spacing={1}>
        <Grid item xs={12}>
          <Item>vi+social intelligence v.0.1 </Item>
        </Grid>
       </Grid>
       <br/>
      
      <Grid container 
          spacing={1}
          alignItems="stretch"
        >
        <Grid item xs={2}>
          <Item>
          <div style={section}>Options</div>
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item> <NameForm caption="New :" onSubmit = {this.handleAdd} /></Item><br/>
          <Item> 
          <Graph callBack={this.callBack} ref={this.graphRef} graphData={this.graphData} layout={this.layout} styleSheet={this.styleSheet} width={this.width} height={this.height} />
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item> 
          <div style={section}>
             <Label caption="Selected Node :" value={this.state.selected_node.label}/>
             <div style={section}>
             <Label caption="Selected Rel :" value={this.state.selected_edge.label}/>
            </div>
          </div>
           </Item>
          
        </Grid>
      </Grid>
    </Box>


      
    );
  }
}


/*
<div>
         <div class='header'>
          vi+social intelligence v.0.1 
         </div>
          
          <div class="row">
              <div class="column side">
                
                <p>MENU</p>
              </div>
              
              <div class="column middle">
                <div class='header'>
                 <NameForm caption="New :" onSubmit = {this.handleAdd} />
                </div>
                <div>
                  <Graph callBack={this.callBack} ref={this.graphRef} graphData={this.graphData} layout={this.layout} styleSheet={this.styleSheet} width={this.width} height={this.height} />
                </div>
              </div>
             
              <div class="column side">
                <h2>Detalle</h2>
                <Label caption="Selected :" value={this.state.selected.label}/>
              </div>
              
           </div>
         
    </div>
*/
