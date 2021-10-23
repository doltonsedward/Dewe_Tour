const setData = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data))
}

export { setData }
