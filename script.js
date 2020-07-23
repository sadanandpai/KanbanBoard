import Sticky from "./components/Sticky.js";
import StoryColumn from "./components/StoryColumn.js";
import kanbanData from "./data.js";
import Modal from "./components/Modal.js";

var docFragment = document.createDocumentFragment();
for (let storyType of kanbanData.columns) {
  const storyColumn = new StoryColumn(storyType);
  const columnDiv = storyColumn.createColumn();
  columnDiv.classList.add("column-holder")
  docFragment.appendChild(columnDiv);
}
for (let stickyData of kanbanData.stories) {
  const sticky = new Sticky(stickyData.name, stickyData.description, stickyData.type, stickyData.priority, stickyData.column);
  docFragment.getElementById(stickyData.column).appendChild(sticky.createSticky());
}
document.getElementById("gridLayout").appendChild(docFragment);

//Set the darkmode is enabled
if (window.localStorage.getItem("darkMode")) {
  let darkMode = window.localStorage.getItem("darkMode") === "true" ? true : false;
  document.getElementById("darkMode").checked = darkMode;
  turnDarkModeOn(darkMode);
}

//Set the Autosave is enabled
if (window.localStorage.getItem("autosave")) {
  let autosave = window.localStorage.getItem("autosave");
  if (autosave === undefined) autosave = true;
  else autosave = autosave === "true" ? true : false;

  if (autosave) document.getElementById("autosave").checked = autosave;
}
else{
  document.getElementById("autosave").checked = true;
}

function turnDarkModeOn(darkMode = true) {
  if (!darkMode) {
    document.documentElement.style.setProperty("--main-bg-color", "#fff");
    document.documentElement.style.setProperty("--main-fg-color", "#000");
  } else {
    document.documentElement.style.setProperty("--main-fg-color", "#fff");
    document.documentElement.style.setProperty("--main-bg-color", "#000");
  }
}

//Listeners
document.getElementById("addSticky").addEventListener("click", () => {
  Modal.showModal();
});

document.getElementById("reset").addEventListener("click", () => {
  if (document.getElementById("autosave").checked) localStorage.setItem("stories", "[]");
  const stickies = document.getElementsByClassName("sticky");
  while (stickies.length) stickies[0].remove();
});

document.getElementById("darkMode").addEventListener("change", () => {
  turnDarkModeOn(event.target.checked);
});

//On close or refresh save the data to json if save is enabled
window.addEventListener("unload", () => {
  localStorage.setItem("autosave", document.getElementById("autosave").checked);
  if (!document.getElementById("autosave").checked) return;

  const stories = [];
  for (let storyType of kanbanData.columns) {
    const stickies = document.getElementById(storyType).getElementsByClassName("sticky");
    for (let sticky of stickies) {
      stories.push({
        column: storyType,
        name: sticky.querySelector(".sticky-name").textContent,
        description: sticky.querySelector(".sticky-description").textContent,
        type: sticky.querySelector(".sticky-type").classList[1],
        priority: sticky.querySelector(".sticky-priority").classList[1],
      });
    }
  }
  localStorage.setItem("stories", JSON.stringify(stories));
  localStorage.setItem("darkMode", document.getElementById("darkMode").checked);
});
