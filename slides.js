// Edit this file to make your carousel. index.html reads it.
// Wrap words in *stars* to colour them with the accent colour.
// Slide types: cover, statement, steps, chat, bars, compare, list, cta.

window.CAROUSEL = {
  brand: {
    name: "Your Name",
    handle: "@yourhandle",
    // Optional: a square photo, e.g. "assets/photo.jpg". Leave empty to show initials.
    photo: "",
    colors: {
      bg: "#E8F2FE",     // light slide background
      ink: "#00204E",    // text and dark slides
      accent: "#0068E5", // highlights, buttons, progress bar
      soft: "#7DB4FF",   // highlights on dark slides
      muted: "#5B6B85",  // secondary text
      line: "#D6E6FF",   // card borders
    },
  },

  slides: [
    {
      type: "cover",
      chip: "A field guide",
      title: "Write posts<br>people actually<br>*finish reading.*",
      sub: "5 habits that keep readers swiping to the last slide.",
      card: {
        title: "Inside",
        items: ["One idea per slide", "Short lines", "A clear next step"],
      },
    },
    {
      type: "statement",
      tag: "The problem",
      title: "Most posts lose readers *in the first two lines.*",
      beforeLabel: "What people do",
      before: ["Long intro", "Backstory", "Three disclaimers", "Finally the point"],
      afterLabel: "What works",
      after: "\"Here is the one thing I changed.\"",
      punch: "Same idea.<br>*Said first.*",
    },
    {
      type: "steps",
      tag: "How to start",
      title: "Three steps. *Ten minutes.*",
      steps: [
        { title: "1. Pick one idea", text: "If it needs two posts, write two posts." },
        { title: "2. Write the last line first", text: "Know where the reader should end up." },
        { title: "3. Cut every intro", text: "Start where the useful part starts." },
      ],
      tip: { label: "TIP", text: "Read it out loud. Cut whatever you skip over." },
    },
    {
      type: "chat",
      tag: "Ask for feedback",
      title: "Let a draft *get a second opinion.*",
      ask: "Which lines in my draft can go?",
      lead: "*4 lines.* Start with these:",
      rows: [
        { text: "\"In today's fast-paced world...\"", pill: { text: "CUT", color: "red" } },
        { text: "\"I wanted to share that...\"", pill: { text: "CUT", color: "red" } },
        { text: "\"Here is what I learned.\"", pill: { text: "KEEP", color: "green" } },
      ],
      tip: { label: "DO THIS", text: "Ask what to remove, not what to add." },
    },
    {
      type: "bars",
      tag: "What I tested",
      label: "HABIT 1",
      of: "of 2",
      title: "Shorter lines. *More reads.*",
      caption: "Same post, two layouts",
      bars: [
        { name: "Wall of text", pct: 38, result: "Skimmed", good: false },
        { name: "One line each", pct: 100, result: "Read to the end", good: true },
      ],
      tip: { label: "DO THIS", text: "Break a line wherever you would take a breath." },
    },
    {
      type: "compare",
      tag: "What I tested",
      label: "HABIT 2",
      of: "of 2",
      title: "Give a number *before a list.*",
      left: { label: "Say the count", value: "7", note: "Readers know how long it is." },
      right: { label: "Just start listing" },
      tip: { label: "DO THIS", text: "Put the number in the first line." },
    },
    {
      type: "list",
      tag: "Recap",
      title: "Save this *for your next post.*",
      items: [
        "One idea per post",
        "Write the last line first",
        "Cut the intro",
        "Short lines",
        "Say the count up front",
      ],
    },
    {
      type: "cta",
      tag: "Your turn",
      title: "Good posts are short. *Great ones are shorter.*",
      card: {
        title: "Free checklist",
        items: ["5 habits", "Before-and-after examples", "A one-page template"],
        button: "Link in the first comment",
      },
      follow: { line: "Practical writing tips, every week.", button: "Follow for more" },
    },
  ],
};
