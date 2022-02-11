class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }
    prepend(value) {
        const newNode = {value, next: this.head};

        this.head = newNode
        if (!this.tail) {
            this.tail = newNode
        }
    }
    append(value) {
        let newNode = {value, next: null};

        if (this.tail) {
            this.tail.next = newNode
        }

        this.tail = newNode

        if (!this.head) {
            this.head = newNode
        }
    }
    insertAfter(value, afterValue){
        const foundNode = this.find(afterValue);

        if (foundNode){
            foundNode.next = {value, next:foundNode.next}
            return this.toArr()
        }

        return null
    }
    delete(value) {
        if (!this.head) {       //пеервіряємо чи у списку щось є
            return;
        }

        while (this.head && this.head.value === value) { // перевірємо чи перший елемент співпадає
            this.head = this.head.next                  // використовуємо while бо наступний елемент
        }                                               // теж може співпадати

        let currentNode = this.head;

        while (currentNode.next) {                     //пробігаємось через цикл
            if (currentNode.next.value === value) {    //і шукаємо співпадіння в середині списку
                currentNode.next = currentNode.next.next
            } else {
                currentNode = currentNode.next
            }

        }

        if (this.tail.value === value) {            //перевіряємо останній елемент
            this.tail.value = currentNode
            return
        }
    }



    toArr() {
        let nodes = [];
        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next
        }

        return nodes
    }
    find(value){
        if (!this.head){
            return null
        }

        let currentNode = this.head     ;

        while(currentNode){
            if (currentNode.value === value){
                return currentNode
            }
            currentNode = currentNode.next
        }
        return null
    }
}


let link = new LinkedList();
link.append('one')
link.append('two')
link.append('three')
link.append('four')
link.append('two')
link.append('five')

console.log(link.insertAfter('test', 'four'))




