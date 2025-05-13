import { useState, useEffect, use } from "react";

function Home(){
    const [time, setTime] = useState(null);

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

    return (
        <div className="h-[98vh] p-[10px] m-[10px] bg-red-200 flex flex-col rounded-sm">
            <p>{time}, 2025</p>
        </div>
    );
}

export default Home;