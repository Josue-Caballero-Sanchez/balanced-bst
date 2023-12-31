class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree{
    constructor(array){
        this.root = this.buildTree(array, 0, array.length-1);
    }

    buildTree(array, start, end){
        if(start > end){
            return null;
        }

        let mid = parseInt((start + end)/2);
        let root = new Node(array[mid]);
        root.left = this.buildTree(array, start, mid-1);
        root.right = this.buildTree(array, mid+1, end);

        return root;
    }

    insert(value, root){
        if(root === null ){
            root = new Node(value);
            return root;
        }

        if(value < root.data){
            root.left = this.insert(value, root.left);
        }
        else if(value > root.data){
            root.right = this.insert(value, root.right);
        }

        return root;
    }

    delete(value, root){
        if(root === null){
            return null;
        }

        if(value < root.data){
            root.left = this.delete(value, root.left);
        }
        else if(value > root.data){
            root.right = this.delete(value, root.right);
        }

        else{
            if(root.left === null){
                return root.right;
            }
            else if(root.right === null){
                return root.left;
            }
            
            else{
                let minData = function findNextSmallest(root){
                    let min = root.data;
                    let newRoot = root;

                    while(newRoot.left !== null){
                        min = root.left.data;
                        newRoot = root.left;
                    }

                    return min;
                }

                root.data = minData(root.right);
                root.right = this.delete(root.data, root.right);
            }
        }

        return root;
    }

    find(value, root){
        if(root === null || root.data === value){
            return root;
        }

        if(value < root.data){
            return this.find(value, root.left);
        }
        return this.find(value, root.right);
    }

    levelOrder(root, arr = [], queue = []){
        if(root === null){
            return; 
        }

        arr.push(root.data);

        queue.push(root.left);
        queue.push(root.right);

        while(queue.length){
            let level = queue[0];
            queue.shift();
            this.levelOrder(level, arr, queue)
        }

        return arr;
    }

    inorder(root, arr = []){
        if(root === null){
            return;
        }

        if(root.left){
            this.inorder(root.left, arr);
        }

        arr.push(root.data);

        if(root.right){
            this.inorder(root.right, arr);
        }

        return arr;
    }

    preorder(root, arr = []){
        if(root === null){
            return;
        }

        arr.push(root.data);

        if(root.left){
            this.preorder(root.left, arr);
        }

        if(root.right){
            this.preorder(root.right, arr);
        }

        return arr;
    }

    postorder(root, arr = []){
        if(root === null){
            return;
        }

        if(root.left){
            this.postorder(root.left, arr);
        }
        if(root.right){
            this.postorder(root.right, arr);
        }

        arr.push(root.data);

        return arr;
    }

    height(root){
        if(root === null){
            return 0;
        }
        let lheight = this.height(root.left);
        let rheight = this.height(root.right);

        if(lheight > rheight){
            return lheight +1;
        }
        else{
            return rheight +1;
        }
    }

    depth(node, root, depth = 0){
        if(root === null || node === null){
            return;
        }

        if(node === root){
            return depth;
        }
        if(node.data < root.data){
            return this.depth(node, root.left, depth+= 1);
        }
        else{
            return this.depth(node, root.right, depth+= 1);
        }
    }

    isBalanced(root){
        let lheight = this.height(root.left);
        let rheight = this.height(root.right);
        let diff = Math.abs(lheight - rheight);
        if(diff < 2){
            return true;
        }
        return false;
    }

    rebalance(root){
        let arr = this.levelOrder(root, [], []);
        arr.sort((a, b) => a-b);
        return this.root = this.buildTree(arr, 0, arr.length -1);
    }
}