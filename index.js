import { Tree } from "./balanced-bst.js";

let array = [1, 2, 3, 4, 5];
let tree = new Tree(array);

tree.insert(6, tree.root);

tree.delete(10, tree.root);

console.log(tree.root.left.right.data);
console.log(tree.depth(tree.root.left.right, tree.root));
console.log(tree.isBalanced(tree.root));
console.log(tree.levelOrder(tree.root));
console.log(tree.inorder(tree.root));
console.log(tree.preorder(tree.root));
console.log(tree.postorder(tree.root));
tree.rebalance(tree.root);