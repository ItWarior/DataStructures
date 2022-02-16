class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
        this.parrent = null
    }

    add(value) {
        if (this.value === null) {
            this.value = value
            return
        }

        if (this.value < value) {
            if (this.right) {
                this.right.add(value)
                return;
            }
            const newNode = new Node(value)
            newNode.parrent = this
            this.right = newNode
            return
        }
        if (this.value > value) {
            if (this.left) {
                this.left.add((value))
                return;
            }
            const newNode = new Node(value)
            newNode.parrent = this
            this.left = newNode
            return
        }
    }

    remove(value) {
        const identifiedNode = this.find(value)

        if (!identifiedNode) {
            throw new Error('Could not find node with that value')
        }
        //remove node which doesn't have children
        if (!identifiedNode.left && !identifiedNode.right) {
            const identifiedParent = identifiedNode.parrent
            identifiedParent.removeChild(identifiedNode)
            return
        }

        //remove node which have two children elements
        if (identifiedNode.left && identifiedNode.right) {
            const nextBiggerNode = identifiedNode.right.findNext()

            if (nextBiggerNode.value !== identifiedNode.right.value) {
                this.remove(nextBiggerNode.value)
                identifiedNode.value = nextBiggerNode.value

            } else {
                identifiedNode.value = identifiedNode.right.value
                identifiedNode.right = identifiedNode.right.right
            }

            if (identifiedNode.left) {
                identifiedNode.left.parrent = identifiedNode
            }
            if (identifiedNode.right) {
                identifiedNode.right.parrent = identifiedNode
            }
        }
        //remove node which have only one child element
        else {
            const childNode = identifiedNode.left || identifiedNode.right

            identifiedNode.left = childNode.left
            identifiedNode.right = childNode.right
            identifiedNode.value = childNode.value
        }

    }

    findNext() {
        if (!this.left) {
            return this
        }
        return this.left.findNext()
    }

    removeChild(node) {
        if (this.left && this.left === node) {
            this.left = null
            return
        }
        if (this.right && this.right === node) {
            this.right = null
            return
        }
    }

    find(value) {
        if (this.value === value) {
            return this
        }
        if (this.value < value && this.right) {
            return this.right.find(value)
        }
        if (this.value > value && this.left) {
            return this.left.find(value)
        }

        return null
    }
}

class Tree {
    constructor() {
        this.root = new Node(null)
    }

    add(value) {
        this.root.add(value)
    }

    remove(value) {
        this.root.remove(value)
    }

    find(value) {
        return this.root.find(value)
    }

}

const tree = new Tree()

tree.add(10)
tree.add(9)
tree.add(15)
tree.add(14)
tree.add(20)
tree.add(23)
tree.add(20)
tree.add(28)
tree.add(26)

console.log(tree)