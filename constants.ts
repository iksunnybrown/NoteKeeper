const DEFAULT_EMOJIS = [
  "😀",
  "🔥",
  "📚",
  "🚀",
  "💯",
  "✨",
  "😎",
  "🎉",
  "❤️",
  "😂",
  "👍",
  "🌟",
  "🤖",
  "🎮",
  "⚡",
  "🧠",
  "🌍",
  "🏆",
  "🌍",
  "🏆",
];

const CATEGORIES = [
  { value: "work", label: "Work", color: "bg-[hsl(var(--category-work))]" },
  {
    value: "personal",
    label: "Personal",
    color: "bg-[hsl(var(--category-personal))]",
  },
  { value: "ideas", label: "Ideas", color: "bg-[hsl(var(--category-ideas))]" },
  {
    value: "password",
    label: "Password",
    color: "bg-[hsl(var(--category-password))]",
  },
  {
    value: "health",
    label: "Health",
    color: "bg-[hsl(var(--category-health))]",
  },
  {
    value: "learning",
    label: "Learning",
    color: "bg-[hsl(var(--category-learning))]",
  },
];

const COMPLETION_FILTER = [
  { label: "All Status", value: "all" },
  { label: "Complete", value: "complete" },
  { label: "Incomplete", value: "incomplete" },
];

export { DEFAULT_EMOJIS, CATEGORIES, COMPLETION_FILTER };
