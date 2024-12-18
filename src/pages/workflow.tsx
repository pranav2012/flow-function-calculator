import { Node } from "@components/nodes";
import { workflowNodes } from "@constants/node";
import { NodeProvider } from "@HOC/nodeContext";
import { NodeType } from "../types/node";

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
		<NodeProvider>
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
		</NodeProvider>
	);
};
