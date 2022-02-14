import {dragOverHandler, projectDropHandler, changeColor, textAlert} from "./modules/dragAndDropFunctions.js";

const dropZone = document.querySelector(".drop-zone");
const result = document.querySelector(".result");


dropZone.addEventListener("dragover", (e) => {
    dragOverHandler(e);
    dropZone.textContent = 'Puedes soltar';
    dropZone.style.border = '4px dashed';
    changeColor(dropZone, "rgb(184, 183, 183)");
    dropZone.style.backgroundColor = "white";
    dropZone.style.transition = "background-color 0.3s linear 0s";
});

dropZone.addEventListener("dragleave", (e) => {
    dragOverHandler(e);
    dropZone.textContent = 'Arrastre aquí su archivo';
    dropZone.style.border = '4px dashed';
    changeColor(dropZone, "grey");
    dropZone.style.backgroundColor = "white";
    dropZone.style.transition = "background-color 0.3s linear 0s";
});

dropZone.addEventListener("drop", (e) => {
    projectDropHandler(e, result);
    dropZone.textContent = '¡Carga completa!';
    //textAlert.textContent = 'Archivos arrastrados';
    changeColor(dropZone, "green");
    dropZone.style.border = 'none';
    dropZone.style.backgroundColor = "#8bc9a5";
    dropZone.style.transition = "all 0.3s linear 0s";
});


