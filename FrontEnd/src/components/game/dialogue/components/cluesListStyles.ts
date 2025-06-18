export const cluesListStyles = {
  container: {
    bg: "transparent",
    w: "full",
    h: "full",
  },
  header: {
    display: "none", // Masquer le header car il est géré par le parent
  },
  title: {
    size: "md",
  },
  toggleButton: (isExpanded: boolean) => ({
    "aria-label": isExpanded ? "Réduire les indices" : "Agrandir les indices",
    icon: isExpanded ? "ChevronDownIcon" : "ChevronUpIcon",
    variant: "ghost",
  }),
  content: {
    w: "full",
    h: "full",
  },
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