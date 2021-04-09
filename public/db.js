let db;
const request = indexedDB.open('budget', 1);

request.onupgradeneeded = event => {
  console.log('creatingPendingObject');
  const db = event.target.result;
  const pendingStore = db.createObjectStore('pending', { keyPath: 'pendingStatus', autoIncrement: true });
  pendingStore.createIndex('pendingIndex', 'pendingStatus');
};

request.onsuccess = (event) => {
  db = event.target.result;

  if (navigator.onLine) checkDatabase();
};

request.onerror = (event) => {
  console.log(event);
};

const saveRecord = (record) => {
  const db = request.result;
  const transaction = db.transaction(['pending'], 'readwrite');
  const pendingStore = transaction.objectStore('pending');

  pendingStore.add(record);
};

const checkDatabase = ()  => {
  const db = request.result;
  const transaction = db.transaction(['pending'], 'readwrite');
  const pendingStore = transaction.objectStore('pending');
  const getAll = pendingStore.getAll();

  getAll.onsuccess = () => {
    console.log('Get all results ' + JSON.stringify(getAll.result));
    if (getAll.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then(() => {
          const db = request.result;
          const transaction = db.transaction(['pending'], 'readwrite');
          const pendingStore = transaction.objectStore('pending');

          pendingStore.clear();
        });
    }
  };
}

window.addEventListener('online', checkDatabase);