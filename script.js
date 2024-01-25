console.log("It's time for JS");
let currentSong = new Audio();

async function getSongs() {
    let response = await fetch("http://127.0.0.1:5500/songs/songs/");
    let htmlText = await response.text();

    let div = document.createElement("div");
    div.innerHTML = htmlText;

    let as = div.querySelectorAll("a");
    let songs = [];

    for (let element of as) {
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/songs/")[1]);
        }
    }

    return songs;
}

const playMusic = (track) => {
    currentSong.src = `/songs/songs/${decodeURIComponent(track)}`;
    currentSong.play();
};

async function main() {
    let songs = await getSongs();
    console.log(songs);

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];

    for (let song of songs) {
        let decodedSong = decodeURIComponent(song);
        songUL.innerHTML += `<li>
            <img class="invert" src="music.svg" alt="musicLogo">
            <div class="info ">
                <div class="songname">${decodedSong}</div>
                <div class="songartist">Gaurav Patel</div>
            </div>
            <div>
                <span class="info2">Play Now</span>
                <img class="invert" src="play.svg" alt="playImg">
            </div>
        </li>`;
    }

    Array.from(songUL.getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".songname").innerHTML.trim());
            playMusic(e.querySelector(".songname").innerHTML.trim());
        });
    });
}

main();
