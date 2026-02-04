import { useState, useEffect } from "react";

export function useDialogUnmount(open: boolean, delay = 150) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [open, delay]);

  return shouldRender;
}
