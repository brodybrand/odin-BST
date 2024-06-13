const createNode = (data, left = null, right = null) => {
  return { data, left, right };
};

const Tree = (arr) => {
  const buildTree = (arr) => {
    let sortedArr = [...new Set(arr)].sort((a, b) => a - b);

    if (sortedArr.length < 1) {
      return null;
    }

    let middle = Math.floor(sortedArr.length / 2);
    let node = createNode(sortedArr[middle]);

    let leftArr = sortedArr.slice(0, middle);
    let rightArr = sortedArr.slice(middle + 1);

    node.left = buildTree(leftArr);
    node.right = buildTree(rightArr);

    return node;
  };

  const find = (value, root = buildTree(arr)) => {
    // base case 1 - found
    if (root.data === value) {
      console.log(root);
      return root;
    }
    // base case 2 - not found
    if (!root.left && !root.right && !root.data === value) {
      return null;
    }
    if (value < root.data) {
      find(value, root.left);
    }
    if (value > root.data) {
      find(value, root.right);
    }
  };

  const insert = (value, root = buildTree(arr)) => {
    let node = createNode(value);

    if (value < root.data) {
      if (!root.left) {
        root.left = node;
      } else {
        insert(value, root.left);
      }
    } else {
      if (!root.right) {
        root.right = node;
      } else {
        insert(value, root.right);
      }
    }
    return root;
  };

  const deleteItem = (value, root = buildTree(arr)) => {
    if (value === root.data) {
      if (!root.left || !root.right) {
        root = null;
      }
      return root;
    }
  };

  return { buildTree, insert, deleteItem, find };
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const sortedTestArr = [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345];
// middle =>
let myTree = Tree(testArr).buildTree(testArr);
findTree = Tree(testArr).find(23);
console.log(findTree);
prettyPrint(myTree);

// myTree.insert(10)
