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
              This visualization demonstrates how liquidity pools work using a modified constant product formula.
              The curve shows the relationship Y = ReserveY - K/(ReserveX + X), where K is the constant product.
            </p>
          </CardContent>
        </Card>

        <ConstantProductChart
          k={10000}
          minX={0}
          maxX={200}
          points={1000}
        />
      </div>
    </div>
  );
}