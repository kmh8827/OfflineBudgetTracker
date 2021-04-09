let db;

const request = indexedDB.open('budget', 1);

request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore('pending', { autoIncremenet: true });
};

const saveRecord = (record) => {

};

const checkDatabase = () => {

};

window.addEventListener('online', checkDatabase);