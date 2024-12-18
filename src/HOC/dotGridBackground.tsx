import { ReactNode, useMemo, useEffect, useState } from "react";

interface DotGridBackgroundProps {
    children: ReactNode;
}

export const DotGridBackground = ({ children }: DotGridBackgroundProps) => {
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const dotGrid = useMemo(() => {
        const dots = [];
        const spacing = 24;
        const dotSize = 4;

        const rows = Math.ceil(dimensions.height / spacing);
        const cols = Math.ceil(dimensions.width / spacing);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                dots.push(
                    <div
                        key={`${row}-${col}`}
                        className="absolute rounded-full bg-slate-300"
                        style={{
                            top: `${row * spacing}px`,
                            left: `${col * spacing}px`,
                            width: `${dotSize}px`,
                            height: `${dotSize}px`,
                        }}
                    />
                );
            }
        }
        return dots;
    }, [dimensions]);

    return (
        <div className="relative w-full bg-slate-50 overflow-hidden">
            <div className="absolute inset-0">
                {dotGrid}
            </div>
            <div className="relative z-10">{children}</div>
        </div>
    );
};
