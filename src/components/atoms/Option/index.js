const Option = ({item}) => {
    return <option key={item.id} value={item.id}>{item.name}</option>
}

export default Option
