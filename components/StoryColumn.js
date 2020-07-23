import Sticky from "./Sticky.js";
import { createElementWithClasses } from "../helper.js";

// static variable to check if drop is successful after dragging.
var dropSuccess = false;

export default class StoryColumn {
  constructor(name) {
    this.name = name;
  }

  createColumn() {
    const div = createElementWithClasses('div');
    const titleDiv = createElementWithClasses("div", "title");
    const column = createElementWithClasses("div", "flex-column", "story-column");
    column.setAttribute("id", this.name);
    titleDiv.append(this.name.toUpperCase());
    div.append(titleDiv);
    div.append(column);
    this.column = column;

    titleDiv.addEventListener("click", this.onSort);
    column.addEventListener("drop", this.onDropSticky);
    column.addEventListener("dragover", () => {
      event.preventDefault();
    });
    column.addEventListener("dragend", this.onDragEndSticky);

    return div;
  }

  onSort = () => {
    this.column.style.flexDirection = this.column.style.flexDirection === "column-reverse" ? "column" : "column-reverse";
    this.column.style.justifyContent = this.column.style.justifyContent === "flex-end" ? "flex-start" : "flex-end";
  };

  onDropSticky = () => {
    event.preventDefault();

    if (this.column.id === "story") return;
    try{
      let object = JSON.parse(event.dataTransfer.getData("text/plain"));
      if(object.column === "done")
        return;
    }
    catch(e){return;}

    if (this.column.id === "story") return;

    try {
      dropSuccess = true;
      const stickyData = JSON.parse(event.dataTransfer.getData("text/plain"));
      const sticky = new Sticky(stickyData.name, stickyData.description, stickyData.type, stickyData.priority, this.column.id);
      event.currentTarget.append(sticky.createSticky());
      setTimeout(() => {
        this.column.classList.remove("transition-affect-on");
      }, 1000);
      this.column.classList.add("transition-affect-on");
    } catch (e) {}
  };

  onDragEndSticky = () => {
    if (event.target.classList?.contains("sticky") && event.dataTransfer.dropEffect !== "none") {
      if (dropSuccess) {
        event.target.remove();
        dropSuccess = false;
      }
    }
  };
}
