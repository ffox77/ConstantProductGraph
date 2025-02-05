import { ConstantProductChart } from "@/components/constant-product-chart";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold mb-4">
              AMM Price Impact Visualization
            </h1>
            <p className="text-muted-foreground">
              This visualization demonstrates how AMM prices change based on trade size.
              Move your cursor along the curve to see how the price of Token Y changes
              as the amount of Token X varies.
            </p>
          </CardContent>
        </Card>

        <ConstantProductChart
          reserveX={100}
          reserveY={100}
          minX={1}
          maxX={500}
          points={1000}
        />
      </div>
    </div>
  );
}