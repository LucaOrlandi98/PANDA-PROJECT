import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import type { NavItem } from "../types/content";

type MenuSheetProps = {
  currentLabel: string;
  open: boolean;
  primaryItems: NavItem[];
  secondaryItems: NavItem[];
  onClose: () => void;
};

export function MenuSheet({
  currentLabel,
  open,
  primaryItems,
  secondaryItems,
  onClose,
}: MenuSheetProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  return (
    <div className={`menu-sheet ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button
        aria-label="Chiudi menu"
        className="menu-sheet__backdrop"
        onClick={onClose}
        type="button"
      />
      <div className="menu-sheet__panel">
        <div className="menu-sheet__header">
          <div>
            <p className="eyebrow">{currentLabel}</p>
            <h2>Navigazione</h2>
          </div>
          <button
            className="menu-sheet__close"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            Chiudi
          </button>
        </div>

        <div className="menu-sheet__section">
          <p className="eyebrow">Sezioni</p>
          <div className="menu-sheet__list">
            {primaryItems.map((item) => (
              <Link
                className="menu-sheet__item"
                key={item.to}
                onClick={onClose}
                to={item.to}
              >
                <strong>{item.label}</strong>
                <span>{item.description}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="menu-sheet__section">
          <p className="eyebrow">Altro</p>
          <div className="menu-sheet__list">
            {secondaryItems.map((item) => (
              <Link
                className="menu-sheet__item"
                key={item.to}
                onClick={onClose}
                to={item.to}
              >
                <strong>{item.label}</strong>
                <span>{item.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
