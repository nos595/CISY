import React from 'react';

let but;

const Navigation = (props) => {

    // Set the page on a navigation click
    const handleClick = (b) => {
        props.setPage(b.target.name);
    }

    // Figure out what buttons to display
    const renderHandler = (page) => {
        // Figure out if we're offering a start or a reset button
        if(props.active){
            but = <button onClick={handleClick} name={("reset")}>Reset</button>;
        }else{
            but = <button onClick={handleClick} name={("start")}>Get started</button>;
        }

        // Figure out where we are and what buttons to show
        switch (page){
            // If we're at the FAQ and just need the start/reset buttons
            case "faq":
                return <>{but}</>;

            // If we're are the reset warning and need yes and no buttons
            case "reset":
                return <><button onClick={handleClick} name={("home")}>No</button><button onClick={handleClick} name={("yesReset")}>Yes</button></>;

            // If we're anywhere else and need the FAQ and start/reset buttons
            default:
                return <><button onClick={handleClick} name={("faq")}>What's this?</button>{but}</>;
        }
    }

    return (
        <div className="navigation">
            {renderHandler(props.page)}
        </div>
    );
}

export default Navigation;