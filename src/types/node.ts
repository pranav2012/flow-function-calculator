export enum NodeType {
	INPUT = "input",
	FUNCTION = "function",
	OUTPUT = "output",
}

export interface Position {
	x: number;
	y: number;
}
export interface ConnectionPoint {
	x: number;
	y: number;
}

export interface WorkflowNode {
	nodeId: number;
	displayName: string;
	type: NodeType;
	position: Position;
	connectedTo: number[];
	connectedFrom: number[];
	defaultEquation?: string;
}

export type NodeValuesContextType = {
	nodeValues: { [key: string]: number };
	equations: { [key: string]: string };
	updateNodeValue: (nodeId: string, value: number) => void;
	updateEquation: (nodeId: string, equation: string) => void;
};