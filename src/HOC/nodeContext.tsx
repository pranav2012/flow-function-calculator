// nodeContext.tsx
import { evaluateEquation } from "@utils/node";
import { NodeType, NodeValuesContextType } from "../types/node";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { workflowNodes } from "@constants/node";

export const NodeProvider = ({ children }: { children: React.ReactNode }) => {
	const [nodeValues, setNodeValues] = useState<{ [key: string]: number }>({});
	const [equations, setEquations] = useState<{ [key: string]: string }>({});
	const [shouldSync, setShouldSync] = useState(false);

	const updateNodeValue = useCallback((nodeId: string, value: number) => {
		setNodeValues((prev) => ({
			...prev,
			[nodeId]: value,
		}));
		setShouldSync(true);
	}, []);

	const updateEquation = useCallback((nodeId: string, equation: string) => {
		setEquations((prev) => ({
			...prev,
			[nodeId]: equation,
		}));
		setShouldSync(true);
	}, []);

	const functionOrder = useMemo(() => {
		const orders: { [key: number]: number } = {};

		workflowNodes.forEach((node) => {
			if (node.type === NodeType.FUNCTION) {
				orders[node.nodeId] = node.connectedFrom[0];
			}
		});
		const sortedKeys = Object.entries(orders)
			.sort((a, b) => a[1] - b[1]) // Sort based on values
			.map((entry) => entry[0]);

		return sortedKeys;
	}, []);

	const syncNodeValues = useCallback(() => {
		if (!shouldSync) return;

		const newValues = { ...nodeValues };
		functionOrder.forEach((nodeId) => {
			const node = workflowNodes.find(
				(n) => n.nodeId.toString() === nodeId
			);
			if (node?.type === NodeType.FUNCTION) {
				const inputValue =
					node.connectedFrom.length > 0
						? newValues[node.connectedFrom[0]]
						: 0;
				const equation =
					equations[node.nodeId] || node.defaultEquation || "";
				const result = evaluateEquation(equation, inputValue);
				newValues[node.nodeId] = result !== null ? result : 0;
			}
		});

		setNodeValues(newValues);
		setShouldSync(false);
	}, [nodeValues, equations, functionOrder, shouldSync]);

	useEffect(() => {
		syncNodeValues();
	}, [shouldSync, syncNodeValues]);

	// Initial setup
	useEffect(() => {
		const initialEquations: { [key: string]: string } = {};
		workflowNodes.forEach((node) => {
			if (node.type === NodeType.FUNCTION) {
				initialEquations[node.nodeId] = node.defaultEquation || "";
			}
		});
		setEquations(initialEquations);
		updateNodeValue("1", 2);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<NodeContext.Provider
			value={{
				nodeValues,
				equations,
				updateNodeValue,
				updateEquation,
			}}>
			{children}
		</NodeContext.Provider>
	);
};

export const NodeContext = createContext<NodeValuesContextType | undefined>(
	undefined
);

export const useNodeValues = () => {
	const context = useContext(NodeContext);
	if (!context) {
		throw new Error("useNodeValues must be used within a NodeProvider");
	}
	return context;
};
