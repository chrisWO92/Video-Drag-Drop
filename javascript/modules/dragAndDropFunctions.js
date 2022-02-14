export {dragOverHandler, projectDropHandler,removeDragData, changeColor, textAlert};

const textAlert = document.querySelector(".text");


//Prevent default behavior (Prevent file from being opened)

function dragOverHandler (event) {
    event.preventDefault();
}



//Typically, an application may want to perform some cleanup by deleting the file drag data. A drop event is passed along from drop handler to removeDragData function. If the broswer supports the DataTransferItemList interface, the list's clear() method is used to delete the dile drag data; otherwise the DataTransfer() object's clearData() method is used to delete the data.

function removeDragData (event) {

    if (event.dataTransfer.items){
        event.dataTransfer.items.clear();
    }else{
        event.dataTransfer.clearData();
    }

}

//Función que maneja el evento "drop", ó arrastrar un archivo 

function projectDropHandler(event, eventZone) {
    event.preventDefault();
    let text;
    let url;
    let videoBlob;
    if (event.dataTransfer.items) {
        for (var item of event.dataTransfer.items){
            if (item.kind === 'file'){
                if (item.type === 'text/plain'){
                    console.log(item.type);
                    file = item.getAsFile();
                    const reader = new FileReader();
                    reader.readAsText(file);
                    reader.addEventListener("load",(event)=>{
                        text = event.currentTarget.result;
                        eventZone.textContent += text;
                    });
                    //array.push([item.type, text]);
                }
                else if (item.type === 'image/png'){
                    console.log(item.type);
                    file = item.getAsFile();
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.addEventListener("load",(event)=>{
                        url = URL.createObjectURL(file);
                        let img = document.createElement("IMG");
                        img.setAttribute('src', url);
                        img.style.height = '100%';
                        img.style.overflow = 'hidden';
                        eventZone.style.flexWrap = 'wrap';
                        eventZone.appendChild(img);
                    });
                }
                else if (item.type === 'video/mp4'){
                    console.log(item.type);
                    file = item.getAsFile();
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.addEventListener("load",(event)=>{
                        videoBlob = new Blob([new Uint8Array(event.currentTarget.result)],{type: 'video/mp4'});
                        url = URL.createObjectURL(videoBlob);
                        let video = document.createElement("VIDEO");
                        video.setAttribute('src', url);
                        video.style.maxheight = '100%';
                        video.style.minwidth = '10%';
                        video.style.overflow = 'hidden';
                        eventZone.style.overflow = 'hidden';
                        //eventZone.style.flexWrap = 'wrap';
                        eventZone.appendChild(video);
                        video.play();
                    });
                }
            }
        }
    } else {
        for (var file of event.dataTransfer.files) {
            console.log(file.type);
            if (file.type === 'text/plain'){
                const reader = new FileReader();
                reader.readAsText(file);
                reader.addEventListener("load",(event)=>{
                    text = event.currentTarget.result;
                    eventZone.textContent += text;
                });
            }
            else if (file.type === 'image/png'){
                console.log(file.type);
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.addEventListener("load",(event)=>{
                    url = URL.createObjectURL(file);
                    let img = document.createElement("IMG");
                    img.setAttribute('src', url);
                    img.style.height = '100%';
                    img.style.overflow = 'hidden';
                    eventZone.style.flexWrap = 'wrap';
                    eventZone.appendChild(img);
                });
            }
            else if (file.type === 'video/mp4'){
                console.log(file.type);
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.addEventListener("load",(event)=>{
                    videoBlob = new Blob([new Uint8Array(event.currentTarget.result)],{type: 'video/mp4'});
                    url = URL.createObjectURL(videoBlob);
                    let video = document.createElement("VIDEO");
                    video.setAttribute('src', url);
                    video.style.height = '100%';
                    video.style.overflow = 'hidden';
                    eventZone.style.flexWrap = 'wrap';
                    eventZone.appendChild(video);
                    video.play();
                });
            }
        }
    }
}


// Función que cambia el color de un objeto junto con su borde, usando una transición

function changeColor(obj, color) {
    obj.style.color = color;
    obj.style.borderColor = color;
    obj.style.transition = 'all 0.3s linear 0s';
}



