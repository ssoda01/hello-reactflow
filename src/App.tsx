import type { OnConnect } from "reactflow";
import React, { useCallback, useEffect, useMemo } from "react";
import html2canvas from "html2canvas";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
} from "reactflow";

import "reactflow/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };
export default function App() {
  const [nodes, , addNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => {
      console.log("onConnect: connection:", connection);
      return setEdges((edges) => addEdge(connection, edges));
    },
    [setEdges]
  );
  // const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  const handlerScreenshot = () => {
    console.log("screenshot");
    takeScreenshot();
    return null;
  };
  const handlerAddNode = () => {
    console.log("add node");
    addNodes((e: any[]) =>
      e.concat({
        id: (e.length + 1).toString(),
        data: { label: `${name}` },
        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
        style: { border: "10px solid #9999" },
      })
    );
  };
  function takeScreenshot() {
    html2canvas(document.body).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      // const img = new Image();
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "screenshot.png";
      link.click();
    });
  }
  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Panel position="top-left">
        <button type="button" onClick={handlerScreenshot}>
          Export as Image
        </button>
      </Panel>
      <Panel position="top-center">
        <button type="button" onClick={handlerAddNode}>
          Add Node
        </button>
      </Panel>

      <Background variant={"cross"} color="pink" />
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
}
