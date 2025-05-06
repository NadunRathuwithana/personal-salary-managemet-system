export const compactStyles = {
  // Component sizes
  sizes: {
    input: "h-9 py-1.5 px-3 text-sm",
    button: "h-9 px-3 text-sm",
    buttonIcon: "h-8 w-8",
    card: "p-3",
    cardHeader: "pb-2 space-y-0.5",
    cardTitle: "text-base font-medium",
    cardContent: "pt-2",
    tableCell: "py-2 px-3",
    dropdown: "p-1.5 min-w-[8rem]",
    dropdownItem: "text-sm rounded-md px-2 py-1.5",
  },

  // Spacing
  spacing: {
    xs: "0.5rem", // 8px
    sm: "0.75rem", // 12px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
  },

  // Border radius
  radius: {
    sm: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
  },

  // Transitions
  transitions: {
    default: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
    hover: "transform 100ms ease",
  },

  // Hover animations
  hover: {
    card: "hover:shadow-md hover:translate-y-[-2px] transition-all",
    buttonScale: "hover:scale-105 active:scale-95",
    itemHighlight: "hover:bg-accent/50 hover:text-accent-foreground",
  },
};
