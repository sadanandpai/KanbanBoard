import Sticky from "./Sticky.js";

class Modal {
  constructor() {
    this.name = "";
    this.description = "";
    this.type = "task";
    this.priority = "low";
    this.column = "story";

    document.querySelector("#save").addEventListener("click", this.onSave);
    document.querySelector("#delete").addEventListener("click", this.onDelete);
    document.querySelector("#close").addEventListener("click", this.hideModal);
  }

  setModal(name = "", description = "", type = "task", priority = "low", column = "story") {
    this.name = name;
    this.description = description;
    this.type = type;
    this.priority = priority;
    this.column = column;
  }

  getModal = () => {
    return {
      name: document.getElementById("modalName").value,
      description: document.getElementById("modalDescription").value,
      type:
        (document.querySelectorAll("[name='modal-type']")[0].checked && document.querySelectorAll("[name='modal-type']")[0].id) ||
        (document.querySelectorAll("[name='modal-type']")[1].checked && document.querySelectorAll("[name='modal-type']")[1].id) ||
        (document.querySelectorAll("[name='modal-type']")[2].checked && document.querySelectorAll("[name='modal-type']")[2].id),
      priority: document.getElementById("modalPriority").value,
      column: this.column,
    };
  };

  hideModal = () => {
    document.querySelector(".eye-drop").style.display = "none";
    document.querySelector(".modal").style.display = "none";
    this.setModal();
    this.resetModalFields();
    this.sticky = null;
  };

  showModal(event, sticky) {
    document.querySelector(".eye-drop").style.display = "block";
    document.querySelector(".modal").style.display = "flex";

    document.getElementById("modalName").value = this.name;
    document.getElementById("modalDescription").value = this.description;
    document.getElementById(this.type).checked = true;
    document.getElementById("modalPriority").querySelector("[value=" + this.priority).selected = true;

    this.resetModalFields();

    if (sticky) {
      this.sticky = sticky;
      this.target = event.currentTarget;

      if (sticky.column === "done") {
        document.getElementById("modalName").disabled = true;
        document.getElementById("modalDescription").disabled = true;
        document.getElementById("modalPriority").disabled = true;
        document.getElementById("task").disabled = true;
        document.getElementById("feature").disabled = true;
        document.getElementById("bug").disabled = true;
        document.getElementById("save").style.display = "none";
        document.getElementById("delete").style.display = "none";
      } else if (sticky.column === "todo" || sticky.column === "testing") {
        document.getElementById("modalName").disabled = true;
        document.getElementById("modalDescription").disabled = true;
        document.getElementById("modalPriority").disabled = false;
        document.getElementById("task").disabled = false;
        document.getElementById("feature").disabled = false;
        document.getElementById("bug").disabled = false;
        document.getElementById("save").style.display = "block";
        document.getElementById("delete").style.display = "none";
      }
    }
    else{
      document.getElementById("delete").style.display = "none";
    }
  }

  resetModalFields(){
    document.getElementById("modalName").disabled = false;
        document.getElementById("modalDescription").disabled = false;
        document.getElementById("modalPriority").disabled = false;
        document.getElementById("task").disabled = false;
        document.getElementById("feature").disabled = false;
        document.getElementById("bug").disabled = false;
        document.getElementById("save").style.display = "block";
        document.getElementById("delete").style.display = "block";
  }

  onSave = () => {
    const modal = this.getModal();

    if(modal.name === "" || modal.description === "")
      return;

    if (this.sticky) {
      this.sticky.setSticky(modal.name, modal.description, modal.type, modal.priority, modal.column);
      this.target.querySelector(".sticky-name").textContent = this.sticky.name;
      this.target.querySelector(".sticky-description").textContent = this.sticky.description;
      this.target.querySelector(".sticky-type").className = "sticky-type " + this.sticky.type;
      this.target.querySelector(".sticky-priority").className = "sticky-priority " + this.sticky.priority;
    } else {
      const sticky = new Sticky(modal.name, modal.description, modal.type, modal.priority);
      document.getElementById("story").appendChild(sticky.createSticky());
    }
    this.hideModal();
  };

  onDelete = () =>{
    this.target.remove();
    this.hideModal();
  }
}

export default new Modal();
