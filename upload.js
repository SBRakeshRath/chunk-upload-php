const fileChunkArray = [];

const callApi = async (url , data) => {
  let finalResponse = {"success": false};
  let config = {
    method: "POST",
    url: url,
    data: data,
  };
  try {
    const req = await axios(config);
    const response = req.data;
    console.log(response);
    finalResponse = response
  } catch (error) {
    console.log(JSON.stringify(error));
  }
  return finalResponse ;
};

function createChunk(file, start, end) {
  // console.log(file);
  console.log(start);
  console.log(end - 1);
  const chunk = file.slice(start, end);

  // console.log(chunk);
  return chunk;
}

async function  sendFirstChunk(start, chunkEnd, chunkSize , file , fileName) {
  const firstFile = createChunk(file, start, chunkEnd);
  let data = new FormData();

  data.append("fileToUpload", firstFile, fileName);
  data.append("photo1", "hallo");

  data.append("start_of_chunk", start);
  data.append("end_of_chunk", chunkEnd - 1);

  
  const response = await callApi( "http://localhost/chunckUpload/upload.php" , data);


  return response.success
}

async function sentMiddleChunks (start, chunkEnd, chunkSize , file , fileName){
  const currentFile = createChunk(file, start, chunkEnd);
  let data = new FormData();
  console.log(start + " " + chunkEnd + " ")

  data.append("fileToUpload", currentFile, fileName);
  data.append("photo1", "hallo");

  data.append("start_of_chunk", start);
  data.append("end_of_chunk", chunkEnd - 1);

  const response = await callApi( "http://localhost/chunckUpload/middleUpload.php" , data);
  return response.success ;

}

async function showFile() {
  const chunkSize = 1000000;
  const file = document.getElementById("file").files[0];

  const fileName = file.name;
  var numberofChunks = Math.ceil(file.size / chunkSize);

  // file slicing
  var start = 0;
  var chunkEnd = start + chunkSize;

  // if first chunk uploaded successfully
  const ResponseSendFirstChunk = await sendFirstChunk(start, chunkEnd, chunkSize , file ,fileName) ;

  if(ResponseSendFirstChunk){
    console.log("created successfully") ;

    // Now upload next chunk

    // let sentMiddleChunks = false ; 
    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    let WhileStart = 1 ;
    
    console.log(numberofChunks);
    // start = chunkEnd ;
    // chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    // 4

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    // 8

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    // 12

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    // 16

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    // 20

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    // 24

    start = chunkEnd ;
    chunkEnd = chunkEnd + chunkSize;
    await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    // start = chunkEnd ;
    // chunkEnd = chunkEnd + chunkSize;
    // await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    // start = chunkEnd ;
    // chunkEnd = chunkEnd + chunkSize;
    // await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    // start = chunkEnd ;
    // chunkEnd = chunkEnd + chunkSize;
    // await sentMiddleChunks(start, chunkEnd, chunkSize , file ,fileName);

    // 25


    
  }


}

// checking for apis
// if (window.File && window.FileReader && window.FileList && window.Blob) {
//   console.log("All api are present");
// } else {
//   alert("Your browser is too old to support HTML5 File API");
// }
