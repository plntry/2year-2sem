const BooksForm = ( {onSubmit, valueName, onChangeName, valueNumber, onChangeNumber} ) => {
    return <>
        <h2>Add a new</h2>
        <form onSubmit={onSubmit}>
            <div>
                name of book: <input value={valueName} onChange={onChangeName} />
            </div>
            <div>
                number of pages: <input value={valueNumber} onChange={onChangeNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
      </form>
    </>
    
}

export default BooksForm