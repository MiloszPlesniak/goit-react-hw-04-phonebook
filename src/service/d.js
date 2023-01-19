export const saveToStorage = (key, value) => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    } catch (error) {
        console.error("Set state error: ", error.message);
    }
};

export const getFromStorage = key => {
    try {
        const serializedState = localStorage.getItem(key);
        const value = serializedState === null ? undefined : JSON.parse(serializedState);
        return value !== null ? value : [];
    } catch (error) {
        console.error("Get state error: ", error.message);
    }
};

