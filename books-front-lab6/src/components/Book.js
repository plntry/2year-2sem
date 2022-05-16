const Book = ({ book, removeBook }) => {
  return <>
    <p>
      {book.name} {book.number}
      <button onClick={()=>removeBook(book.id)}>delete</button>
    </p>
  </>
 }

export default Book