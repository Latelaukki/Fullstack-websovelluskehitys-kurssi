const PersonFilter = ({ filterString, handleFilterString }) => {
    return (
      <div>
        filter shown with
        <input
        value={filterString}
        onChange={handleFilterString}
        />
      </div>
    )
  }
  
export default PersonFilter