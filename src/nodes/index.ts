import type { Node, NodeTypes } from "reactflow";
import { Handle, Position } from "reactflow";
import { PositionLoggerNode } from "./PositionLoggerNode";
import { useCallback } from "react";
import TextUpdaterNode from "./TextUpdaterNode.tsx";

export const initialNodes = [
  { id: "a", type: "input", position: { x: 0, y: 0 }, data: { label: "wire" } },
  {
    id: "b",
    type: "position-logger",
    position: { x: -100, y: 100 },
    data: { label: "drag me!" },
  },
  { id: "c", position: { x: 100, y: 100 }, data: { label: "your ideas" } },
  {
    id: "d",
    type: "output",
    position: { x: 0, y: 200 },
    data: { label: "with React Flow" },
  },
  {
    id: "e",
    type: "text-updater",
    position: { x: 0, y: 200 },
    data: { label: "with React Flow" },
  },
] satisfies Node[];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "text-updater": TextUpdaterNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
