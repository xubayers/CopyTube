import { getIdEl, getQueryEl } from "./lib.js";

// get elements
const videosContainer = getIdEl("videos-container");

let id = [getIdEl, getQueryEl];

// make local databege
(function dataBage() {
  let data = {
    videos: [],
  };

  if (!localStorage.getItem("datas")) {
    localStorage.setItem("datas", JSON.stringify(data));
  }

  if (!localStorage.getItem("parent-title")) {
    localStorage.setItem("parent-title", "Push Your Title Here");
  }
  const parentTitle = getIdEl("parentTitle");
  parentTitle.innerText = localStorage.getItem("parent-title");

  let getVideos = JSON.parse(localStorage.getItem("datas"));
  if (getVideos.videos.length >= 1) {
    displayVideos(getVideos.videos);
  }
})();

function displayVideos(videos) {
  videosContainer.innerHTML = "";
  getIdEl("total-video").innerText =
    videos.length <= 9 ? "0" + videos.length : videos.length;

  videos.forEach((video) => {
    let div = document.createElement("div");
    div.classList.add(
      "hover:bg-neutral-700",
      "p-1",
      "rounded-sm",
      "transition-all",
      "duration-100"
    );
    div.innerHTML = `
        <div class="flex gap-2 items-center justify-between cursor-pointer relative">
  <div class="flex items-center gap-2 w-full">
    <p class="text-xs">
      ${video.id.toString().length === 1 ? "0" + video.id : video.id}
    </p>
    <div class="h-14 aspect-video rounded-md">
      <div
        class="video w-full h-full border rounded-lg bg-gray-300 opacity-30"
      ></div>
    </div>
    <div class="self-start">
      <h2 class="text-sm" id="all-video-title">${video.title}</h2>
      <p class="text-xs opacity-85">${video.cname}</p>
    </div>
  </div>
  <details class="relative">
    <summary
      class="cursor-pointer p-1 list-none hover:bg-neutral-900 rounded-full z-20"
      id="editVideoMeterial"
    >
      <ion-icon name="ellipsis-vertical"></ion-icon>
    </summary>
    <div class="absolute top-10 right-5 p-2  bg-neutral-600 rounded-md shadow-md flex gap-5 text-2xl">
      <p title="edit Info"><ion-icon name="create-outline"></ion-icon></p>
      <p title="delete video"><ion-icon name="trash-outline"></ion-icon></p>
    </div>
  </details>
</div>
        `;

    div.addEventListener("click", function () {
      playVideo(video);
    });
    videosContainer.appendChild(div);

    getQueryEl("#editVideoMeterial").addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
}

// add video container
const addItem = getIdEl("add-item");
addItem.addEventListener("click", () => {
  const addVideoContainer = getIdEl("add-video-container");
  addVideoContainer.classList.remove("hidden");

  const closeAddVideoContainer = getIdEl("close-add-video-container");
  closeAddVideoContainer.addEventListener("click", () => {
    addVideoContainer.classList.add("hidden");
  });
});

// upload video
function uploadNewVideo(allVideos) {
  try {
    console.log("video uploaded");
    const channelName = getIdEl("cname");
    const addNewTitle = getIdEl("add-title");
    const addNewUrl = getIdEl("add-url");
    const views = getIdEl("views");
    const likes = getIdEl("likes");
    console.log(allVideos.videos);
    let id = allVideos.videos[allVideos.videos.length - 1]?.id + 1 || 1;
    const newVideo = {
      id,
      cname: channelName.value,
      title: addNewTitle.value,
      url: `https://www.youtube.com/embed/${addNewUrl.value.slice(17)}`,
      views: views.value,
      subs: likes.value,
    };
    allVideos.videos.push(newVideo);
    displayVideos(allVideos.videos);
    localStorage.setItem("datas", JSON.stringify(allVideos));

    // clean inputs
    channelName.value = "";
    addNewTitle.value = "";
    addNewUrl.value = "";
    views.value = "";
    likes.value = "";
  } catch (err) {
    console.log("theres a mistake plaese try again");
    console.log(err);
  }
}

function controlDebounce(uploadNewVideoFunc, delay, allVideos) {
  let timerId;
  return function () {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      console.log("now clicked");
      uploadNewVideoFunc(allVideos);
    }, delay);
  };
}

// Upload video trigger btn
const uploadVideo = getIdEl("uploadVideo");
uploadVideo.addEventListener(
  "click",
  controlDebounce(
    uploadNewVideo,
    1000,
    JSON.parse(localStorage.getItem("datas"))
  )
);
// play video
function playVideo({ cname, title, url, views, subs }) {
  getIdEl("video").setAttribute("src", url);
  getIdEl("video-title").innerText = title;
  getIdEl("channel-name").innerText = cname;
  getIdEl("subs-count").innerText = subs || "N/A - subscriber";
  getIdEl("views").innerText = views;
}
//  videos parent title menu bar
getIdEl("changeTitle").addEventListener("click", function () {
  const parentTitle = getIdEl("parentTitle");
  let changeTitle = prompt("change the title", parentTitle.innerText);

  localStorage.setItem("parent-title", changeTitle);
  parentTitle.innerText = localStorage.getItem("parent-title");
});
// video show edit option
function showEditptions() {
  alert("say hi");
}
