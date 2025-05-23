function Sidebar({ setshowModal, seteditingBook }) {
    function homeClick(){
        alert("Home");
    }

    function addLib(){
        seteditingBook(null);
        setshowModal(true);
        
    }

    function removeLib(){

    }

    return (
        <div className="h-[98vh] p-[10px] m-[10px] bg-white flex flex-col rounded-sm">
            <h1 className="font-bold text-2xl">LibUp</h1>
            <button 
                onClick={homeClick}
                className="rounded-md px-4 py-2 hover:bg-gray-300 transition">
                    Home
            </button>
            <button 
                onClick={addLib}
                className="rounded-md px-4 py-2 hover:bg-gray-300 transition">
                    Add
            </button>
            <button 
                onClick={removeLib}
                className="rounded-md px-4 py-2 hover:bg-gray-300 transition">
                    Remove
            </button>
            

        </div>
    );
}

export default Sidebar;