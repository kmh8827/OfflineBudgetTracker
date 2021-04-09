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

const saveRecord = (record) => {

};

const checkDatabase = () => {

};

window.addEventListener('online', checkDatabase);