import Sidebar from "./Sidebar";
import Home from "./Home";


function Layout(){
    return (
        <div className="h-screen flex flex-row">
            <div className="flex-[0_0_10%] bg-gray-200 h-full">
                <Sidebar />
            </div>
            <div className="flex-[0_0_90%] bg-red-100 h-full">
                <Home />
            </div>
        </div>
    );
}
export default Layout;