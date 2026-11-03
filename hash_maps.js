class HashMap {
    constructor(capacity = 16, loadFactor = 0.75) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = new Array(this.capacity);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode % this.capacity;
    }

    set(key, value) {
        const index = this.hash(key);

        if (!this.buckets[index]) {
            this.buckets[index] = { key, value, next: null };
        } else {
            let current = this.buckets[index];

            while (current) {
                if (current.key === key) {
                    current.value = value;
                    return;
                }
                current = current.next;
            }

            const newNode = { key, value, next: this.buckets[index] };
            this.buckets[index] = newNode;
        }

        // Check if load factor is exceeded, then resize
        if (this.length() / this.capacity > this.loadFactor) {
            this.resize();
        }
    }

    // --- NEW: RESIZE METHOD ---
    resize() {
        const oldBuckets = this.buckets;
        
        // Double the capacity
        this.capacity *= 2;
        
        // Create a fresh, larger array of buckets
        this.buckets = new Array(this.capacity);

        // Re-hash all old items into the new buckets
        for (let i = 0; i < oldBuckets.length; i++) {
            let current = oldBuckets[i];
            while (current) {
                // Re-insert using the standard set logic (which will use the new capacity)
                this.set(current.key, current.value);
                current = current.next;
            }
        }
    }

    get(key) {
        const index = this.hash(key);
        let current = this.buckets[index];

        while (current) {
            if (current.key === key) {
                return current.value;
            }
            current = current.next;
        }

        return null;
    }

    has(key) {
        return this.get(key) !== null;
    }

    // --- FIXED: PROPER LINKED LIST REMOVAL ---
    remove(key) {
        const index = this.hash(key);
        let current = this.buckets[index];
        let previous = null;

        while (current) {
            if (current.key === key) {
                if (previous === null) {
                    // It's the first node in the bucket
                    this.buckets[index] = current.next;
                } else {
                    // Bypass the current node
                    previous.next = current.next;
                }
                return true; // Successfully removed
            }
            previous = current;
            current = current.next;
        }

        return false; // Key not found
    }

    length() {
        let count = 0;
        for (let i = 0; i < this.capacity; i++) {
            let current = this.buckets[i];
            while (current) {
                count++;
                current = current.next;
            }
        }
        return count;
    }

    clear() {
        this.buckets = new Array(this.capacity);
    }

    keys() {
        const keysArray = [];
        for (let i = 0; i < this.capacity; i++) {
            let current = this.buckets[i];
            while (current) {
                keysArray.push(current.key);
                current = current.next;
            }
        }
        return keysArray;
    }

    values() {
        const valuesArray = [];
        for (let i = 0; i < this.capacity; i++) {
            let current = this.buckets[i];
            while (current) {
                valuesArray.push(current.value);
                current = current.next;
            }
        }
        return valuesArray;
    } 

    entries() {
        const entriesArray = [];
        for (let i = 0; i < this.capacity; i++) {
            let current = this.buckets[i];
            while (current) {
                entriesArray.push([current.key, current.value]);
                current = current.next;
            }
        }
        return entriesArray;
    } 
}