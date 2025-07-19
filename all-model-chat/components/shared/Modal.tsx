import React, { useState, useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  contentClassName?: string;
  backdropClassName?: string;
  noPadding?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  contentClassName = '',
  backdropClassName = 'bg-black bg-opacity-60 backdrop-blur-sm',
  noPadding = false,
}) => {
  const [isActuallyOpen, setIsActuallyOpen] = useState(isOpen);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsActuallyOpen(true);
    } else {
      const timer = setTimeout(() => setIsActuallyOpen(false), 300); // Corresponds to modal-exit-animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the click is on the backdrop itself, not on any of its children
    if (e.target === e.currentTarget) {
        onClose();
    }
  };

  if (!isActuallyOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${noPadding ? '' : 'p-2 sm:p-4'} ${backdropClassName}`}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalContentRef}
        className={`bg-[var(--theme-bg-primary)] rounded-lg shadow-2xl max-w-lg w-full ${contentClassName} ${isOpen ? 'modal-enter-animation' : 'modal-exit-animation'}`}
      >
        {title && (
          <div className="p-4 border-b border-[var(--theme-bg-secondary)]">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
        )}
        <div className={noPadding ? '' : 'p-4'}>{children}</div>
      </div>
    </div>
  );
};
