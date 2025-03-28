import { Card, CardHeader } from "@/components/ui/card";
import { PieChartCard } from "./charts/pie-chart";
import { BarChartCard } from "./charts/bar-chart";
import { AreaChartCard } from "./charts/area-chart";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

interface CardItemProps {
  item: { i: string };
  index: number;
  removeItem: (id: string) => void;
}

const CardItem: React.FC<CardItemProps> = ({ item, index, removeItem }) => {
  return (
    <Card className="p-2 relative w-full h-full m-1">
      <CardHeader className=" drag-handle cursor-move absolute w-full h-full left-0 top-0"></CardHeader>
      <Button
        className=" absolute top-0 right-0"
        variant="ghost"
        size="icon"
        onClick={() => removeItem(item.i)}
      >
        <Trash2 />
      </Button>
      {index % 3 === 1 && <PieChartCard />}
      {index % 3 === 2 && <BarChartCard />}
      {index % 3 === 0 && <AreaChartCard />}
    </Card>
  );
};

export default CardItem;
