const NewPersonForm = ({ newName, newNumber, handleSubmit, handleNameChange, handleNumberChange, }) => {
    return (
      <div>
        <h2>add a new</h2>
        <form onSubmit={handleSubmit}>
          name:
          <input 
          value={newName}
          onChange={handleNameChange}/>
          <div>
            number:
            <input 
            value={newNumber}
            onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
  }

export default NewPersonForm  