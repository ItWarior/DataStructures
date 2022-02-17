class TrieNode {
    constructor(value) {
        this.value = value
        this.children = Array(26)
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode(null)
    }

    insert(key, value) {
        let currentNode = this.root
        for (let i = 0; i < key.length; i++) {
            const alphabetIndex = key[i].charCodeAt(0) - 97

            if (!currentNode[alphabetIndex]) {
                const newNode = new TrieNode(null)
                currentNode.children[alphabetIndex] = newNode
            }

            currentNode = currentNode.children[alphabetIndex]
        }
        currentNode.value = value
    }
    find(key){
        let currentNode = this.root
        for (let i = 0; i < key.length; i++) {
            const alphabetIndex = key[i].charCodeAt(0) - 97

            if (!currentNode.children[alphabetIndex]){
                return false
            }
            currentNode = currentNode.children[alphabetIndex]
        }

        return currentNode
    }
    remove(key){
        const node = this.find(key)
        if (node.value === null){
            return false
        }
        node.value = null
    }
}

const trie = new Trie()

trie.insert('name', 25)
trie.insert('names', 34)




