import localStorageDB from 'localstoragedb';

const db = new localStorageDB('cartdb', localStorage);

export default db;
