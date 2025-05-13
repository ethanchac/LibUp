function Sidebar() {

    function homeClick(){
        alert("Home");
    }

    return (
    <div className="h-[98vh] p-[10px] m-[10px] bg-red-200 flex flex-col rounded-sm">
        <button onClick={homeClick}>Home</button>
        <button>Add</button>
        <button>Remove</button>

    </div>
    );
}

export default Sidebar;