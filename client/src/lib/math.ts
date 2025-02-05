export function calculateConstantProduct(k: number, x: number): number {
  return k / x;
}

export function generateDataPoints(k: number, minX: number, maxX: number, points: number): Array<{x: number; y: number}> {
  const data: Array<{x: number; y: number}> = [];
  const step = (maxX - minX) / points;
  
  for (let x = minX; x <= maxX; x += step) {
    data.push({
      x,
      y: calculateConstantProduct(k, x)
    });
  }
  
  return data;
}

export function findClosestPoint(data: Array<{x: number; y: number}>, mouseX: number, mouseY: number) {
  let minDistance = Infinity;
  let closestPoint = data[0];

  data.forEach(point => {
    const distance = Math.sqrt(
      Math.pow(point.x - mouseX, 2) + Math.pow(point.y - mouseY, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestPoint = point;
    }
  });

  return closestPoint;
}
