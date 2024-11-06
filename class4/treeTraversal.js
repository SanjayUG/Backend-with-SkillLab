console.log("Enter node values separated by spaces:");

// Listen for data from standard input
process.stdin.on("data", (data) => {
  const values = data.toString().trim().split(" ").map(Number);

  // Build the binary tree
  let root = null;
  for (const value of values) {
    root = insertNode(root, value);
  }

  // Perform traversals and display results
  console.log("Inorder Traversal:", inorderTraversal(root).join(" "));
  console.log("Preorder Traversal:", preorderTraversal(root).join(" "));
  console.log("Postorder Traversal:", postorderTraversal(root).join(" "));

  process.exit(); // Exit after processing input
});

// Define the TreeNode class
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Function to insert a value into the binary tree
function insertNode(root, value) {
  if (root === null) {
    return new TreeNode(value);
  }

  if (value < root.value) {
    root.left = insertNode(root.left, value);
  } else {
    root.right = insertNode(root.right, value);
  }
 
  return root;
}

// Traversal methods
function inorderTraversal(node, result = []) {
  if (node !== null) {
    inorderTraversal(node.left, result);
    result.push(node.value);
    inorderTraversal(node.right, result);
  }
  return result;
}

function preorderTraversal(node, result = []) {
  if (node !== null) {
    result.push(node.value);
    preorderTraversal(node.left, result);
    preorderTraversal(node.right, result);
  }
  return result;
}

function postorderTraversal(node, result = []) {
  if (node !== null) {
    postorderTraversal(node.left, result);
    postorderTraversal(node.right, result);
    result.push(node.value);
  }
  return result;
}
