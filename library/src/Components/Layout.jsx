import Sidebar from "./Sidebar";
import Home from "./Home";
import Modal from "./Modal"
import { useState } from 'react';

function Layout(){
    const [showModal, setshowModal] = useState(false);
    const [libitem, setLibtiem] = useState([]);

    return (
        <div className="h-screen flex flex-row">
            <div className="flex-[0_0_10%] bg-gray-200 h-full">
                <Sidebar setshowModal={setshowModal}/>
            </div>
            <div className="flex-[0_0_90%] bg-gray-200 h-full">
                <Home />
            </div>
            {showModal && <Modal setshowModal={setshowModal}/>}

        </div>
    );
}
export default Layout;