const fileChunkArray = [];

const callApi = async (url, data) => {
  let finalResponse = { success: false, IntError: {}, response: {} };
  let config = {
    method: "POST",
    url: url,
    data: data,
  };
  try {
    const req = await axios(config);
    const response = req.data;

    finalResponse.success = response.success;
    finalResponse.response = response;
  } catch (error) {
    console.log(JSON.stringify(error));
    finalResponse.IntError = error;
  }
  return finalResponse;
};

function createChunk(file, start, end) {
  // console.log(file);
  const chunk = file.slice(start, end);

  // console.log(chunk);
  return chunk;
}

async function sendFirstChunk(
  start,
  chunkEnd,
  chunkSize,
  file,
  fileName,
  numberofChunks
) {
  if (numberofChunks < 2) {
    const newRes = { success: true, response: { temp_name: null } };
    return newRes;
  }
  const firstFile = createChunk(file, start, chunkEnd);
  let data = new FormData();

  data.append("fileToUpload", firstFile, fileName);
  data.append("photo1", "hallo");

  data.append("start_of_chunk", start);
  data.append("end_of_chunk", chunkEnd - 1);

  const response = await callApi(
    "http://localhost/chunckUpload/upload.php",
    data
  );

  return response;
}

async function sentMiddleChunks(
  start,
  chunkEnd,
  chunkSize,
  file,
  new_name,
  numberofChunks
) {
  if (numberofChunks < 2) {
    const newRes = { success: true, response: { temp_name: null } };
    return newRes;
  }
  const currentFile = createChunk(file, start, chunkEnd);
  let data = new FormData();

  data.append("fileToUpload", currentFile, new_name);
  data.append("photo1", "hallo");

  data.append("start_of_chunk", start);
  data.append("end_of_chunk", chunkEnd - 1);

  const response = await callApi(
    "http://localhost/chunckUpload/middleUpload.php",
    data
  );
  return response;
}
async function SendingFinalChunk(
  start,
  chunkEnd,
  chunkSize,
  file,
  fileName,
  temp_name,
  numberofChunks
) {
  let creteChunkEnd = file.size;
  let createChunkStart = start + chunkSize;
  console.log(creteChunkEnd);
  if (numberofChunks === 1) {
    creteChunkEnd = file.size;
    createChunkStart = 0;
  }else if (numberofChunks === 2){
    creteChunkEnd = file.size;
    createChunkStart = chunkSize;
  }
  const currentFile = createChunk(file, createChunkStart, creteChunkEnd);
  console.log(".................")
  console.log(creteChunkEnd);
  console.log(createChunkStart);
  let data = new FormData();
  let is_tmp_exist = true;

  if (numberofChunks === 1) {
    is_tmp_exist = false;
  }

  data.append("fileToUpload", currentFile, fileName);
  data.append("is_tmp_exist", is_tmp_exist);

  data.append("temp_name", temp_name);

  const response = await callApi(
    "http://localhost/chunckUpload/FinalUpload.php",
    data
  );
  console.log(response.response);
}

async function showFile() {
  const chunkSize = 1000000;
  // const chunkSize = 10;
  const file = document.getElementById("file").files[0];
  console.log(file);

  const fileName = file.name;
  var numberofChunks = Math.ceil(file.size / chunkSize);
  console.log(numberofChunks);

  // file slicing
  var start = 0;
  var chunkEnd = start + chunkSize;

  // if first chunk uploaded successfully
  const ResponseSendFirstChunk = await sendFirstChunk(
    start,
    chunkEnd,
    chunkSize,
    file,
    fileName,
    numberofChunks
  );
  console.log(ResponseSendFirstChunk);

  if (ResponseSendFirstChunk.success) {
    console.log("created successfully");

    // Now upload next chunk

    // let sentMiddleChunks = false ;
    start = chunkEnd;
    chunkEnd = chunkEnd + chunkSize;
    let sentMiddleChunksResponse = {
      success: true,
      IntError: {},
      response: {},
    };
    for (let i = 0; i < numberofChunks - 2; i++) {
      const response = await sentMiddleChunks(
        start,
        chunkEnd,
        chunkSize,
        file,
        ResponseSendFirstChunk.response.new_name,
        numberofChunks
      );
      start = chunkEnd;
      chunkEnd = chunkEnd + chunkSize;
      sentMiddleChunksResponse.success = response.success;
      sentMiddleChunksResponse.IntError = response.IntError;
      sentMiddleChunksResponse.response = response;
      if (!response.success) {
        // console.log()
        sentMiddleChunksResponse.success = false;
        sentMiddleChunksResponse.IntError = response.IntError;
        sentMiddleChunksResponse.response = response;
        break;
        start = start - chunkSize;
        chunkEnd = start + chunkSize;
      }
      if (i === numberofChunks - 3) {
        start = start - chunkSize;
        chunkEnd = start + chunkSize;
      }
    }
    if (numberofChunks === 1) {
      start = 0;
      chunkEnd = start + chunkSize;
    } else if (numberofChunks === 2) {
      start = chunkSize;
      end = start + chunkSize;
    }
    if (sentMiddleChunksResponse.success) {
      const ResponseEndSendingFinalChunk = await SendingFinalChunk(
        start,
        chunkEnd,
        chunkSize,
        file,
        fileName,
        ResponseSendFirstChunk.response.new_name,
        numberofChunks
      );
    }
    console.log(start);
    console.log(chunkEnd);
    console.log(sentMiddleChunksResponse);
    console.log("completed calling");

    // 25
  }
}

// checking for apis
// if (window.File && window.FileReader && window.FileList && window.Blob) {
//   console.log("All api are present");
// } else {
//   alert("Your browser is too old to support HTML5 File API");
// }
