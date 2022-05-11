
const StorageUtil = {
    loalStorageSet: (key, value) => {
        if (!key) return;
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        window.localStorage.setItem(key, value);
    },
    loalStorageGet: (key) => {
        if (!key) return;
        return window.localStorage.getItem(key);
    },
    loalStorageRemove: (key) => {
        if (!key) return;
        window.localStorage.removeItem(key);
    },
    sessionStorageSet: (key, value) => {
        if (!key) return;
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        window.sessionStorage.setItem(key, value)
    },
    sessionStorageGet: (key) => {
        if (!key) return;
        return window.sessionStorage.getItem(key)
    },
    sessionStorageRemove: (key) => {
        if (!key) return;
        window.sessionStorage.removeItem(key)
    }
}

export default StorageUtil