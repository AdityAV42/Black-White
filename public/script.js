async function uploadImage() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (!file) return alert("Please select a file!");

  const formData = new FormData();
  formData.append("photo", file); // "photo" (backend must use the same key name)

    // Amazon EC2 instance public IP - Hardcoded
    const response = await fetch("http://16.171.25.108:3000/upload", {
      method: "POST",       //posts(sends) from frontend to backend
      body: formData,
    });

    // Using localhost for local development
    //   const response = await fetch("http://localhost:3000/upload", {
    //     method: "POST", // Posts (sends) from frontend to backend
    //     body: formData,
    //   });

  if (!response.ok) {
    alert("Image processing failed.");
    return;
  }

  const blob = await response.blob(); // Blob (binary large object - raw binary data)
  const imageUrl = URL.createObjectURL(blob); // Temporary URL for the blob--- URL points to the image stored in memory (not on a file system)

  const img = document.getElementById("resultImage");
  img.src = imageUrl;
  img.style.display = "block"; // Make the image visible

  // Display download button after image is processed
  const downloadButton = document.getElementById("downloadButton");
  downloadButton.style.display = "inline-block"; // Make the button visible

  // Set href and download attributes for the download button
  downloadButton.setAttribute("href", imageUrl);      //Clicking the download button will automatically trigger the download using the link provided by the href
  downloadButton.setAttribute("download", "grayscale_image.png"); // Set filename for the download
}

