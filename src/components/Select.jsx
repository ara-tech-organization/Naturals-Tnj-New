import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

/**
 * Accessible single-select, styled to match `.field select` but rendered as
 * our own button + listbox (WAI-ARIA listbox pattern) so the open menu can be
 * themed instead of left to each browser's native dropdown chrome.
 */
export default function Select({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select…",
  disabled = false,
  invalid = false,
  describedBy,
  required = false,
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef(null);
  const listRef = useRef(null);

  const selected = options.find((o) => o.value === value) ?? null;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const openMenu = () => {
    setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };

  useEffect(() => {
    if (!open || activeIndex < 0) return;
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const commit = (opt) => {
    onChange(opt.value);
    setOpen(false);
    rootRef.current?.querySelector(".select__btn")?.focus();
  };

  const onKeyDown = (e) => {
    if (disabled) return;

    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (options[activeIndex]) commit(options[activeIndex]);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="select" ref={rootRef}>
      <button
        type="button"
        id={id}
        name={name}
        className={`select__btn${invalid ? " select__btn--invalid" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid ? "true" : undefined}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
      >
        <span className={selected ? "" : "select__placeholder"}>
          {selected ? selected.label : placeholder}
        </span>
        <Icon name="chevron" size={14} className="select__chev" />
      </button>

      {open ? (
        <ul
          className="select__list"
          role="listbox"
          ref={listRef}
          tabIndex={-1}
          aria-activedescendant={activeIndex >= 0 ? `${id}-opt-${activeIndex}` : undefined}
        >
          {options.map((opt, i) => (
            <li
              key={opt.value}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={opt.value === value}
              className={`select__option${i === activeIndex ? " is-active" : ""}${
                opt.value === value ? " is-selected" : ""
              }`}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => commit(opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
