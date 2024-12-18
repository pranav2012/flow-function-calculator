export const evaluateEquation = (equation: string, xValue: number) => {
	// Remove all spaces from equation
	equation = equation.replace(/\s+/g, "");

	// Validate equation format using regex
	const validPattern = /^[x0-9\+\-\*\/\^()]+$/;
	if (!validPattern.test(equation)) {
		return null;
	}

	// Additional validation for proper operator usage
	const invalidPatterns = [
		/[\+\-\*\/\^]{2,}/, // Consecutive operators
		/\d+x/, // Number immediately before x without operator
		/x\d/, // x immediately before number without operator
		/xx/, // Multiple x's together
	];

	for (const pattern of invalidPatterns) {
		if (pattern.test(equation)) {
			return null;
		}
	}

	try {
		let processedEquation = equation.replace(/x/g, xValue.toString());

		// Split the equation into parts while preserving operators
		const parts = processedEquation.match(/(\d+|\+|\-|\*|\/|\^)/g);
		if (!parts) return null;

		// Process exponentiation first (^)
		while (parts.includes("^")) {
			const index = parts.indexOf("^");
			if (index <= 0 || index >= parts.length - 1) return null;

			const base = parseFloat(parts[index - 1]);
			const exponent = parseFloat(parts[index + 1]);
			const result = Math.pow(base, exponent);

			// Replace the three elements (base, ^, exponent) with the result
			parts.splice(index - 1, 3, result.toString());
		}

		// Join back and evaluate the rest using standard arithmetic
		processedEquation = parts.join("");
		const result = new Function("return " + processedEquation)();

		// Check if result is a valid number
		if (isNaN(result) || !isFinite(result)) {
			return null;
		}

		return result;
	} catch {
		return null;
	}
};