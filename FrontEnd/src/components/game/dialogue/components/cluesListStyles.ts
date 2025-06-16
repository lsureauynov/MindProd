export const cluesListStyles = {
  container: (isExpanded: boolean) => ({
    position: "fixed" as const,
    bottom: 0,
    left: 0,
    right: 0,
    bg: "white",
    boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
    zIndex: 1,
    maxHeight: isExpanded ? "40vh" : "60px",
    transition: "max-height 0.3s ease-in-out",
  }),
  header: {
    p: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    size: "md",
  },
  toggleButton: (isExpanded: boolean) => ({
    "aria-label": isExpanded ? "Réduire les indices" : "Agrandir les indices",
    icon: isExpanded ? "ChevronDownIcon" : "ChevronUpIcon",
    variant: "ghost",
  }),
  content: (isExpanded: boolean) => ({
    p: 4,
    overflowY: "auto" as const,
    maxH: isExpanded ? "calc(40vh - 60px)" : "0",
    opacity: isExpanded ? 1 : 0,
    transition: "all 0.3s ease-in-out",
  }),
  grid: {
    columns: { base: 1, md: 2, lg: 3 },
    spacing: 4,
  },
};

export const cluesListProps = {
  titleText: (count: number) => `Indices découverts (${count})`,
  toggleLabels: {
    expand: "Agrandir les indices",
    collapse: "Réduire les indices",
  },
}; 