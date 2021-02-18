function indexOf(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return i;
        }
    }

    return -1;
}

function binarySearch(arr, value, start = 0, end = 0) {
    if (start > end) {
        return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = arr[index];

    console.log(start, end);

    if (item === value) {
        return index;
    } else if (item < value) {
        return binarySearch(arr, value, index + 1, end);
    } else if (item > value) {
        return binarySearch(arr, value, start, index - 1);
    }
}

class _Node {
    constructor(data, next) {
        this.value = data;
        this.next = next;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    enqueue(data) {
        const node = new _Node(data);
        if (this.first === null) {
            this.first = node;
        }
        if (this.last) {
            this.last.next = node;
        }

        this.last = node;
    }

    dequeue() {
        if (this.first === null) {
            return;
        }
        const node = this.first;
        this.first = this.first.next;

        return node.value;
    }
}


class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        if (this.key === null) {
            this.key = key;
            this.value = value;
        } else if (key < this.key) {

            if (this.left === null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            else {
                this.left.insert(key, value);
            }
        } else {
            if (this.right === null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }

    find(key) {
        if (this.key === key) {
            return this.value;
        }

        else if (key < this.key && this.left) {
            return this.left.find(key);
        }

        else if (key > this.key && this.right) {
            return this.right.find(key);
        }

        else {
            throw new Error('Key Error');
        }
    }

    remove(key) {
        if (this.key === key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            else if (this.left) {
                this._replaceWith(this.left);
            }
            else if (this.right) {
                this._replaceWith(this.right);
            }
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            } else if (this == this.parent.right) {
                this.parent.right = node;
            }
            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            } else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }

    dfsInOrder(values = []) {
        if (this.left) {
            values = this.left.dfsInOrder(values);
        }

        if (this.value) {
            values.push(this.value);
        } else {
            values.push(this.key);
        }

        if (this.right) {
            values = this.right.dfsInOrder(values);
        }

        return values;
    }

    dfsPreOrder(values = []) {
        if (this.value) {
            values.push(this.value);
        } else {
            values.push(this.key);
        }

        if (this.left) {
            values = this.left.dfsPreOrder(values);
        }

        if (this.right) {
            values = this.right.dfsPreOrder(values);
        }

        return values;
    }

    dfsPostOrder(values = []) {
        if (this.left) {
            values = this.left.dfsPostOrder(values);
        }

        if (this.right) {
            values = this.right.dfsPostOrder(values);
        }

        if (this.value) {
            values.push(this.value);
        } else {
            values.push(this.key);
        }

        return values;
    }

    bfs(tree, values = []) {
        const queue = new Queue();
        const node = tree.root;
        queue.enqueue(node);
        while (queue.length) {
            const node = queue.dequeue();
            values.push(node.value);

            if (node.left) {
                queue.enqueue(node.left);
            }

            if (node.right) {
                queue.enqueue(node.right);
            }
        }

        return values;
    }
}

function main() {
    let searchTree = new BinarySearchTree;

    searchTree.insert(25);
    searchTree.insert(15);
    searchTree.insert(50);
    searchTree.insert(10);
    searchTree.insert(24);
    searchTree.insert(35);
    searchTree.insert(70);
    searchTree.insert(4);
    searchTree.insert(12);
    searchTree.insert(18);
    searchTree.insert(31);
    searchTree.insert(44);
    searchTree.insert(66);
    searchTree.insert(90);
    searchTree.insert(22);

    console.log(searchTree.dfsPreOrder());
    console.log(searchTree.dfsInOrder());
    console.log(searchTree.dfsPostOrder());
}

main();