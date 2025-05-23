import Sidebar from "./Sidebar";
import Home from "./Home";
import Modal from "./Modal"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Layout(){
    const [showModal, setshowModal] = useState(false);
    const [libitem, setLibitem] = useState([]);
    const [editingBook, seteditingBook] = useState(null);

    useEffect(() => {
        fetchLibraryItems();
    }, []);

    const fetchLibraryItems = () => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/api/auth/user/me', {
            headers: {Authorization: `Bearer ${token}`},
        })
        .then((res) => {
            setLibitem(res.data.libraryItems);
        })
        .catch(err => {
            console.error("error fetching library", err);
        })
    }

    const addBook = async (bookData) => {
        const token = localStorage.getItem('token');
        try{
            await axios.post(
                'http://localhost:5000/api/auth/user/add-book',
                { book: bookData },
                {headers: {Authorization: `Bearer ${token}`}}
            );
            fetchLibraryItems();

            return true;
        }catch(err){
            console.error("error adding book", err);
            throw err;
        }
        
    }

    const updateBook = async (updatedBookData) => {
        const token = localStorage.getItem('token');
        try{
            await axios.put(
                `http://localhost:5000/api/auth/user/update-book/${updatedBookData._id}`,
                { book: updatedBookData },
                {headers: {Authorization: `Bearer ${token}`}}
            );
            fetchLibraryItems();
            return true;
        }catch(err){
            console.log("error updating book");
            throw err;
        }
    }

    return (
        <div className="h-screen flex flex-row">
            <div className="flex-[0_0_10%] bg-gray-200 h-full">
                <Sidebar setshowModal={setshowModal} seteditingBook={seteditingBook}/>
            </div>
            <div className="flex-[0_0_90%] bg-gray-200 h-full">
                <Home libitem={libitem} setshowModal={setshowModal} seteditingBook={seteditingBook}/>
            </div>
            {showModal && <Modal setshowModal={setshowModal} setLibitem={setLibitem} addBook={addBook} updateBook={updateBook} editingBook={editingBook}/>}

        </div>
    );
}
export default Layout;