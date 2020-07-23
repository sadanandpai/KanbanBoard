var kanbanData = {
  columns: ["story", "todo", "testing", "done"],
  stories: [
    {
      column: "story",
      name: "Floating point improvement",
      description:
        "It is required to improve the floating point to 64 decimals for in our alien launch missile",
      type: "feature",
      priority: "medium",
    },
    {
      column: "story",
      name: "Refactoring",
      description:
        "Remove the Obfuscated code and reimplement the same with test cases having good coverage. The current code is difficult to comprehend and challenging for enhancements in future.",
      type: "task",
      priority: "low",
    },

    {
      column: "todo",
      name: "Mars Climate Orbiter",
      description:
        "Navigation error: teams who controlled the probe from Earth used parameters in imperial units meanwhile the software calculations were using the metric system. Fix it",
      type: "bug",
      priority: "high",
    },
    {
      column: "todo",
      name: "Allow more than 256 users limit in group",
      description:
        "Users are moving to telegram. So implement the feature of allowing more than 256 users in the group. Make sure the limit can be changed easily in future when higher reqruiremnts come.",
      type: "feature",
      priority: "medium",
    },
    {
      column: "todo",
      name: "BONUS – BSOD DURING THE WINDOWS 98",
      description:
        "Blue screen of death requires new feature will logging facility. Also add a scary looking face with dracula's voice",
      type: "feature",
      priority: "medium",
    },
    {
      column: "todo",
      name: "Layout configuration",
      description:
        "To configure the layout of the new issue view—which fields appear and the order they appear in—open an issue and choose configure at the bottom-right",
      type: "feature",
      priority: "medium",
    },

    {
      column: "done",
      name: "Apprearence is broken",
      description:
        "Your fields will then appear in the issue detail view. Note that fields will only appear on an issue if they have been associated with the relevant issue type, and are not hidden.",
      type: "feature",
      priority: "high",
    },
  ],
};

if (window.localStorage.getItem("stories")) {
  const parsedStories = JSON.parse(window.localStorage.getItem("stories"));
  if (Array.isArray(parsedStories)) kanbanData.stories = parsedStories;
}

export default kanbanData;
