const log = console.log;

document.getElementById("title").innerText = "Hello akap's SH AIrport assistant";

// This happens only after all html is loades (styles and assets does not matters)
document.addEventListener('DOMContentLoaded',()=>{

    // GRAB ELEMENTS
    const recordButton = document.getElementById("recordButton");
    const stopButton = document.getElementById("stopButton");
    const textResponse = document.getElementById("textResponse");
    const audioResponse = document.getElementById("audioResponse");
    
    // un acumulador para lo que se va recogiendo de I/O
    let audioChunks = []
    let recorder;

    // actions for RECORD
    recordButton.addEventListener('click', async()=>{
        /* toggle logic */
        recordButton.disabled = true;
        stopButton.disabled = false;

        /* audio Input logic */
        // opens audio Input in the browser process
        const stream = await navigator.mediaDevices.getUserMedia({audio:true});
        log('stream',stream);

        /* RECORDER OBJECT SET UP */
        // create an object to put things in (handle) the audio input
        recorder = new MediaRecorder(stream);
        // Stablish the Audio handler's behavior when it 'listen'(is a function declaration assignment)
        recorder.ondataavailable = (e)=>{
            log('e',e);
            if (e.data.size > 0){
                audioChunks.push(e.data)
                log('e.data',e.data);
            }
        }
        // Stablish the audio handler's behavior when it stops listening
        recorder.onstop = async ()=>{
            // Join the data chunks into 1 audio Blob
            const audioBlob = new Blob(audioChunks, {type:'audio/wav'});
            log('audioChunks',audioChunks);
            log('audioBlob',audioBlob);
            // Instantiate an Audio html element
            const audioHtml = new Audio();
            // Create an assign an URL string build from the Blob binary data
            const audioUrl = URL.createObjectURL(audioBlob);
            audioHtml.src = audioUrl;
            log('audioUrl',audioUrl);
            // Browser play audio
            audioHtml.play()
            // Clean chunks to get new capture
            audioChunks = []
        }
        // initiate the action of the recorder
        recorder.start();
    })

    // actions for STOP
    stopButton.addEventListener('click',()=>{
        /* toggle logic */
        recordButton.disabled = false;
        stopButton.disabled = true;
        /* Triggers recorder onStop() */
        recorder.stop();
    })
})