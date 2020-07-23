function createElementWithClasses(elementName, ...classes) {
  let element = document.createElement(elementName);
  classes.forEach((className) => element.classList.add(className));
  return element;
}

export { createElementWithClasses };