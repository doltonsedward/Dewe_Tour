const rootReducer = (state, action) => {
    if (action.type === 'INCREMENT') {
        return {...state}
    }
    return state
}

export default rootReducer;