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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateDataPoints } from "@/lib/math";

interface ConstantProductChartProps {
  k: number;
  minX: number;
  maxX: number;
  points: number;
}

export function ConstantProductChart({
  k,
  minX,
  maxX,
  points,
}: ConstantProductChartProps) {
  const [amountIn, setAmountIn] = useState<number>(50);
  const chartRef = useRef<HTMLDivElement>(null);
  const data = generateDataPoints(k, minX, maxX, points);

  // Calculate dynamic point Y value
  const reserveX = 100;
  const reserveY = 100;
  const dynamicY = reserveY - (reserveX * reserveY) / (reserveX + amountIn);

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Constant Product Formula</h2>
        <p className="text-muted-foreground">
          x * y = {k} (constant k)
        </p>
      </div>

      <div className="mb-4">
        <Label htmlFor="amountIn">Amount In</Label>
        <Input
          id="amountIn"
          type="number"
          value={amountIn}
          onChange={(e) => setAmountIn(Number(e.target.value))}
          className="w-32"
        />
      </div>

      <div className="mb-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Output Amount</p>
          <p className="text-xl font-semibold">{dynamicY.toFixed(2)}</p>
        </div>
      </div>

      <div ref={chartRef} className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="x" 
              label={{ value: 'Reserve X', position: 'bottom' }}
              domain={[0, 200]}  
            />
            <YAxis 
              label={{ value: 'Reserve Y', angle: -90, position: 'insideLeft' }}
              domain={[0, 200]}  
            />
            <Line
              type="monotone"
              dataKey="y"
              stroke="hsl(var(--primary))"
              dot={false}
            />
            {/* Fixed reference point */}
            <ReferenceDot
              x={100}
              y={100}
              r={8}
              fill="red"  
              stroke="white"
              strokeWidth={3}
            />
            {/* Dynamic point based on Amount In */}
            <ReferenceDot
              x={amountIn}
              y={dynamicY}
              r={8}
              fill="blue"  
              stroke="white"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}