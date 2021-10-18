import { Node } from './Node.js';

export class Directory extends Node {
  id;
  name; // unique
  owner; // user
  constructor(name, owner, parent, children = []) {
    super('directory', parent, children);
    this.name = name;
    this.owner = owner;
  }

  move(newParent) {
    this.parent = newParent;
  }

  removeChild(child) {
    this.children.filter((item) => item.id !== child.id);
  }

  addChild(child, index) {

    if(index === 0) {
      this.children.unshift(child);
    } else if(index === this.children.length) {
      this.children.push(child);
    } else {
      this.children.splice(index, 0, child);
    }

  }

  moveChild(child, index) {
    this.removeChild(child);
    this.addChild(child, index);
  }

}