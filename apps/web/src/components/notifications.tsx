import { Bell } from "lucide-react";
import { Button } from "./ui/button";

export function Notifications() {
  return (
    <Button variant="outline" className="size-9 rounded-full">
      <Bell className="text-muted-foreground" />
    </Button>
  );
}
