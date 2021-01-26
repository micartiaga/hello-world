import Recorder from "./recorder.js";
import Giphy from "./giphy.js";

const key = "jkB76Z9RX3InY7Jduntvx3IS5q1b2oFb";
const urlUp = "https://upload.giphy.com/v1";

const recorder = new Recorder();
const upGiphy = new Giphy(urlUp, key);

// LOCAL STORAGE GIFS

if (!localStorage.misGuifos) {
    localStorage.setItem('misGuifos', "[]")
};

async function misGuifosGrid() {

    const arrayStorage = localStorage.getItem('misGuifos');
    let array = JSON.parse(arrayStorage);

    let misGuifosContainer = document.getElementById('misGuifosContainer');

    for (let gifo of array) {

        let myGif = await upGiphy.getGifById(gifo);

        let url = await myGif.data.images.downsized_medium.url;
        let height = await myGif.data.images.downsized_medium.height;
        let width = await myGif.data.images.downsized_medium.width;

        let gif = document.createElement('img');
        gif.setAttribute("src", url);
        gif.classList.add('gridMiniContainer');

        if (width > height) {
            gif.classList.add('gridMiniContainerLarge');
        } else {
            gif.classList.add('gridMiniContainerSmall');
        }
        misGuifosContainer.appendChild(gif);

    }

};

misGuifosGrid();

// CREAR GUIFOS BOTONES PASO 1

const cancelarBtn1 = document.getElementById('misGuifosUnoCancelar');
const comenzarBtn = document.getElementById('misGuifosUnoComenzar');
const ventanaInstrucciones = document.getElementById('windowCrearGuifos');

const capturarBtn = document.getElementById('capturarBtn');
const listoBtn = document.getElementById('listoBtn');
const repetirCaptura = document.getElementById('repetirBtn');
const subirGuifo = document.getElementById('subirGuifoBtn');
const cancelarBtn2 = document.getElementById('misGuifosCincoCancelar');
const videoContainer = document.getElementById('videoContainer');
const listoBtn2 = document.getElementById('misGuifosSeisListo');
const copyUrl = document.getElementById('copiarUrlBtn');
const downloadBtn = document.getElementById('downloadBtn');

// BOTONES

cancelarBtn1.addEventListener("click", () => {
    showMisGuifos();
});

function showMisGuifos() {
    window.location.href = 'misGuifos.html'
}

comenzarBtn.addEventListener("click", () => {
    let cross = document.getElementById('misGuifosCross');
    let ventanaUno = document.getElementById('misGuifosUno');
    let ventanaDos = document.getElementById('misGuifosDos');
    let misGuifos = document.getElementById('misGuifos');
    let titulo = document.querySelector("#windowTitle p")
    titulo.innerText = "Un Chequeo Antes de Empezar";
    cross.style.display = "block";
    ventanaUno.style.display = "none";
    ventanaDos.style.display = "flex";
    misGuifos.style.display = "none";
    videoContainer.style.display = "block";

    ventanaInstrucciones.style.height = "548px";
    ventanaInstrucciones.style.width = "860px";

    cross.addEventListener("click", () => {
        showMisGuifos();
    });

    recorder.getStreamAndPlay();
    let dateStarted = new Date().getTime();

});

capturarBtn.addEventListener("click", () => {
    let titulo = document.querySelector("#windowTitle p")
    titulo.innerText = "Capturando tu Guifo";
    let ventanaDos = document.getElementById('misGuifosDos');
    let ventanaTres = document.getElementById('misGuifosTres');
    ventanaDos.style.display = "none";
    ventanaTres.style.display = "flex";


    recorder.startRecording();



});

listoBtn.addEventListener("click", () => {
    let titulo = document.querySelector("#windowTitle p")
    titulo.innerText = "Vista Previa";
    let ventanaTres = document.getElementById('misGuifosTres');
    let ventanaCuatro = document.getElementById('misGuifosCuatro');
    ventanaTres.style.display = "none";
    ventanaCuatro.style.display = "flex";

    let cross = document.getElementById('misGuifosCross');
    cross.style.display = "none";
    videoContainer.style.display = "none";

    recorder.stopRecording();
    let duration = (recorder.finishTime.getTime()) - (recorder.startTime.getTime());
    console.log("durationnn   " + duration);
    let timer2 = document.getElementById('timer2');
    let horaFinal = time(duration);
    timer2.innerText = horaFinal;
    progressBar(horaFinal);


});

