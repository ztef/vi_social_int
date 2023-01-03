import React, { useState, useRef } from "react";


import {
  Core as CSCore,
  NodeSingular as CSNodeSingular,
  EdgeSingular as CSEdgeSingular,
  EdgeHandlesApi,
  EdgeCollection as CSEdgeCollection,
  NodeCollection as CSNodeCollection,
  Collection as CSCollection,
  CollectionReturnValue,
  EventObject as CSEventObject
} from "cytoscape";



import "./style.css";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import popperext from 'cytoscape-popper';



const Graph = React.forwardRef(({
  callBack,
  graphData,
  layout,
  styleSheet,
  width,
  height
 }, ref) => {



  cytoscape.use( edgehandles );
  cytoscape.use( popperext );

  var selectedNode;
  var selectedEdge;


  let myCyRef;
  let ehRef;
  let ehDefaults =  {
    canConnect: function( sourceNode, targetNode ){
      // whether an edge can be created between source and target
      return !sourceNode.same(targetNode); // e.g. disallow loops
    },
    edgeParams: function( sourceNode, targetNode ){
      // for edges between the specified source and target
      // return element object to be passed to cy.add() for edge
      return {
        data: { label: "relacion" },
       }
      //return {
      //  group: "edges",
      //  data: { source: sourceNode.id, target:targetNode.id, label: "relacion" }
      //};
    },
    hoverDelay: 150, // time spent hovering over a target node before it is considered selected
    snap: true, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
    snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
    snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
    noEdgeEventsInDraw: true, // set events:no to edges during draws, prevents mouseouts on compounds
    disableBrowserGestures: true // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
  };

  React.useImperativeHandle(ref, () => ({

    add(node_data) {     
      myCyRef.add(node_data);
      //myCyRef.fit();
    },

    getMax(){
      var max = myCyRef.nodes().max(function(ele, i, eles){
         
        return ele.data('id');
      });
      return max.value;
    }

  })
  );

  const setCurrentNode = (n) => {
    selectedNode = n.json()
    callBack("node_selection",selectedNode);
  };

  const setCurrentEdge = (e) => {
    selectedEdge = e.json()
    callBack("edge_selection",selectedEdge);
  };
  
  const handleDrag = () => {
    ehRef.enableDrawMode();
  };

  const cancelDrag = () => {
    ehRef.disableDrawMode()
  };

  // POPPER :

  var popperNode;
  var popper;
  var popperDiv;
  var started = false;


  function start() {
    ehRef.start(popperNode);
  }

  function stop() {
    ehRef.stop();
  }

  function removeHandle() {
    if (popper){
      popper.destroy();
      popper = null;
    }

    if (popperDiv) {
      document.body.removeChild(popperDiv);
      popperDiv = null;
    }

    popperNode = null;
  }

  function setHandleOn(node) {
    if (started) { return; }

    removeHandle(); // rm old handle

    popperNode = node;

    popperDiv = document.createElement('div');
    popperDiv.classList.add('popper-handle');
    
    popperDiv.addEventListener('mousedown', start);
    document.body.appendChild(popperDiv);

    popper = node.popper({
      content: popperDiv,
      popper: {
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -50],
            },
          },
        ]
      }
    });
  }

  const handlePopper = (n) => {
      
      makePopper(n);
  }




  console.log("MAIN RENDER");
  return (
    <div>
    
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
                

                  myCyRef = cy;

                  console.log("RENDERING :");

                  ehRef = cy.edgehandles( ehDefaults );
                   

                  //cy.removeAllListeners();

                  cy.on("tap", evt => {
                    var evtTarget = evt.target;
                      if( evtTarget === cy ){
                        console.log("tappp");
                        removeHandle();
                        cy.fit();
                      } 
                   
                  });

                  cy.on("tap", "node", evt => {
                    var n = evt.target;
                       
                        console.log("tappp node ");
                        setCurrentNode(n)                 
                  });

                  cy.on("tap", "edge", evt => {
                    var e = evt.target;
                       
                        console.log("tappp edge ");
                        setCurrentEdge(e)                 
                  });


                  cy.on('zoom pan', function(){
                    removeHandle();
                  });
              
                  cy.on("add","node",  evt => {
                    console.log("ADD");
                    var node = evt.target;
                        console.log("added :",node.id());
                        cy.fit();
                      
                  });
                
                  cy.on('mouseover', 'node', function(e) {
                    console.log("Mouse");
                    setHandleOn(e.target);
                    //e.target.addClass('hover');
                    });

                  cy.on('grab', 'node', function(){
                      removeHandle();
                  });
                  
                  cy.on('mouseout', 'node', function(e) {
                    //e.target.removeClass('hover');
                  });                  

                  cy.on("add","edge",  evt => {
                    console.log("ADD EDGE");
                    var edge = evt.target;
                        console.log("added :",edge.data());
                        cy.fit();                     
                  });

                  cy.on('ehstart', function(){
                    started = true;
                  });
        
                  cy.on('ehstop', function(){
                    started = false;
                  });
                  
                }
                

                                     
            }
            
          />
          </div> 
  );
});

export default React.memo(Graph);