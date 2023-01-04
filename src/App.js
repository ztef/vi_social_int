import React, { useState, useRef } from "react";
import "./style.css";
import CytoscapeComponent from "react-cytoscapejs";
import Graph from "./Graph";
import NewNodeForm from "./NewNodeForm";
import Label from "./Label";

const App = () => {
  
  
  const [width, setWith] = useState("100%");
  const [height, setHeight] = useState("400px");
  const [lastID, setID] = useState(3);
  const [origin, setOrigin] = useState({});

  const graphRef = React.createRef();

  const [graphData, setGraphData] = useState({
    nodes: [
      { data: { id: "1", label: "Esteban Ortiz", type: "persona" } },
      { data: { id: "2", label: "Mexico", type: "pais" } },
      
    ],
    edges: [
      {
        data: { source: "1", target: "2", label: "nacionalidad" }
      },
     
    ]
  });
  

  const layout = {
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

  const styleSheet = [
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
        "text-outline-color": "#4a56a6",
        "text-outline-width": "2px",
        color: "white",
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
      }
    }
  ];

 /*
  const handleAdd = (node_data) => {

    myCyRef.current.add({ data: { id: lastID, label: node_data, type: "persona" } });
    
    setID(lastID + 1);
    console.log(lastID);

  };
  */

  
  

  const handleAdd = (node_data) => {
    
    let n = { data: { id: lastID, label: node_data, type: "persona" } };
    //console.log({nodes:[...graphData.nodes,n],edges:graphData.edges});
    //setGraphData({nodes:[...graphData.nodes,n],edges:graphData.edges});
    

    setID(lastID + 1);
    console.log(n);
    graphRef.current.add(n);
    
    //graphRef.current.fit();

  };


  const handleRelate = () =>{
    var selectedNodes = myCyRef.current.$('node:selected');
    console.log("SELECTED NODES",selectedNodes.lenght)
  }



  const handleSelected = (n,all) => {
    console.log("LAST:",n);
       setOrigin(n);
  }

  


  const handleUnSelect= () => {
     setOrigin({});
  }

  //let myCyRef;
  //const myCyRef = useRef();

  


  const initListeners = React.useCallback(() => {
    //if (!myCyRef.current) {
    // return;     
    //}

    console.log("Iniciando Listeners");
    
    /*
    myCyRef.current.on('tap',  _evt => {
      //cy.layout(this.state.layout).run()
      console.log("tap");
      myCyRef.current.fit()
      }
    
    );
    */

    myCyRef.on("tap" , (e) => {
      console.log("TAP X");
    });

  },[graphData]);


  const init = React.useCallback(
    (cy) => {
      if (!myCyRef) {
        myCyRef = cy;
        return; 
      }
      
      console.log("Iniciando Grafo");
      initListeners();
      
    
      
    },[graphData]
  );


  return (
    <>
      <div>
        <h1>vi+social intelligence v.0</h1>
        <div
          style={{
            border: "1px solid",
            backgroundColor: "#f5f6fe"
          }}
        >
         <NewNodeForm caption="New :" onSubmit = {handleAdd} />
         <Label caption="Node Info :" value={origin.label}/><br/>
         <button onClick={handleRelate}>Relate</button>
         <Graph ref={graphRef} graphData={graphData} layout={layout} styleSheet={styleSheet} width={width} height={height} />
        </div>
      </div>
    </>
  );
}

export default App;

/*

<CytoscapeComponent
            elements={CytoscapeComponent.normalizeElements(graphData)}
            
            // pan={{ x: 200, y: 200 }}
            style={{ width: width, height: height }}
            
            zoomingEnabled={true}
            maxZoom={3}
            minZoom={0.1}
            autounselectify={false}
            boxSelectionEnabled={true}
            layout={layout}
            stylesheet={styleSheet}
            
            cy = {(cy) => 
              {
                //init(cy);
                
                this.myCyRef = cy;

                console.log("RENDERING :");
                cy.on("tap", evt => {
                  var evtTarget = evt.target;
                    if( evtTarget === cy ){
                      console.log("tappp");
                      cy.fit();
                    } 
                   
                });
              
                cy.on("add","node", evt => {
                  var evtTarget = evt.target;
                    if( evtTarget === cy ){
                      console.log("add");
                      //cy.fit();
                    } 
                   
                });

              }                         
            }
            
          /> 

*/








/*
cy={cy => {
              myCyRef.current = cy;

              //console.log("EVT", cy);

              cy.on("tap", "node", evt => {
                var node = evt.target;
                //console.log("EVT", evt);
                //console.log("TARGET", node.data());
                //console.log("TARGET TYPE", typeof node[0]);
               
                handleSelected(node.data());
              });

              cy.on("tap", evt => {
                var evtTarget = evt.target;
                  if( evtTarget === cy ){
                    handleUnSelect();
                  } 
                 
              });
              
   
              cy.on('add', 'node', _evt => {
                //cy.layout(this.state.layout).run()
                cy.fit()
                }
              
              );
            }}


            abc={console.log("myCyRef", myCyRef)}
*/