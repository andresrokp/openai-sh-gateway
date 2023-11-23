document.getElementById("title").innerText = "Hello akap's SH AIrport assistant";

// This happens only after all html is loades (styles and assets does not matters)
document.addEventListener('DOMContentLoaded',()=>{

    // GRAB ELEMENTS
    const recordButton = document.getElementById("recordButton");
    const stopButton = document.getElementById("stopButton");
    const textResponse = document.getElementById("textResponse");
    const audioResponse = document.getElementById("audioResponse");

    // actions for RECORD
    recordButton.addEventListener('click', ()=>{
        // toggle logic
        recordButton.disabled = true;
        stopButton.disabled = false;
    })

    // actions for STOP
    stopButton.addEventListener('click',()=>{
        // toggle logic
        recordButton.disabled = false;
        stopButton.disabled = true;
    })
})