function progressBar(durationMs) {
    try {
        // CONSIGUIENDO DURACION EN SEG
        let hora = durationMs.slice(7, 8).replace(":", "");
        let milisegundos= hora + "0";
        console.log("progress bar hora " + milisegundos);
        let i=0;

        // PINTANDO BARRA
        if(i==0){
            i=1;
            let container = document.getElementById('myBar');
            let width = 1;
            let run= setInterval(frame, milisegundos);
   
            function frame(){     
                if (width >=100){
                    clearInterval(run);                   
                    i=0;
                }else {
                    width++;
                    container.style.width = width + "%";
                    console.log("ancho a ver si llega " + width);
                }
            };
        }

    } catch (error) {
        return null;
    }
};

function time(miliseg) {
    try {
        let hora = new Date(miliseg).toISOString().replace(".", ":").slice(11, 22);
        return hora
    }
    catch (error) {
        return null;
    }
};


repetirCaptura.addEventListener("click", () => {
    let titulo = document.querySelector("#windowTitle p")
    titulo.innerText = "Capturando tu Guifo";
    let ventanaCuatro = document.getElementById('misGuifosCuatro');
    let ventanaDos = document.getElementById('misGuifosDos');
    let ventanaTres = document.getElementById('misGuifosTres');
    ventanaTres.style.display = "none";
    ventanaCuatro.style.display = "none";
    ventanaDos.style.display = "flex";

    let video = document.getElementById('video');
    let cross = document.getElementById('misGuifosCross');
    cross.style.display = "block";
    videoContainer.style.display = "block";
    video.style.display = "block";

    recorder.getStreamAndPlay();


});


subirGuifo.addEventListener("click", () => {
    let titulo = document.querySelector("#windowTitle p")
    titulo.innerText = "Subiendo Guifo";
    let ventanaCinco = document.getElementById('misGuifosCinco');
    let ventanaCuatro = document.getElementById('misGuifosCuatro');
    ventanaCuatro.style.display = "none";
    ventanaCinco.style.display = "flex";

    let cross = document.getElementById('misGuifosCross');
    cross.style.display = "block";
    videoContainer.style.display = "none"

    let blob = recorder.gif.blob;
    subiendoGif(blob);

    let duration = (recorder.finishTime.getTime()) - (recorder.startTime.getTime());
    console.log("durationnn   " + duration);
    let timer2 = document.getElementById('timer2');
    let horaFinal = time(duration);
    timer2.innerText = horaFinal;
    progressBar2(horaFinal);

});


function progressBar2(durationMs) {
    try {
        // CONSIGUIENDO DURACION EN SEG
        let hora = durationMs.slice(7, 8);
        let milisegundos= hora + "0";
        console.log("progress bar hora " + milisegundos);
        let i=0;

        // PINTANDO BARRA
        if(i==0){
            i=1;
            let container = document.getElementById('myBar2');
            let width = 1;
            let run= setInterval(frame, milisegundos);
   
            function frame(){     
                if (width >=100){
                    clearInterval(run);                   
                    i=0;
                }else {
                    width++;
                    container.style.width = width + "%";
                    console.log("ancho a ver si llega " + width);
                }
            };
        }

    } catch (error) {
        return null;
    }
};



async function subiendoGif(blob) {
    let myGif = await upGiphy.uploadGif(blob);
    let id = await upGiphy.getGifById(myGif);
    let urlCopy = await id.data.url;
    console.log(id);
    console.log(urlCopy);
    exitoMisGuifos(id, urlCopy);
};

function exitoMisGuifos(id, urlCopy) {
    // CAMBIAR DE DIV AL ULTIMO Y SU TITULO
    let ventanaCinco = document.getElementById('misGuifosCinco');
    ventanaCinco.style.display = "none";
    let ventanaSeis = document.getElementById('misGuifosSeis');
    ventanaSeis.style.display = "block";
    let titulo = document.querySelector("#windowTitle p")
    titulo.innerText = "Guifo Subido Con Éxito";
    ventanaInstrucciones.style.height = "391px";
    ventanaInstrucciones.style.width = "721px";

    // AGREGAR URL DEL GIF
    let miniGif = document.getElementById('exitoGif');
    let urlGif = id.data.images.downsized_medium.url;
    miniGif.setAttribute("src", urlGif);

    copyUrl.addEventListener("click", () => {
        console.log(urlCopy);
        let textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.value = urlCopy;
        textarea.select();
        document.execCommand('copy');
        textarea.style.display = "none";
        document.body.removeChild(textarea);
        alert('Enlace copiado en el portapapeles');
    });

    downloadBtn.addEventListener("click", async () => {
        let link = document.createElement('a');
        let res = await fetch(urlGif);
        let file = await res.blob();
        link.download = "myGif";
        link.href = window.URL.createObjectURL(file);
        // document.body.appendChild(link);
        // link.display.style= "none";
        link.click();
        window.URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
    })
};

cancelarBtn2.addEventListener("click", () => {
    showMisGuifos();
})

listoBtn2.addEventListener("click", () => {
    showMisGuifos();
});




