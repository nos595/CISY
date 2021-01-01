import React from 'react';



const Content = (props) => {

    const renderHandler = (props) => {
        switch(props.page){
            // The FAQ
            case "faq":
                // Calculate time since dev's last smoke
                let last = Math.floor(Date.now()/1000) - 1609441463;
                let tim = "second";
                if(last > 60){
                    last/=60;
                    tim = "minute";
                    if(last > 60){
                        last/=60;
                        tim = "hour";
                        if(last > 24){
                            last/=24;
                            tim = "day";
                            if(last > 30.4375){
                                last/=30.4375;
                                tim = "month";
                                if(last > 12){
                                    last/=12;
                                    tim = "year";
                                }
                            }
                        }
                    }
                }


                // Format the time since dev's last smoke
                last = Math.floor(last);
                if(last > 1){tim+="s";}
                let txt = last + " " + tim;

                return <p>
                <b>What is this?</b><br />
                This is CISY! A very simple, no-nonsense tool to help you quit smoking. It's not fool-proof and requires willpower, but it's here to help.<br /><br />
                <b>How does it work?</b><br />
                {props.active ? "I've already started a timer" : "Click below to get started and I'll start a timer"}, the countdown to your next cigarette. Every time you return to the site from {props.active ? "now" : "then"} on, I'll let you know if the timer is up yet. If it is, you'll get a big "YES!", I'll add another hour to the wait time and start the timer again.<br />Basically you smoke, wait an hour, smoke, wait two hours, smoke, wait three hours etc. The catch being, you never see the countdown and have to remember to visit the site to find out. The hope is that eventually, you'll never come back and that would make me very happy indeed! For now though{props.active ? "," : " click below to get started, "} drop a bookmark here and go away until you need to know!<br /><br />
                <b>It's that easy?</b><br />
                If only. This is gonna take some willpower on your end. You got this though, try'n keep yourself distracted and don't be refreshing me every five seconds!<br /><br />
                <b>Why did you make this?</b><br />
                I assume for the same reason you're here, I'm trying to quit! I find the best way to cut down is simply to gradually increase the amount of time between cigarettes, but by the time I'm setting an alarm for 10+ hours it gets <i>really</i> demotivating and having an alarm go off when the timer is up makes me think about smoking even if I hadn't been up to then. I wanted a way to remove all the extraneous information and just get an answer to the important question <i>when asked</i> until it wasn't important anymore. So, like any good nerd, I overengineered the problem! =]<br /><br />
                <b>Who are you?</b><br />
                A thoroughly average bloke called Jon who's trying to kick the ciggies. If you're (for some reason) interested, here's my <a href={("http://www.twitter.com/nos595")} target={("new")}>Twitter</a>.<br /><br />
                <b>This is free?</b><br />
                Absolutely! Smoking is expensive enough, quitting shouldn't cost a penny. <i>If</i> you're feeling generous or appreciative however, donations are welcome through <a href={("http://paypal.me/jonmbarton")} target={("new")}>PayPal</a> to help with hosting costs. A couple of quid goes a long way to keeping the site online as I don't have the funds to host this indefinitely. This is <i>entirely</i> optional though!<br /><br />
                <b>So did it work for you?</b><br />
                So far, so good! It's been {txt} since my last smoke. =)<br /><br />
                <b>Cookies?</b><br />
                Nah, I'm not interested in tracking you or selling you anything. Cookies are for eating.<br />For the site to function, it stores two bits of info on your device - the time of your next cigarette and the length of the wait time - that's it. If you want to get rid of that, just click reset and I'll wipe everything.<br />The code is freely available on <a href={("https://github.com/nos595/CISY")} target={("new")}>GitHub</a> for anyone inclined to dig through it.<br /><br />
                <b>Can I hire you?</b><br />
                You absolutely can! I have very little formal training and no formal experience, but if you can see past that, I am very much in the market! I've been sat behind a keyboard since I was six and have experience in JS, PHP, SQL, HTML & CSS. This is my first proper foray into React and I'm enjoying it a lot!<br />Get in touch at jonmatthewbarton (at) gmail (dot) com if you want to know more.<br /><br />...Okay, that last one isn't frequently asked, but a guy can dream! =P
            </p>;

            // Starting with a new user
            case "start":
                localStorage.setItem("cisy_next", Math.floor(Date.now()/1000)+3600);
                localStorage.setItem("cisy_wait", 2);

                props.setActive(true);
    
                return <div className={("message")}><p><b>Okay, let's get started!</b> I've started a timer, you've got one hour until your next cigarette.<br />This is the last time I'll tell you how much time is left, from now on I'll only answer one question;<br /><br /><b>Can I smoke yet?</b><br /><br /><br />Go away now! And the very best of luck to you! {("<3")}</p></div>

            // Checking a returning user
            case "check":
                // If the timer is up, report yes and set the next timer
                if(props.next <= Math.floor(Date.now()/1000)){
                    localStorage.setItem("cisy_next", Math.floor(Date.now()/1000)+props.wait*3600);
                    localStorage.setItem("cisy_wait", Math.floor(props.wait)+1);

                    return <div className={("message")}><p className={("yes")}>Yes!</p></div>

                // If not, report no. Sadface
                }else{
                    return <div className={("message")}><p className={("no")}>No</p></div>
                }

            // Warn before a reset
            case "reset":
                return <div className={("message")}><p><b>Are you sure? This will wipe all progress, there's no going back after this!</b></p></div>
            
            // Reset if user accepted the warning
            case "yesReset":
                localStorage.removeItem("cisy_next");
                localStorage.removeItem("cisy_wait");

                props.setActive(false);

                return <div className={("message")}><p>Okay, I've reset everything.<br /><br />I hope you're not giving up giving up! Do you want to get started again?</p></div>
            
            // Error "handling" ;)
            default:
                return <div className={("message")}><p><b>Oh dear!</b> Well this is embarassing, there's no content here...<br /><br />Not exactly sure how you ended up here, it shouldn't be possible.<br /><br />Dev missed something, clearly. Go shout at him on <a href={("http://www.twitter.com/nos595")} target={("new")}>Twitter</a>!<br /><br />({props.page})</p></div>;
        }
    }

    return (
        <div className={props.page === "home" ? "content" : "activeContent"}>
            {renderHandler(props)}
        </div>
    );
}

export default Content;