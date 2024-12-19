import { ConnectionPoint } from "../types/node";
import { memo } from "react";

export const ConnectingLine = memo(
	({
		sourcePoint,
		targetPoint,
	}: {
		sourcePoint: ConnectionPoint;
		targetPoint: ConnectionPoint;
	}) => (
		<svg
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
				cx={sourcePoint.x}
				cy={sourcePoint.y}
				r="3"
				fill="#0066FF"
			/>
			<circle
				cx={targetPoint.x}
				cy={targetPoint.y}
				r="3"
				fill="#0066FF"
			/>
			<path
				d={`M ${sourcePoint.x} ${sourcePoint.y} 
          C ${sourcePoint.x + 50} ${sourcePoint.y},
            ${targetPoint.x - 50} ${targetPoint.y},
            ${targetPoint.x} ${targetPoint.y}`}
				stroke="#0066FF4F"
				strokeWidth={7}
				fill="none"
			/>
		</svg>
	)
);
