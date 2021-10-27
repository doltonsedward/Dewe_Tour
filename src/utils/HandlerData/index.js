const removeData = ({name}) => {
    localStorage.removeItem(name)
}

const setData = (name, data) => {
    return localStorage.setItem(name, JSON.stringify(data))
}

export { removeData, setData }

