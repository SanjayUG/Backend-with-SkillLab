
class Stack {
    constructor() {
        this.items = [];
    }

    // Add an element to the stack
    push(element) {
        this.items.push(element);
    }

    // Remove an element from the stack
    pop() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.items.pop();
    }

    // View the top element of the stack
    peek() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.items[this.items.length - 1];
    }

    // Check if the stack is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get the size of the stack
    size() {
        return this.items.length;
    }

    // Print the stack elements
    printStack() {
        return this.items.join(" ");
    }
}

// Usage
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.printStack()); // Output: 1 2 3
console.log(stack.pop());        // Output: 3
console.log(stack.peek());       // Output: 2
console.log(stack.isEmpty());    // Output: false
console.log(stack.size());       // Output: 2
