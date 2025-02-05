import { useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { Card } from "@/components/ui/card";
import { generateDataPoints, findClosestPoint } from "@/lib/math";

interface ConstantProductChartProps {
  reserveX: number;
  reserveY: number;
  minX: number;
  maxX: number;
  points: number;
}

export function ConstantProductChart({
  reserveX,
  reserveY,
  minX,
  maxX,
  points,
}: ConstantProductChartProps) {
  const [currentPoint, setCurrentPoint] = useState<{x: number; y: number}>({ x: reserveX, y: reserveY });
  const chartRef = useRef<HTMLDivElement>(null);
  const data = generateDataPoints(reserveX, reserveY, minX, maxX, points);

  const handleMouseMove = (e: any) => {
    if (!chartRef.current || !e.activePayload) return;

    const point = e.activePayload[0].payload;
    setCurrentPoint({ x: point.x, y: point.y });
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">AMM Price Impact</h2>
        <p className="text-muted-foreground">
          y = (ReserveY * x) / (ReserveX + x)
        </p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Token X Amount</p>
          <p className="text-xl font-semibold">{currentPoint.x.toFixed(2)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Token Y Price</p>
          <p className="text-xl font-semibold">{currentPoint.y.toFixed(2)}</p>
        </div>
      </div>

      <div ref={chartRef} className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            onMouseMove={handleMouseMove}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="x" 
              label={{ value: 'Token X Amount', position: 'bottom' }}
              domain={[0, maxX]}
            />
            <YAxis 
              label={{ value: 'Token Y Price', angle: -90, position: 'insideLeft' }}
              domain={[0, Math.max(reserveY * 1.2, ...data.map(d => d.y))]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background border rounded p-2">
                      <p className="text-sm">Amount: {payload[0].payload.x.toFixed(2)}</p>
                      <p className="text-sm">Price: {payload[0].payload.y.toFixed(2)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="y"
              stroke="hsl(var(--primary))"
              dot={false}
              activeDot={{ r: 8 }}
            />
            <ReferenceDot
              x={reserveX}
              y={reserveY}
              r={8}
              fill="red"
              stroke="white"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}