import { useMemo } from "react";
import { workflowNodes } from "@constants/node";
import { NodeProvider } from "@HOC/nodeContext";
import { ConnectionPoint } from "../types/node";
import { getConnectionPoints } from "@utils/node";
import { ConnectingLine } from "@components/connectingLine";
import { NodeWrapper } from "@components/nodeWrapper";

export const Workflow = () => {
	const connections = useMemo(() => {
		return workflowNodes.flatMap((node) =>
			node.connectedTo
				.map((targetId) => {
					const targetNode = workflowNodes.find(
						(n) => n.nodeId === targetId
					);
					if (!targetNode) return null;

					const points = getConnectionPoints(node, targetNode);

					return {
						key: `${node.nodeId}-${targetId}`,
						points,
					};
				})
				.filter(
					(
						connection
					): connection is {
						key: string;
						points: {
							source: ConnectionPoint;
							target: ConnectionPoint;
						};
					} => connection !== null
				)
		);
	}, []);

	const nodes = useMemo(
		() =>
			workflowNodes.map((node) => ({
				key: node.nodeId,
				node,
				position: node.position,
			})),
		[]
	);

	return (
		<NodeProvider>
			<div className="relative w-full min-h-screen">
				{connections.map(({ key, points }) => (
					<ConnectingLine
						key={key}
						sourcePoint={points.source}
						targetPoint={points.target}
					/>
				))}
				{nodes.map(({ key, node, position }) => (
					<NodeWrapper key={key} node={node} position={position} />
				))}
			</div>
		</NodeProvider>
	);
};
