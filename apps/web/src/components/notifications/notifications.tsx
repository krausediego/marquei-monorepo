import { Bell } from "lucide-react";
import { Button } from "../ui/button";

export function Notifications() {
  return (
    <Button variant="outline" className="size-10 rounded-full">
      <Bell className="h-full w-full" />
    </Button>
  );
}
