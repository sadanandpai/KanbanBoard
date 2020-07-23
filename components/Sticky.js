import { createElementWithClasses } from "../helper.js";
import Modal from "./Modal.js";

export default class Sticky {
  constructor(name, description, type = "task", priority = "low", column = "story") {
    this.column = column;
    this.name = name;
    this.description = description;
    this.type = type;
    this.priority = priority;
  }

  setSticky(name = "", description = "", type = "task", priority = "low", column = "story") {
    this.column = column;
    this.name = name;
    this.description = description;
    this.type = type;
    this.priority = priority;
  }

  getSticky() {
    return {
      column: this.column,
      name: this.name,
      description: this.description,
      type: this.type,
      priority: this.priority,
    };
  }

  createSticky() {
    const sticky = createElementWithClasses("div", "sticky");
    const nameDiv = createElementWithClasses("div", "sticky-name");
    const descriptionDiv = createElementWithClasses("div", "sticky-description");

    const flexDiv = createElementWithClasses("div", "flex", "type-priority-arrange");
    const typeDiv = createElementWithClasses("div", "sticky-type");
    const priorityDiv = createElementWithClasses("div", "sticky-priority");
    typeDiv.classList.add(this.type);
    priorityDiv.classList.add(this.priority);
    flexDiv.appendChild(typeDiv);
    flexDiv.appendChild(priorityDiv);

    nameDiv.append(this.name);
    descriptionDiv.append(this.description);
    sticky.append(nameDiv);
    sticky.append(descriptionDiv);
    sticky.append(flexDiv);
    if (this.column !== "done") sticky.setAttribute("draggable", "true");
    sticky.addEventListener("dragstart", this.onDragStartSticky);
    sticky.addEventListener("dblclick", this.onDoubleClick);

    return sticky;
  }

  onDragStartSticky = () => {
    if (event.target.classList?.contains("sticky")) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setData("text/plain", JSON.stringify(this));
    } else event.preventDefault();
  };

  onDoubleClick = (event) => {
    Modal.setModal(this.name, this.description, this.type, this.priority, this.column);
    Modal.showModal(event, this);
    this.target = event.currentTarget;
  };
}
