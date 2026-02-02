import { Bell } from "lucide-react";
import { Button } from "../ui/button";

export function Notifications() {
  return (
    <Button variant="outline" className="rounded-full size-10">
      <Bell />
    </Button>
  );
}
