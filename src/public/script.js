const log = console.log;

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
            console.log('audioChunks',audioChunks);
            console.log('typeof audioChunks',typeof audioChunks);
            // Join the data chunks into 1 audio Blob
            const audioBlob = new Blob(audioChunks, {type:'audio/mp3'});
            console.log('audioBlob',audioBlob);
            console.log('typeof audioBlob',typeof audioBlob);
            // Instantiate an Audio html element
            const audioHtml = new Audio();
            let audioUrl = URL.createObjectURL(audioBlob);
            audioHtml.src = audioUrl;
            log('audioUrl',audioUrl);
            // Browser play audio
            // audioHtml.play()
            // Create form object to leverage with appending
            const utilityForm = new FormData();
            utilityForm.append('audioFile', audioBlob);
            // fetch Form's data to endpoint exposed by express. Get a Response object back
            const response = await fetch(`http://${window.location.host}/api/audiorequest`,{
                method: 'POST',
                body: utilityForm
            });
            // The Response objects body property is a data Stream in Raw Format, so has to be read as stream and parsed
            const data = await response.json();
            log('data',data);
            log('data.respuestaAudio',data.respuestaAudio);
            log('typeof data.respuestaAudio',typeof data.respuestaAudio);
            // Join the data chunks into 1 audio Blob
            const audioBlobResponse = new Blob([new Uint8Array(data.respuestaAudio.data)], {type:'audio/mp3'});
            // Create an assign an URL string build from the Blob binary data
            audioUrl = URL.createObjectURL(audioBlobResponse);
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

let isRecording = false;

function toggleRecording() {
    if (!isRecording) {
        startRecording();
    } else {
        stopRecording();
    }
}

function startRecording() {
    // Reset previous states
    resetStates();

    // Simulate recording logic
    document.getElementById('actionButton').classList.add('recording');

    // Simulate data fetch
    setTimeout(() => {
        document.getElementById('actionButton').classList.add('upload');
        document.getElementById('actionIcon').classList.add('upload');

        // Simulate loading
        setTimeout(() => {
            document.getElementById('actionButton').classList.remove('upload');
            document.getElementById('actionIcon').classList.remove('upload');
            document.getElementById('actionButton').classList.add('loading');
            document.getElementById('actionIcon').classList.add('loading');

            // Simulate data response
            setTimeout(() => {
                document.getElementById('actionButton').classList.remove('recording', 'upload', 'loading');
                document.getElementById('actionIcon').classList.add('stop');
                document.getElementById('textresponse').innerText = 'Assistant response text here.';

                // Simulate person image zoom in
                document.getElementById('personImage').classList.add('zoomed');
            }, 3000); // Adjust the time based on your needs
        }, 1000); // Adjust the time based on your needs
    }, 1000); // Adjust the time based on your needs

    isRecording = true;
}

function stopRecording() {
    // Reset previous states
    resetStates();

    // Additional logic for stopping recording, if needed
    isRecording = false;
}

function resetStates() {
    document.getElementById('actionButton').classList.remove('recording', 'upload', 'loading', 'stop');
    document.getElementById('actionIcon').classList.remove('upload', 'stop');
    document.getElementById('textresponse').innerText = '';
    
    // Reset person image
    document.getElementById('personImage').classList.remove('zoomed');
    setTimeout(() => {
        // Reset image source after the zoom-out animation
        document.getElementById('personImage').src = "https://as1.ftcdn.net/v2/jpg/02/46/92/18/1000_F_246921800_d3ixfFSOmVhu2yS5Gj8N2MbLJ7B3BB0e.jpg";
    }, 500);
}

// Event listener for the action button
document.getElementById('actionButton').addEventListener('click', toggleRecording);
