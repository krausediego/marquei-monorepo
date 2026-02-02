import { MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function SectionSeparator() {
  return (
    <div className="col-span-3 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <MapPin className="text-muted-foreground size-5" />
        <h3 className="text-muted-foreground text-sm">Endereço</h3>
      </div>
      <Separator className="flex-1" />
    </div>
  );
}
