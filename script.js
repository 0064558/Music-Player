const songName = document.getElementById('song-name');
const artistName = document.getElementById('artist-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');


const crackComMussilon = {
    songName : 'Crack com Mussilon',
    artist : 'Matuê',
    file : 'Crack com Mussilon',
    liked: false,
};

const imaginaEsseCenario = {
    songName : 'Imagina Esse Cenário',
    artist : 'Matuê, Veigh',
    file : 'Imagina esse Cenário',
    liked: false,
};

const issoEserio = {
    songName : 'Isso é Sério',
    artist : 'Matuê, Brandão85',
    file : 'Isso é Sério',
    liked: false,
};

const umNoveNoveTres = {
    songName : '1993',
    artist : 'Matuê',
    file : '1993',
    liked: false,
};

const fortal = {
    songName : '4Tal',
    artist : 'Matuê, Teto',
    file : '4Tal',
    liked: false,
};

const oSom = {
    songName : 'O Som',
    artist : 'Matuê',
    file : 'O Som',
    liked: false,
};

const quatroDaManha = {
    songName : '04AM',
    artist : 'Matuê',
    file : '04AM',
    liked: false,
};

const castlevania = {
    songName : 'Castlevania',
    artist : 'Matuê',
    file : 'Castlevania',
    liked: false,
};

const vDeVilao = {
    songName : 'V de Vilão',
    artist : 'Matuê',
    file : 'V de Vilão',
    liked: false,
};

const maria = {
    songName : 'Maria',
    artist : 'Matuê',
    file : 'Maria',
    liked: false,
};

const tresTresTres = {
    songName : '333',
    artist : 'Matuê',
    file : '333',
    liked: false,
};

const likeThis = {
    songName : 'Like This!',
    artist : 'Matuê',
    file : 'Like This!',
    liked: false,
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
/*const album = [crackComMussilon, imaginaEsseCenario, issoEserio, umNoveNoveTres, fortal, oSom, quatroDaManha, castlevania, vDeVilao, maria, tresTresTres, likeThis];*/
const album = JSON.parse(localStorage.getItem('album')) ?? [crackComMussilon, imaginaEsseCenario, issoEserio, umNoveNoveTres, fortal, oSom, quatroDaManha, castlevania, vDeVilao, maria, tresTresTres, likeThis];
let sortedAlbum = [...album];
let index = 0;

function playSong() {
    play.querySelector('.bi').classList.remove('bi-play');
    play.querySelector('.bi').classList.add('bi-pause');
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector('.bi').classList.add('bi-play');
    play.querySelector('.bi').classList.remove('bi-pause');
    song.pause();
    isPlaying = false;
}

function playPauseDecider() {
    if (isPlaying === true) {
        pauseSong();
    } else {
        playSong();
    }
}

function likeButtonRender() {
    if (sortedAlbum[index].liked === true) {
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    } else {
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.remove('button-active');
    }
}

function initializeSong() {
    cover.src = "img/333-Capa.png";
    song.src = `songs/${sortedAlbum[index].file}.mp3`;
    songName.innerText = sortedAlbum[index].songName;
    artistName.innerText = sortedAlbum[index].artist;
    likeButtonRender();
}

function previousSong() {
    if(index === 0) {
        index = sortedAlbum.length - 1;
    } else {
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong() {
    if(index === sortedAlbum.length - 1) {
        index = 0;
    } else {
        index += 1;
    }
    initializeSong();
    playSong();
}

function updateProgress() {
    const barWidth = (song.currentTime/song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);

    songTime.innerText = toHHMMSS(song.currentTime);
}

/*function jumpTo(event) {
    
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
}*/

/*function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0) {
        let randomIndex = Math.floor(Math.random()* size);
        let aux = preShuffleArray(currentIndex);
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}*/

/*function shuffleButtonClicked() {
    if (isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedAlbum);
        shuffleButton.classList.add('button-active');
    } else {
        isShuffled = false;
        sortedAlbum = [...album]
        shuffleButton.classList.remove('button-active');
    }
}*/

function repeatButtonClicked() {
    if (repeatOn === false) {
        repeatOn = true;
        repeatButton.classList.add('button-active');
        console.log('Repetir ligado');
    } else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');
        console.log('Repetir desligado');
    }
}

function nextOrRepeat() {
    if (repeatOn === false) {
        nextSong();
    } else {
        playSong();
    }
}

function toHHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - hours * 3600)/60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours !== 0 ? hours.toString().padStart(2, '0') + ":" : ""}${min

        .toString()
    
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTotalTime() {
    totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonClicked() {
    if(sortedAlbum[index].liked === false) {
        sortedAlbum[index].liked = true;
    } else {
        sortedAlbum[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('album', JSON.stringify(album));
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('loadedmetadata', updateTotalTime);
/*shuffleButton.addEventListener('click', shuffleButtonClicked);*/
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);