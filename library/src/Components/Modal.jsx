import { useState, useEffect } from "react"

function Modal({ setshowModal, setLibitem, addBook, updateBook, editingBook }){

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [urgency, setUrgency] = useState("");
    const [read, setRead] = useState(false);


    useEffect(() => {
        if(editingBook){
            setTitle(editingBook.title);
            setAuthor(editingBook.author);
            setUrgency(editingBook.urgency);
            setRead(editingBook.read);
        }else{
            setTitle("");
            setAuthor("");
            setUrgency("");
            setRead(false);
        }

    }, [editingBook])
    const closeModal = async() => {
        setshowModal(false)
    }

    const saveModal = async () => {
        if (!title.trim() || !author.trim() || !urgency.trim()) {
            alert("Please fill in all required fields (Title, Author, Urgency)");
            return;
        }
        const book = {
            title: title,
            author: author,
            urgency: urgency,
            read: read,
        }
        try{
            if(editingBook){
                const updatedBook = { ...editingBook, ...book};
                await updateBook(updatedBook);
            }else{
                await addBook(book);
                setLibitem(prevBooks => [...prevBooks, book]);
                
            }
            setshowModal(false);
            
        }catch(err){
            console.error("error adding book:", err);
        }

    }
    return(
        <div className="fixed inset-0 bg-black bg-black/50 flex justify-center items-center z-[1000]">
            <div className="bg-white rounded-md w-[90%] max-w-[1000px] max-h-[90vh] overflow-y-auto shadow-[0_5px_15px_rgba(0,0,0,0.3)] flex flex-col p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    {editingBook ? 'Edit Book' : 'Add New Book'}
                </h2>
                <div className="mb-4">
                    <label htmlFor="book-title" className="block mb-2 font-medium text-gray-700">Title:</label>
                    <input
                        type="text"
                        id="book-title"
                        className="w-full px-2.5 py-2.5 border border-gray-300 rounded text-sm"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="book-author" className="block mb-2 font-medium text-gray-700">author:</label>
                    <input
                        type="text"
                        id="book-author"
                        className="w-full px-2.5 py-2.5 border border-gray-300 rounded text-sm"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="book-urgency" className="block mb-2 font-medium text-gray-700">Urgency:</label>
                    <input
                        type="text"
                        id="book-urgency"
                        className="w-full px-2.5 py-2.5 border border-gray-300 rounded text-sm"
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="book-read" className="block mb-2 font-medium text-gray-700">Read:</label>
                    <input
                        type="checkbox"
                        id="book-read"
                        className="border border-gray-300 rounded text-sm"
                        checked={read}
                        onChange={(e) => setRead(e.target.checked)}
                    />
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                            Close
                    </button>
                    <button
                        onClick={saveModal}
                        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-sm hover:bg-blue-600 transition-colors">
                            Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;