const NewBlogForm = ({ newTitle, newAuthor, newUrl, handleSubmit, handleTitleChange, handleAuthorChange, handleUrlChange}) =>
<>
  <form onSubmit={handleSubmit}>
    <div>
      title
      <input 
        type="text"
        value={newTitle}
        name="title"
        onChange={handleTitleChange}
      />
    </div>
    <div>
      author
      <input 
        type="text"
        value={newAuthor}
        name="author"
        onChange={handleAuthorChange}
      />
    </div>
    <div>
      url
      <input 
        type="text"
        value={newUrl}
        name="url"
        onChange={handleUrlChange}
      />
    </div>
    <button type="submit">create</button>        
  </form>
</>
export default NewBlogForm