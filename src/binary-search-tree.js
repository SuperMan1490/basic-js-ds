const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class Node {
  constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
      this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = this._addNode(this.rootNode, data);
  }

  _addNode(node, data) {
    if (!node) {
      return new Node(data);
    }

    if (data < node.data) {
      node.left = this._addNode(node.left, data);
    } else if (data > node.data) {
      node.right = this._addNode(node.right, data);
    }

    return node;
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    return this._findNode(this.rootNode, data);
  }

  _findNode(node, data) {
    if (!node) {
      return null;
    }

    if (data === node.data) {
      return node;
    }

    if (data < node.data) {
      return this._findNode(node.left, data);
    } else {
      return this._findNode(node.right, data);
    }
  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }

  _removeNode(node, data) {
    if (!node) {
      return null;
    }

    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    } else {
      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      let minFromRight = this._findMin(node.right);
      node.data = minFromRight.data;
      node.right = this._removeNode(node.right, minFromRight.data);
      return node;
    }
  }

  min() {
    const minNode = this._findMin(this.rootNode);
    return minNode ? minNode.data : null;
  }

  _findMin(node) {
    while (node && node.left) {
      node = node.left;
    }
    return node;
  }

  max() {
    const maxNode = this._findMax(this.rootNode);
    return maxNode ? maxNode.data : null;
  }

  _findMax(node) {
    while (node && node.right) {
      node = node.right;
    }
    return node;
  }
}

module.exports = {
  BinarySearchTree,
};
