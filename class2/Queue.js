
class Queue {
    constructor() {
        this.items = [];
    }

    // Add an element to the queue
    enqueue(element) {
        this.items.push(element);
    }

    // Remove an element from the queue
    dequeue() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.items.shift();
    }

    // View the first element in the queue
    front() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.items[0];
    }

    // Check if the queue is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get the size of the queue
    size() {
        return this.items.length;
    }

    // Print the queue elements
    printQueue() {
        return this.items.join(" ");
    }
}

// Usage
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue("RAM");
console.log(queue.printQueue()); // Output: 1 2 3
console.log(queue.dequeue());    // Output: 1
console.log(queue.front());      // Output: 2
console.log(queue.isEmpty());    // Output: false
console.log(queue.size());       // Output: 2
