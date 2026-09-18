'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
}

interface DropdownProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder: string;
  invalid?: boolean;
  labelledBy?: string;
}

export default function Dropdown({
  id,
  value,
  onChange,
  options,
  placeholder,
  invalid = false,
  labelledBy,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const selectOption = (optionValue: string) => {
    onChange(optionValue);
    setOpen(false);
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)));
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (activeIndex >= 0) selectOption(options[activeIndex].value);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        id={id}
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''} ${invalid ? styles.triggerInvalid : ''}`}
        onClick={() => {
          setOpen((v) => !v);
          setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)));
        }}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelledBy}
      >
        <span className={selected ? styles.triggerValue : styles.triggerPlaceholder}>
          {selected ? (
            <>
              {selected.icon && <i className={selected.icon} />}
              {selected.label}
            </>
          ) : (
            placeholder
          )}
        </span>
        <i className={`fas fa-chevron-down ${styles.chevron}`} />
      </button>

      {open && (
        <ul
          className={styles.listbox}
          role="listbox"
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
          aria-activedescendant={activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={option.value === value}
              className={`${styles.option} ${index === activeIndex ? styles.optionActive : ''} ${
                option.value === value ? styles.optionSelected : ''
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => selectOption(option.value)}
            >
              {option.icon && <i className={`${option.icon} ${styles.optionIcon}`} />}
              {option.label}
              {option.value === value && <i className={`fas fa-check ${styles.checkIcon}`} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
