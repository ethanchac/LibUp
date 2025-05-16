function Modal({ setshowModal }){
    const closeModal = async() => {
        setshowModal(false)
    }

    const saveModal = async () => {

    }
    return(
        <div className="fixed inset-0 bg-black bg-black/50 flex justify-center items-center z-[1000]">
            <div className="bg-white rounded-md w-[90%] max-w-[1000px] max-height-[90vh] overflow-y-auto shadow-[0_5px_15px_rgba(0,0,0,0.3)] flex flex-col">
                <div className="block mb-2 font-medium text-gray-700">
                    <label htmlFor="book-title">Title:</label>
                </div>
                <div className="w-full px-2.5 py-2.5 border border-gray-300 rounded text-sm">
                    <input
                        type="text"
                        id="book-title"
                    />
                </div>
                <div className="block mb-2 font-medium text-gray-700">
                    <label htmlFor="book-author">author:</label>
                </div>
                <div className="w-full px-2.5 py-2.5 border border-gray-300 rounded text-sm">
                    <input
                        type="text"
                        id="book-author"
                    />
                </div>
                <div className="block mb-2 font-medium text-gray-700">
                    <label htmlFor="book-urgency">Urgency:</label>
                </div>
                <div className="w-full px-2.5 py-2.5 border border-gray-300 rounded text-sm">
                    <input
                        type="text"
                        id="book-urgency"
                    />
                </div>
                <div className="block mb-2 font-medium text-gray-700">
                    <label htmlFor="book-read">Read:</label>
                </div>
                <div className="w-full px-2.5 py-2.5 border border-gray-300 rounded text-sm">
                    <input
                        type="text"
                        id="book-read"
                    />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 hover:bg-gray-300 transition">
                            Close
                    </button>
                    <button
                        onClick={saveModal}
                        className="px-4 py-2 hover:bg-gray-300 transition">
                            Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;