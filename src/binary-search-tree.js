const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor(data) {
    this.data = data; // node value
    this.leftChild = null;  // leftChild node child reference
    this.rightChild = null; // rightChild node child reference
  }
 }

class BinarySearchTree {

  constructor(){
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    if (!data) throw new Error("Data must be provided");
    const newNode = new Node(data);
    if (!this._root){
      this._root = newNode;
    } else {
      this.insertNode(this._root, newNode)
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.leftChild === null) {
        node.leftChild = newNode;
      } else {
        this.insertNode(node.leftChild, newNode);
      }
    } else {
      if (node.rightChild === null) {
        node.rightChild = newNode;
      } else {
        this.insertNode(node.rightChild, newNode);
      }
    }
  }

  has(data) {
    if (!data) throw new Error("Data must be provided");
    return this.find(data) !== null;
  }

  find(data) {
    if (!data) throw new Error("Data must be provided");
    return this.search(this._root, data);
  }

  search(node, data) {
    switch (true) {
      case node === null:
        return null;
      case data < node.data:
        return this.search(node.leftChild, data);
      case data > node.data:
        return this.search(node.rightChild, data);
      default:
        return node;
    }
   }

  remove(data) {
    if (!data) throw new Error("Data must be provided");
    if (this.has(data)){
      this.removeNode(this._root, data);
      return true;
    } else {
      return false;
    }
  }

removeNode(node, data) {
 switch (true) {
  case node === null:
    return null;
  case data < node.data:
    node.leftChild = this.removeNode(node.leftChild, data);
    return node;
  case data > node.data:
    node.rightChild = this.removeNode(node.rightChild, data);
    return node;
  default:
    if (node.leftChild === null && node.rightChild === null) {
      node = null;
      return node;
    }
    if (node.leftChild === null) {
      node = node.rightChild;
      return node;
    } else if(node.rightChild === null) {
      node = node.leftChild;
      return node;
    }
    let newNode = this.minNode(node.rightChild);
    node.data = newNode.data;
    node.rightChild = this.removeNode(node.rightChild, newNode.data);
    return node;
 }
}


  min() {
    if (!this._root) throw new Error("Tree is empty");
    let minimalNode = this.minNode(this._root);
    return minimalNode.data;
  }

  minNode(node) {
    if (node.leftChild === null)
        return node;
    else
        return this.minNode(node.leftChild);
  }

  max() {
    if (!this._root) throw new Error("Tree is empty");
    let maximumNode = this.maxNode(this._root);
    return maximumNode.data;
  }

  maxNode(node) {
    if (node.rightChild === null)
        return node;
    else
        return this.maxNode(node.rightChild);
  }
}

module.exports = {
  BinarySearchTree
};