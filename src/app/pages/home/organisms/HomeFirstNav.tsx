import React from "react";

const HomeFirstNav = ({ userName }:{userName:string}) => {
    return (
        <div className="top_nav flex justify-between items-center">
        <div className="welcome">
            <h1 className="text-3xl text-perfBlue font-semibold">Good Morning.</h1>
            <h1 className="text-3xl text-perfGray2 font-medium">{userName}.</h1>
        </div>
        <div className="club_logo">
            <h1>CLUB LOGO</h1>
        </div>
        </div>
    );
    };

export default HomeFirstNav;
