const fileChunkArray = [];

function createChunk(file, start, end) {
  // console.log(file);
  console.log(start);
  console.log(end - 1);
  const chunk = file.slice(start, end);

  // console.log(chunk);
  return chunk;
}

function showFile() {
  const chunkSize = 1000000;
  console.log("working");
  //   const file = document.querySelector("input[type=file]").files[0];
  const file = document.getElementById("file").files[0];

  const fileName = file.name;
  var numberofChunks = Math.ceil(file.size / chunkSize);

  // file slicing
  var start = 0;
  var chunkEnd = start + chunkSize;
  //   console.log(chunkSize);

  for (let i = 0; i < numberofChunks; i++) {
    // console.log(i);
    fileChunkArray.push(createChunk(file, start, chunkEnd));
    // createChunk(file, start, chunkEnd) ;
    if (i === 0) {
      // upload first part of the chunk
      const firstFile = fileChunkArray[0];
      let data = new FormData();

      data.append("fileToUpload", firstFile, fileName);
      data.append("photo1", "hallo");

      data.append("start_of_chunk", start);
      data.append("end_of_chunk", chunkEnd - 1);

      const callApi = async () => {
        let config = {
          method: "POST",
          url: "http://localhost/chunckUpload/upload.php",
          data: data,
        };
        try {
          const req = await axios(config);
          const response = req.data;
          console.log(response);
        } catch (error) {
          console.log(JSON.stringify(error));
        }
      };
      callApi();
    } else {
      if (i === numberofChunks) {
        return;
      }
      // now for middle chunks

      const MiddleFile = createChunk(file, start, chunkEnd);
      let data = new FormData();

      data.append("fileToUpload", MiddleFile, fileName);
      data.append("photo1", "hallo");

      data.append("start_of_chunk", start);
      data.append("end_of_chunk", chunkEnd - 1);

      const callApi = async () => {
        let config = {
          method: "POST",
          url: "http://localhost/chunckUpload/upload.php",
          data: data,
        };
        try {
          const req = await axios(config);
          const response = req.data;
          console.log(response);
        } catch (error) {
          console.log(JSON.stringify(error));
        }
      };
      callApi();
    }

    start = chunkEnd;
    chunkEnd = start + chunkSize;
  }

  console.log(fileChunkArray);
}

// checking for apis
// if (window.File && window.FileReader && window.FileList && window.Blob) {
//   console.log("All api are present");
// } else {
//   alert("Your browser is too old to support HTML5 File API");
// }
