import React, { useEffect, useRef } from "react";

interface LogoutModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  show,
  onClose,
  onConfirm,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement as HTMLElement;

    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const trapFocus = (e: KeyboardEvent) => {
      if (!show || !modalRef.current) return;

      const focusables = modalRef.current.querySelectorAll(
        focusableElements
      ) as NodeListOf<HTMLElement>;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }

      if (e.key === "Escape") {
        onClose();
      }
    };

    if (show) {
      setTimeout(() => {
        modalRef.current
          ?.querySelector<HTMLElement>(focusableElements)
          ?.focus();
      }, 0);

      document.addEventListener("keydown", trapFocus);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", trapFocus);
      document.body.style.overflow = "";
      previouslyFocusedElement?.focus();
    };
  }, [show, onClose]);

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      ref={modalRef}
      style={{ backgroundColor: show ? "rgba(0,0,0,0.5)" : "transparent" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div
          className="modal-content"
          style={{
            backgroundColor: "var(--modal-bg)",
            color: "var(--modal-text)",
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title">Confirm Logout</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to logout?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
