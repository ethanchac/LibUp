import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Home({ libitem, setshowModal, seteditingBook }){
    const [time, setTime] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://worldtimeapi.org/api/timezone/America/Toronto")
            .then((response) => response.json())
            .then((data) => {
                getMonth(data.datetime);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    function getMonth(dateString){
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        for(let i = 0; i < dateString.length; i++){
            if(dateString[i] === "-"){
                const month = dateString.slice(i + 1, i + 3);
                const monthIndex = parseInt(month) - 1;
                setTime(months[monthIndex]);
                break;
            }
        }
    }
    const editBook = (lib) => {
        seteditingBook(lib);
        setshowModal(true);
    }

    const handleLogout = async () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <>
            <div className="h-[20vh] p-[10px] m-[10px] bg-white flex flex-col rounded-sm">
                <p>{time}, 2025</p>
                <button onClick={handleLogout}>Log out</button>
            </div>
            <div className="h-[75vh] p-[10px] m-[10px] bg-white flex flex-col rounded-sm overflow-y-auto">
                <div className="flex flex-wrap gap-4">
                    {libitem.map((lib, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-md w-full md:w-[calc(33.333%-1rem)]">
                            <div className="flex justify-between">
                                <h3 className="font-bold text-lg mb-2">{lib.title}</h3>
                                <button
                                    className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                                    onClick={() => editBook(lib)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </button>
                            </div>
                            
                            <p>Author: {lib.author}</p>
                            <p>Urgency: {lib.urgency}</p>
                            <p>Status: {lib.read ? 'Read' : 'Not Read'}</p>
                        </div>
                    ))}
                </div>
                
            </div>
        </>

        
    );
}

export default Home;