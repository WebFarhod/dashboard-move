import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { useState, useRef, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Button } from "@/components/ui/button";
import CardItem from "./card";
import { ModeToggle } from "./mode-toggle";

export default function Page() {
  const [layout, setLayout] = useState([
    { i: "widget1", x: 0, y: 0, w: 12, h: 3 },
    { i: "widget2", x: 0, y: 0, w: 4, h: 3 },
    { i: "widget3", x: 4, y: 0, w: 6, h: 3 },
  ]);

  const dashboardRef = useRef<HTMLDivElement>(null);
  const [, setWidth] = useState(1200);

  useEffect(() => {
    const updateWidth = () => {
      if (dashboardRef.current) {
        setWidth(dashboardRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const addItem = () => {
    const newItem = {
      i: `widget${layout.length + 1}`,
      x: (layout.length * 4) % 12,
      y: Infinity,
      w: 4,
      h: 2,
    };
    setLayout((prevLayout) => [...prevLayout, newItem]);
  };

  const removeItem = (id: string) => {
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== id));
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen">
        {/* Header */}
        <header className="flex h-16 items-center gap-2 px-4 border-b">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Button onClick={addItem}>Add Card</Button>
          <ModeToggle />
        </header>

        {/* Grid qismi */}
        <div ref={dashboardRef} className="flex-grow overflow-auto p-0">
          <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={100}
            width={1200}
            onLayoutChange={setLayout}
            draggableHandle=".drag-handle"
          >
            {layout.map((item, i) => (
              <div key={item.i} data-grid={item}>
                <CardItem item={item} index={i} removeItem={removeItem} />
              </div>
            ))}
          </GridLayout>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
