let db;

const request = indexedDB.open('budget', 1);

request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore('pending', { autoIncremenet: true });
};

request.onsuccess = (event) => {
    db = event.target.result;

    if (navigator.onLine) checkDatabase();
}

request.onerror = (event) => {
    console.log('Error! ' + event.target.errorCode);
}

const saveRecord = (record) => {
    const transaction = db.transaction(['pending'], 'readwrite');
    const store = transaction.objectStore('pending');

    store.add(record);
};

const checkDatabase = () => {

};

window.addEventListener('online', checkDatabase);