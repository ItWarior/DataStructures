class Node {
    constructor(value, parentNode = null) {
        this.value = value
        this.parentNode = parentNode
        this.children = []
    }

    addNode(value) {
        const segments = value.split('/')

        if (segments.length === 0) {
            return
        }
        if (segments.length === 1) {
            const node = new Node(segments[0], this)
            this.children.push(node)
            return {node, index: this.children.length - 1}
        }

        const existingChildNode = this.children.find(child => child.value === segments[0])

        if (existingChildNode) {
            existingChildNode.addNode(segments.slice(1).join('/'))
        } else {
            const node = new Node(segments[0], this)
            node.addNode(segments.slice(1).join('/'))
            this.children.push(node)
            return {node, index: this.children.length - 1}
        }

    }

    removeNode(path) {
        const segments = path.split('/')

        if (segments.length === 0) {
            return
        }

        if (segments.length === 1) {
            const existingNodeIndex = this.children.findIndex((child => child.value === segments[0]))

            if (existingNodeIndex < 0) {
                throw new Error('Could not find matching values')
            }
            this.children.splice(existingNodeIndex, 1)
        }
        if (segments.length > 1) {
            const existingChildNode = this.children.find(child => child.value === segments[0])

            if (!existingChildNode) {
                throw new Error('Could not find matching values. Path segment:' + segments[0])
            }

            existingChildNode.removeNode(segments.slice(1).join('/'))
        }
    }

    depthFind(value) {
        console.log(this)
        for (const child of this.children) {
            if (child.value === value) {
                return child
            }

            const nestedChildNode = child.depthFind(value)

            if (nestedChildNode) {
                return nestedChildNode
            }
        }
    }

    breadthFind(value) {
        console.log(this)
        for (const child of this.children) {
            if (child.value === value) {
                return child
            }
        }

        for (const child of this.children) {
            const nestedChildNode = child.breadthFind(value)

            if (nestedChildNode) {
                return nestedChildNode
            }
        }

    }

}

class Tree {
    constructor(rootValue) {
        this.root = new Node(rootValue)
    }

    add(path) {
        this.root.addNode(path)
    }

    remove(path) {
        this.root.removeNode((path))
    }

    findOne(value) {
        if (value === this.root.value) {
            return this.root
        }

        return this.root.depthFind(value)
    }

    findTwo(value) {
        if (value === this.root.value) {
            return this.root
        }

        return this.root.breadthFind(value)
    }
}

const fileSystem = new Tree('/');
fileSystem.add('documents/data/text.txt')
fileSystem.add('files')
fileSystem.add('games/cs-go')
fileSystem.add('games/kingOfRush')
fileSystem.add('games/kingOfRush/test')

console.log(fileSystem.findOne('kingOfRush'))
console.log('++++++++++++++++++++++++')
console.log(fileSystem.findTwo('kingOfRush'))

