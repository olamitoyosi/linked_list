class Node {

    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
        }  

}



class LinkedList {

    constructor() {
        this.head = null
        this.size = 0;

    }

    append(value) {
        let newNode = new Node(value);
        if (this.head === null) {
            this.head = newNode;
            return;
        } else {
            let current = this.head;
            while (current.nextNode !== null) {
                current = current.nextNode;
            }

            current.nextNode = newNode;
        }          
        
        this.size++;
    }

    prepend(value) {
        //so i am finna move everything to move tio the next
        const newNode = new Node(value, this.head);
        this.head = newNode;
        this.size++;
        
    }

    size() {
        return this.size;
    }

    head() {
        return this.head;
    }

    tail() {
        //last element in list - else return undefined.
        if (this.head === null) return null;

        let current = this.head;
        while (current.nextNode !== null) {
            current = current.nextNode;
        }
        return current;
    }

    at(index) {
        if (index < 0 || index >= this.listSize) return null;

        let current = this.head;
        let count = 0;

        while (count < index) {
            current = current.nextNode;
            count++;
        }
    }

    pop() {
        if (this.head === null) return null;

        if (this.head.nextNode === null) {
            this.head = null;
            this.listSize--;
            return;
        }

        let current = this.head;
        while (current.nextNode.nextNode !== null) {
            current = current.nextNode;
        }

        current.nextNode = null;
        this.listSize--;
    }

    contains(value) {
        let current = this.head;

        while(current !== null) {
            if (current.value === value) {
                return true;
            }
            current = current.nextNode;
        }
        return false;
    }

    findIndex(value) {
        //returns index of node
        let current = this.head;
        let index = 0;

        while(current !== null) {
            if(current.value === value) {
                return index
            }
            current = current.nextNode;
            index++;
        }
        return null;
    }

    toString() {
        //represents linkedList as strings 
        let current = this.head;
        let result = "";

        while (current !== null) {
            result += ` (${current.value} ) -> `;
            current = current.nextNode;
        }
        result += "null";
        return result;
    }

    print() {
        //prints the list in a readable format.
        console.log(this.toString());
    }
}


    
    
}
