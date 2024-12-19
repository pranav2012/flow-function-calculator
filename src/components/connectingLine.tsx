import { ConnectionPoint } from "../types/node";
import { memo } from "react";

export const ConnectingLine = memo(
    ({
        sourcePoint,
        targetPoint,
    }: {
        sourcePoint: ConnectionPoint;
        targetPoint: ConnectionPoint;
    }) => {
        // Calculate the distance between points
        const dx = targetPoint.x - sourcePoint.x;
        const dy = targetPoint.y - sourcePoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Threshold for when to start curving the line
        const CURVE_THRESHOLD = 200; // Adjust this value as needed

        let path;
        
        if (distance < CURVE_THRESHOLD) {
            // For short distances, draw a straight line
            path = `M ${sourcePoint.x} ${sourcePoint.y} L ${targetPoint.x} ${targetPoint.y}`;
        } else {
            // For longer distances, create a curved line
            const midX = (sourcePoint.x + targetPoint.x) / 2;
            const midY = (sourcePoint.y + targetPoint.y) / 2;
            
            // Determine if the line should curve up or down based on relative positions
            const curveDirection = sourcePoint.y < targetPoint.y ? -1 : 1;
            
            // Calculate curve height based on distance
            const curveHeight = Math.min(distance * 0.3, 100) * curveDirection;

            // Calculate control point using the midpoint and curve height
            const controlPoint = {
                x: midX,
                y: midY + curveHeight
            };

            path = `
                M ${sourcePoint.x} ${sourcePoint.y}
                Q ${controlPoint.x} ${controlPoint.y},
                  ${targetPoint.x} ${targetPoint.y}
            `;
        }

        return (
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
                    d={path}
                    stroke="#0066FF4F"
                    strokeWidth={7}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }
);