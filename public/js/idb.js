//create variable to hold connection
let db;

//establish a connection to IndexedDB
const request = indexedDB.open('budget_tracker', 1);

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    //save a reference to db
    const db = event.target.result;
    //create an oject store (table)
    db.createObjectStore('new_transaction', { autoIncrement: true})
};

request.onsuccess = function(event) {
    db = event.target.result;

    //check if app is online 
    if (navigator.onLine) {
        //uploadTransaction();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
}

function saveRecord(record) {
    //new transaction with read write permissions
    const transaction = db.transaction(['new_transaction'], 'readwrite');

    //access the object store
    const budgetObjectStore = transaction.objectStore('new_transaction');

    //add record to store 
    budgetObjectStore.add(record);
}

