const log = console.log;

// This happens only after all html is loades (styles and assets does not matters)
document.addEventListener('DOMContentLoaded',()=>{

    // un acumulador para lo que se va recogiendo de I/O
    let audioChunks = [];
    let recorder;


    /**
     * ----------------
     * UI logic
     * ----------------
     */

    const actionButton = document.getElementById('actionButton');
    const actionIcon = document.getElementById('actionIcon');
    const textresponse = document.getElementById('textresponse');
    const personImage = document.getElementById('personImage');;

    let buttonPressings = 0;

    async function toggleRecording() {
        
        // tracks curren button action;
        const buttonState = buttonPressings % 3;
        
        switch (buttonState) {
            case 0:
                startRecording();
                break;
            case 1:
                await sendRequest();
                break;
            case 2:
                //TODO: stopAssitant()
                resetUiStates();
                break;        
            default:
                break;
        }        
        buttonPressings += 1;
    }

    async function startRecording() {        
        // Icon change to OK send
        actionIcon.classList.add('upload');
        // TODO: capture logic
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
    }

    function sendRequest() {
        // icon change to loading clock
        actionIcon.classList.remove('upload');
        actionIcon.classList.add('loading');

        /* Triggers recorder onStop() */
        recorder.stop();

        // TODO: backend request
        // by now to test... remove
        setTimeout(() => {
            actionIcon.classList.remove('loading');
            actionIcon.classList.add('stop');
            textresponse.innerText = 'Assistant response text here.';
            personImage.classList.add('zoomed');
        }, 3000)
    }

    function stopAssitant() {
        // TODO: logic to stop the playback.
    }

    function resetUiStates() {        
        actionIcon.classList.remove('upload', 'loading', 'stop');
        actionIcon.classList.add('activate');
        textresponse.innerText = '';
        personImage.classList.remove('zoomed');
    }

    // Event listener for the action button
    actionButton.addEventListener('click', toggleRecording);
})