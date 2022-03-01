// IMG File uploader

const dropArea = document.getElementById("dropArea");
const dropAreaText = document.getElementById("dropAreaText");
const uploadBtn = document.getElementById("uploadBtn");
const uploadInput = document.getElementById("uploadInput");
const body = document.querySelector("body");

body.addEventListener("dragover", (event) => {
  console.log("Body drag");
  event.preventDefault();
});

let file;

uploadBtn.onclick = () => {
  uploadInput.click();
};

uploadInput.addEventListener("change", function () {
  file = this.files[0];
  showFile();
  dropArea.classList.add("drag-active");
});

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  console.log("Dragging file in dropArea.");
  dropAreaText.textContent = "Release to Upload File";
  dropArea.classList.add("drag-active");
});

dropArea.addEventListener("dragleave", () => {
  console.log("File in dropArea has left.");
  dropArea.classList.remove("drag-active");
  dropAreaText.textContent = "Drag and Drop to Upload File";
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  console.log("File in dropArea has been dropped.");
  dropArea.classList.remove("drag-active");
  dropAreaText.textContent = "Release to Upload File";
  //   dropArea.classList.remove("drag-active");
  file = event.dataTransfer.files[0];
  console.log(file);
  showFile();
});

function showFile() {
  let fileType = file.type;
  console.log(fileType);

  let validImgExtensions = ["image/png", "image/jpg", "image/jpeg"];

  if (validImgExtensions.includes(fileType)) {
    console.log("Valid file type: " + fileType);
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      let imgTag = `<img src="${fileURL}" alt="">`;
      dropArea.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);
  } else {
    console.log("!! Invalid file type: " + fileType);
    alert("File type invalid.");
  }
}
