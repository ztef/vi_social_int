import * as React from 'react';
import Graph from "./Graph.js";
import NewNodeForm from "./NewNodeForm.js";
import NodeEditor from './NodeEditor.js';
import EdgeEditor from "./EdgeEditor.js";
import "./style.css";


import { styled } from '@mui/material/styles/index.js';
//import Box from '@mui/material/Box/index.js';
import Paper from '@mui/material/Paper/index.js';
import Grid from '@mui/material/Grid/index.js';
import { Box, ThemeProvider, createTheme } from '@mui/system/index.js';


const theme1 = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body1,
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
      selected_node: null,
      selected_edge: null
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
      { data: { id: "2", label: "Mexico", type: "territorio" } },
      
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
      selector: "node[type='territorio']",
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

  handleAddNode = (node_data) => {
    
    let n = { data: node_data };
    console.log(n);
    this.graphRef.current.add(n);
    
  };

  handleUpdateNode = (node_data) => {
    
    let n = { data: node_data };
    console.log(n);
    this.graphRef.current.updateNode(n);
    
  };

  handleUpdateEdge = (edge_data) => {
    
    let e = { data: edge_data };
    console.log(e);
    this.graphRef.current.updateEdge(e);
    
  };


   

  callBack = (action, n) => {    
      if(action == "node_selection"){
         console.log(n)
         if(n){
           this.setState({selected_node: n.data});
         } else {
          this.setState({selected_node: null});
         }
      }

      if(action == "edge_selection"){
        console.log(n)
        if(n){
          this.setState({selected_edge: n.data});
        } else {
          this.setState({selected_edge: null});
        }
     }

  }
  
  render() {
    return (
 
<Box
      sx={{
        width: '100%',
        height: '100%',
        color: '#fff',
        '& > .MuiBox-root > .MuiBox-root': {
          p: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          gridTemplateRows: 'auto',
          gridTemplateAreas: `"header header header header"
        "main main main sidebar"
        "footer footer footer footer"`,
        }}
      >
        <Box sx={{ gridArea: 'header', bgcolor: 'background.paper' }}>
        <Item>vi+social intelligence v.0.2 </Item>
        </Box>
        <Box sx={{ gridArea: 'main', bgcolor: 'background.paper' }}>
        <Item> <NewNodeForm caption="New :" onSubmit = {this.handleAddNode} /></Item><br/>
          <Item> 
          <Graph callBack={this.callBack} ref={this.graphRef} graphData={this.graphData} layout={this.layout} styleSheet={this.styleSheet} width={this.width} height={this.height} />
          </Item>
        </Box>
        <Box sx={{  gridArea: 'sidebar', bgcolor: 'error.main' }}>
        <Item> 
          <div style={section}>
            {this.state.selected_node
             ? <NodeEditor caption="Selected Node :" value={this.state.selected_node} onSubmit={this.handleUpdateNode}/>
             :<></>
             }
             {this.state.selected_edge
             ? <EdgeEditor caption="Selected Node :" value={this.state.selected_edge} onSubmit={this.handleUpdateEdge}/>            
             :<></>
             }
          </div>
           </Item>
        </Box>
        <Box sx={{ gridArea: 'footer', bgcolor: 'warning.dark' }}>
          Footer
        </Box>
      </Box>
    </Box>
    
     
      
    );
  }
}


