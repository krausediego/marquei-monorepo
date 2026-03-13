// use-confirm-dialog.ts
import { useState } from "react";

interface UseConfirmDialogOptions<T> {
  onConfirm: (data: T) => Promise<any>;
  isPending: boolean;
}

export function useConfirmDialog<T>({
  onConfirm,
  isPending,
}: UseConfirmDialogOptions<T>) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const openDialog = (data: T) => {
    setData(data);
    setOpen(true);
  };

  const confirm = async () => {
    if (!data) return;
    await onConfirm(data);
  };

  const handleOpenChange = (value: boolean) => {
    if (isPending) return;
    setOpen(value);
  };

  return { open, setOpen, openDialog, confirm, handleOpenChange };
}
