export enum NodeType {
	INPUT = "input",
	FUNCTION = "function",
	OUTPUT = "output",
}

interface Position {
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
}
const FunctionNode = ({ node }: { node: WorkflowNode }) => {
	return (
		<div className="bg-white rounded-[15px] border border-[#DFDFDF] p-4 shadow-md w-[235px]">
			<div className="flex items-center gap-2 mb-4">
				<div>
					<div className="flex gap-[2px] mb-1">
						<div className="w-[2.6px] h-[2.6px] bg-[#CDCDCD] rounded-full" />
						<div className="w-[2.6px] h-[2.6px] bg-[#CDCDCD] rounded-full" />
						<div className="w-[2.6px] h-[2.6px] bg-[#CDCDCD] rounded-full" />
					</div>
					<div className="flex gap-[2px]">
						<div className="w-[2.6px] h-[2.6px] bg-[#CDCDCD] rounded-full" />
						<div className="w-[2.6px] h-[2.6px] bg-[#CDCDCD] rounded-full" />
						<div className="w-[2.6px] h-[2.6px] bg-[#CDCDCD] rounded-full" />
					</div>
				</div>
				<span className="text-[14px] text-[#A5A5A5] font-semibold">
					{node.displayName}
				</span>
			</div>

			<div className="space-y-4">
				<div>
					<label
						htmlFor={`equation-${node.nodeId}`}
						className="block text-[#252525] mb-2 text-xs">
						Equation
					</label>
					<input
						id={`equation-${node.nodeId}`}
						type="text"
						className="w-full p-2 border text-xs border-[#D3D3D3] rounded-lg bg-white"
						placeholder="Enter equation (use 'x' for value)"
					/>
				</div>

				<div>
					<label
						htmlFor={`next-function-${node.nodeId}`}
						className="block text-[#252525] mb-2 text-xs">
						Next function
					</label>
					<select
						disabled
						id={`next-function-${node.nodeId}`}
						className="w-full p-2 border text-xs border-[#D3D3D3] rounded-lg bg-white text-gray-400">
						<option>
							{node.connectedTo[0] > 6
								? "-"
								: `Function ${node.connectedTo[0] - 1} `}
						</option>
					</select>
				</div>
			</div>

			<div className="flex justify-between mt-4">
				<div className="flex items-center gap-1">
					<div className="w-[15px] h-[15px] rounded-full border-[2px] border-[#DBDBDB] bg-white" />
					<span className="text-[#585757] text-[10px]">input</span>
				</div>
				<div className="flex items-center gap-1">
					<span className="text-[#585757] text-[10px]">output</span>
					<div className="w-[15px] h-[15px] rounded-full border-[2px] border-[#DBDBDB] bg-white" />
				</div>
			</div>
		</div>
	);
};

const InputNode = ({ node }: { node: WorkflowNode }) => {
	return (
		<div className="flex flex-col items-center">
			<div className="bg-[#E29A2D] text-white px-2 py-1 rounded-full mb-1 text-xs">
				{node.displayName}
			</div>
			<div className="bg-white rounded-[15px] border-[2px] border-[#FFC267] w-[115px] flex items-center shadow-md overflow-hidden">
				<input
					id={`initial-value-${node.nodeId}`}
					type="number"
					className="w-full p-2 mr-2 border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
					defaultValue="2"
					min="0"
				/>
				<div className="flex items-center gap-2 pr-2">
					<div className="w-[15px] h-[15px] rounded-full border-[2px] border-[#DBDBDB] bg-white" />
				</div>
			</div>
		</div>
	);
};

const OutputNode = ({ node }: { node: WorkflowNode }) => {
	return (
		<div className="flex flex-col items-center">
			<div className="bg-[#4CAF79] text-white px-2 py-1 rounded-full mb-1 text-xs">
				{node.displayName}
			</div>
			<div className="bg-white rounded-[15px] border-[2px] border-[#2DD179] w-[115px] flex items-center shadow-md overflow-hidden">
				<div className="flex items-center gap-2 pl-2">
					<div className="w-[15px] h-[15px] rounded-full border-[2px] border-[#DBDBDB] bg-white" />
				</div>
				<input
					id={`output-value-${node.nodeId}`}
					type="text"
					className="w-full p-2 ml-2 border "
					defaultValue="120"
					readOnly
				/>
			</div>
		</div>
	);
};

export const Node = ({ node }: { node: WorkflowNode }) => {
	switch (node.type) {
		case NodeType.FUNCTION:
			return <FunctionNode node={node} />;
		case NodeType.INPUT:
			return <InputNode node={node} />;
		case NodeType.OUTPUT:
			return <OutputNode node={node} />;
		default:
			return null;
	}
};