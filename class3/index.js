
// console.log("Task 1");

// setTimeout(() => {
//     console.log("Task 2");
//     setTimeout(() => {
//         console.log("Task 3");
//     }, 2000)
// }, 4000)


// function getData() {
//     return new Promise((resolve, reject) => {
//         // Asynchronous code
//         setTimeout(() => {
//             resolve("Code excuted... 6 second delay");
//         }, 6000)
//     });
// }

// console.log("Task 1");

// getData()
// .then((val) => {
//     console.log(val);
//     console.log("Take 3");
// });

function orderFood() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Food ordered");
        }, 2000);
    });
}

function prepareFood() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Food prepared");
        }, 3000);
    });
}

function deliverFood() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Food delivered");
        }, 1000);
    });
}

const { error } = require("console");
// orderFood()
//     .then((val) => {
//         console.log(val);
//         return prepareFood();
//     })
//     .then((val) => {
//         console.log(val);
//         return deliverFood();
//     })
//     .then((val) => {
//         console.log(val);
//     })
//     .catch((err) => {
//         console.error(err);
//     });

// async function foodShop() {
//     const data = await orderFood();
//     console.log(data);
    
//     const processresult = await prepareFood();
//     console.log(processresult);
    
//     const deliverResult = await deliverFood();
//     console.log(deliverResult);
    
// }

// foodShop();


const fs = require("fs")

fs.readFile("example.txt", "utf-8", (err, data) => {
    if(err) {
        throw error;
    }
    console.log(data);
})
