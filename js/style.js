console.log("Welcome to Spotify");

//Initiliaze the variables
let songIndex = 0;
let audioElement = new Audio("/songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let next = document.getElementById("next");
let songName = document.getElementById("songName");
let previous = document.getElementById("previous");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));
let flag=0;

let songs=[
    {songName:"Machayenge by Emiway Bantai", filePath:"songs/1.mp3", coverpath:"covers/1.jpg"},
    {songName:"Pachtaoge by Arijit Singh", filePath:"songs/2.mp3", coverpath:"covers/2.jpg"},
    {songName:"Mile Ho Tum (Reprise)", filePath:"songs/3.mp3", coverpath:"covers/3.jpg"},
    {songName:"Aankh Marey by Kumar Sanu", filePath:"songs/4.mp3", coverpath:"covers/4.jpg"},
    {songName:"Muqabla by Parampara Tandon", filePath:"songs/5.mp3", coverpath:"covers/5.jpg"},
    {songName:"Shaitan Ka Saala by Sohail Sen", filePath:"songs/6.mp3", coverpath:"covers/6.jpg"},
    {songName:"Goa Beach by Neha Kakkar", filePath:"songs/7.mp3", coverpath:"covers/7.jpg"},
    {songName:"Illegal Weapon 2.0 by Garry Sandhu", filePath:"songs/8.mp3", coverpath:"covers/8.jpg"},
    {songName:"Swag Se Swagat by Neha Bhasin", filePath:"songs/9.mp3", coverpath:"covers/9.jpg"},
    {songName:"O Saki Saki by B Praak", filePath:"songs/10.mp3", coverpath:"covers/10.jpg"},
]

songItem.forEach((element, i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    // element.getElementsByClassName("timestamp")[0].innerText = songs[i].filePath.duration;
})

const makeAllPlays = ()=>{
    songItemPlay.forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
        console.log("2");
    })
}

songItemPlay.forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(songIndex+" "+parseInt(e.target.id));
        if(songIndex==parseInt(e.target.id) && flag==1){
            audioElement.pause();
            makeAllPlays();
            gif.style.opacity=0;
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
            gif.style.opacity=0;
            flag=0;
        }
        else if(audioElement.paused || audioElement.currentTime<=0 || flag==1){
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            console.log(songIndex);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex}.mp3`;
            songName.innerText = songs[songIndex-1].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity=1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            flag=1;
        }
        else{
            audioElement.pause();
            makeAllPlays();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            gif.style.opacity=0;
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
            gif.style.opacity=0;
            flag=0;
        }
    })
})
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity=0;
        makeAllPlays();
    }
})
audioElement.addEventListener('timeupdate',()=>{
    // console.log("timeupdate");
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

previous.addEventListener('click',()=>{
    if(songIndex<=0)
        songIndex=0;
    else
        songIndex = songIndex-1;
    audioElement.src = `songs/${songIndex}.mp3`;
    songName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
next.addEventListener('click',()=>{
    if(songIndex>=9)
        songIndex=0;
    else
        songIndex = songIndex+1;
    audioElement.src = `songs/${songIndex}.mp3`;
    songName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
