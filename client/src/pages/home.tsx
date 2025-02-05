import { ConstantProductChart } from "@/components/constant-product-chart";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold mb-4">
              Constant Product Market Maker
            </h1>
            <p className="text-muted-foreground">
              This visualization demonstrates how liquidity pools work using the constant product formula.
              Click and drag along the curve to see how the reserves of tokens X and Y change while maintaining their product constant.
            </p>
          </CardContent>
        </Card>

        <ConstantProductChart
          k={1000}
          minX={1}
          maxX={100}
          points={1000}
        />
      </div>
    </div>
  );
}
