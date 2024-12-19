import { workflowNodes } from "@constants/node";
import { Position } from "../types/node";
import { memo } from "react";
import { Node } from "@components/nodes";

export const NodeWrapper = memo(
	({
		node,
		position,
	}: {
		node: (typeof workflowNodes)[0];
		position: Position;
	}) => (
		<div className="absolute" style={{ top: position.y, left: position.x }}>
			<Node node={node} />
		</div>
	)
);
