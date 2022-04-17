export default function formatTime(secs) {
    let hours = 0;
    let minutes = 0;
    let seconds = secs;

    if (seconds >= 60) {
        minutes = Math.floor(seconds / 60);
        seconds = seconds % 60; 
    } 

    if (minutes >= 60) {
        hours = Math.floor(minutes / 60);
        minutes = minutes % 60; 
    }

    if (hours >= 24) {
        console.log("hours cant be more than 24 in a day bruh")
    }

    let hoursString = hours < 10 ? "0" + hours : hours;
    let minutesString = minutes < 10 ? "0" + minutes : minutes;
    let secondsString = seconds < 10 ? "0" + seconds : seconds;
    return hoursString + ":" + minutesString + ":" + secondsString;
}