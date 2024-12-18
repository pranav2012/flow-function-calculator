import { Node } from "@components/nodes";

enum NodeType {
	INPUT = "input",
	FUNCTION = "function",
	OUTPUT = "output",
}

const workflowNodes = [
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
		connectedFrom: [2],
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

// In workflow.tsx
export const Workflow = () => {
	const renderConnections = () => {
		return workflowNodes.flatMap((node) =>
			node.connectedTo.map((targetId) => {
				const targetNode = workflowNodes.find(
					(n) => n.nodeId === targetId
				);
				if (!targetNode) return null;

				let sourceX = node.position.x + 210;
				let sourceY = node.position.y + 210;

				let targetX = targetNode.position.x + 24;
				let targetY = targetNode.position.y + 210;

				if (node.type === NodeType.INPUT) {
					sourceX = node.position.x + 98;
					sourceY = node.position.y + 53;
				}

				if (targetNode.type === NodeType.OUTPUT) {
					targetX = targetNode.position.x + 18;
					targetY = targetNode.position.y + 53;
				}

				return (
					<svg
						key={`${node.nodeId}-${targetId}`}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							pointerEvents: "none",
							zIndex: 9999,
						}}>
						<circle
							cx={sourceX}
							cy={sourceY}
							r="3"
							fill="#0066FF"
						/>
						<circle
							cx={targetX}
							cy={targetY}
							r="3"
							fill="#0066FF"
						/>

						<path
							d={`M ${sourceX} ${sourceY} 
					C ${sourceX + 50} ${sourceY},
					  ${targetX - 50} ${targetY},
					  ${targetX} ${targetY}`}
							stroke="#0066FF4F"
							strokeWidth={7}
							fill="none"
						/>
					</svg>
				);
			})
		);
	};

	return (
		<div className="relative w-full min-h-screen">
			{renderConnections()}
			{workflowNodes.map((node) => (
				<div
					key={node.nodeId}
					className="absolute"
					style={{ top: node.position.y, left: node.position.x }}>
					<Node node={node} />
				</div>
			))}
		</div>
	);
};
