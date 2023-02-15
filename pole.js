class Node { 
    
    constructor(data) {
        this.data = data;
        this.next = null;
    }

    setNextNode(node) {
        if(node instanceof Node || node === null) {
            this.next = node;
        } else {
            throw new Error('Next node must be a member of the Node class.')
        }
        this.next = node;
    }

    getNextNode() {
        return this.next;
    }
}

class LinkedList {

    constructor(){
        this.head = null;
    }

    addToHead(data) {
        const newHead = new Node(data);
        const currentHead = this.head;
        this.head = newHead;
        this.head.setNextNode(currentHead);
    }

    removeHead() {
        const removedHead = this.head;
        if(!removedHead) {
            return;
        }
        this.head = removedHead.getNextNode();
        return removedHead.data;
    }
}

class Pole {

    constructor(size = 0) {
        this.stack = new LinkedList();
        this.size = size;
    }

    push(data) {
        this.stack.addToHead(data);
        this.size++;
    }

    pop() {
        this.size--;
        return this.stack.removeHead();
    }

    peek() {
        if(this.isEmpty()) return 8;
        return this.stack.head.data;
    }

    peek2() {
        if(this.isEmpty()) return;
        return this.stack.head.data;
    }

    isBigger(data, toHead) {
        return data > toHead;
    }

    isEmpty() {
        return this.size === 0;
    }
}

export default Pole;