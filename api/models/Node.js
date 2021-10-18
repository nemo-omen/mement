export class Node {
  type;
  parent;
  children;
  constructor(type, parent, children) {
    this.type = type;
    this.parent = parent;
    this.children = children;
  }
}