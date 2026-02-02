import { Upload, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface LogoUploadProps {
  logoPreview: string | null;
  onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoRemove: () => void;
}

export function LogoUpload({
  logoPreview,
  onLogoChange,
  onLogoRemove,
}: LogoUploadProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Label>Logotipo</Label>
      <div
        className={cn(
          "group hover:border-primary/50 relative flex size-58 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed transition-colors",
          logoPreview
            ? "border-border border-solid"
            : "border-muted-foreground/25",
        )}
      >
        {!logoPreview && (
          <input
            accept="image/*"
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            onChange={onLogoChange}
            type="file"
          />
        )}

        {logoPreview ? (
          <>
            <img
              alt="Logo preview"
              className="h-full w-full object-cover"
              src={logoPreview}
            />
            <div
              className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={onLogoRemove}
            >
              <div className="text-center text-white">
                <X className="mx-auto mb-2 h-8 w-8" />
                <span className="text-sm font-medium">Clique para remover</span>
              </div>
            </div>
          </>
        ) : (
          <div className="pointer-events-none p-2 text-center">
            <Upload className="text-muted-foreground group-hover:text-primary mx-auto mb-1 h-6 w-6 transition-colors" />
            <span className="text-muted-foreground text-xs">
              Clique para enviar
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
