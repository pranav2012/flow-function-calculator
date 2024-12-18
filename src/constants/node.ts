import { NodeType } from "../types/node";

export const workflowNodes = [
	{
		nodeId: 1,
		displayName: "Initial Value of x",
		type: NodeType.INPUT,
		position: {
			x: 120,
			y: 257,
		},
		connectedTo: [2],
		connectedFrom: [],
	},
	{
		nodeId: 2,
		displayName: "Function: 1",
		type: NodeType.FUNCTION,
		position: {
			x: 250,
			y: 100,
		},
		connectedTo: [3],
		connectedFrom: [1],
		defaultEquation: "x^2",
	},
	{
		nodeId: 3,
		displayName: "Function: 2",
		type: NodeType.FUNCTION,
		position: {
			x: 650,
			y: 100,
		},
		connectedTo: [5],
		connectedFrom: [2],
		defaultEquation: "(2*x)+4",
	},
	{
		nodeId: 4,
		displayName: "Function: 3",
		type: NodeType.FUNCTION,
		position: {
			x: 1050,
			y: 100,
		},
		connectedTo: [7],
		connectedFrom: [6],
		defaultEquation: "x^2+20",
	},
	{
		nodeId: 5,
		displayName: "Function: 4",
		type: NodeType.FUNCTION,
		position: {
			x: 450,
			y: 400,
		},
		connectedTo: [6],
		connectedFrom: [3],
		defaultEquation: "x-2",
	},
	{
		nodeId: 6,
		displayName: "Function: 5",
		type: NodeType.FUNCTION,
		position: {
			x: 850,
			y: 400,
		},
		connectedTo: [4],
		connectedFrom: [5],
		defaultEquation: "x/2",
	},
	{
		nodeId: 7,
		displayName: "Final Output y",
		type: NodeType.OUTPUT,
		position: {
			x: 1300,
			y: 257,
		},
		connectedTo: [],
		connectedFrom: [4],
	},
];
