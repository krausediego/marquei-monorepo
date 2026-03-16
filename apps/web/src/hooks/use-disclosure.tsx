import { useCallback, useState } from "react";

export interface DisclosureResponse {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: (toSet?: boolean) => void;
}

export const useDisclosure = (
  isOpenDefault: boolean = false
): DisclosureResponse => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback((toSet?: boolean) => {
    if (typeof toSet === "undefined") {
      setIsOpen((state) => !state);
    } else {
      setIsOpen(Boolean(toSet));
    }
  }, []);

  return { isOpen, open, close, toggle };
};
