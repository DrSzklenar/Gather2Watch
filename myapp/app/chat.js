const ws = new WebSocket("ws:87.229.6.116:5500");

// chat  
let chatForm = document.getElementById('chatForm');
let messageinput = document.getElementById('messageinput');
let nevinput = document.getElementById('nevinput');
let reciever = document.getElementById('reciever');

let nevek = ['atrasuluj','Tron','BleachII','rainpour','lolBeardlol','NitroHead','Facer','footboalgundog2010','Zapp_Ackerman','ClownDown','sO_cRaZY','malter_ego','Flo_rida','CircleOFgambit','sinple','creamybridget2000','mrmrmrmrmrmDream','boga_discorda','[WORT]Tron','(Fin)[Ich]LINE','Rand00m','LUSERNAME','massEker','Killua_Ackerman','astabonkus','helL-TAKER','unhinged','tomatonator','DeathMauler','TripL4SH','quanter2','DJErrickCion','Fluper_Kukker','2000fortitudes','Ping[WIN]HARCOS','Ultimater','BrapperFarter','RayZin','giveUP','Raptor_csapat','ComicLoop','screwshit','frog_lover','MCbendO','a[TOMI]c','Zerohero','pvpROCKYROCKY','emerardo sprasho','plaxbales','killfuck','BGPsortofin','Suhajda_Bokkit','coatshangerAsh','kukudlack','femboy_hater','Yuto_on_Pluto','[N/A]EmptyNull','WhiteStoneSun','Tnya_4_7rechauf','noisy_hair','KOROSHI_black','pedro_sharingan','SupersonicWereRU','Zennie_tspringer','BUSTARRR','PixelMania','owoDash','sayitAprit','dave','Radoooo','Mieruko_Garage','Finngasch','Von_Zugg_suja','Babiden_Bettebon','KilluaLovesJews','Chorogon','Rokuro_x_Benio','Mr_Byn','ratty_memes_wtf','PROpeller','Schulletlen','Lemon3McGuk','hurkerDiusker'];

let nev = "";
let uzi = "";
let roomid = "111";

// youtube
let linkInput = document.getElementById("loadVideoById");
let PlayPause = document.getElementById("PlayPause");
let isPaused = true;
let ytvideoState = document.getElementById("ytvideoState");


var tag = document.createElement('script');
var startTime = -1;
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[1];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;                   
// You Tube player object


ws.addEventListener("open", (event) => {
    event.preventDefault();
    if (localStorage.getItem("nev") === null) {
        nev = nevek[Math.floor(Math.random() * nevek.length)];
        localStorage.setItem("nev", nev);
        console.log("mostant??l " + nev + " a neved");
        nevinput.value = nev;
    }
    else{
        nev = localStorage.getItem("nev");
        nevinput.value = nev;
    }
    console.log("We are connected! " + nev);
    ws.send(JSON.stringify({
        msgType: "connect",
        adat: roomid
    }));
});
//A websocket open eventj??n ez a function fut le. Ez akkor t??rt??nik amikor egy kliens csatlakozik a websocket serverhez
//Egy random n??v gener??l??s??val kezd ha m??g m??g nincs n??v elmentve
//localstorage-ba menti


nevinput.addEventListener("blur", nameSave);
//ha ki kattint a n??v inputj??b??l akkor el menti


function nameSave() {
    console.log("kragabenoritoggen");
    if (nevinput.value == "") {
        nev = nevek[Math.floor(Math.random() * nevek.length)];
        nevinput.value = nev;
        localStorage.setItem("nev",nev);
    }
    else
    {
        
        nev = nevinput.value;
        localStorage.setItem("nev",nev);
        console.log("mostant??l " + nev + " a neved");
    }
}
//Ha n??v ment??sekor ??ppen ??res a mez?? akkor random gener??l egy nevet a nevek t??mbb??l.
//A nevet localstorage-ben t??rolja




chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    uziRot = `<b>${nev}:</b> ${messageinput.value}`;
    uzi = uziRot.replace(/felx/gi,'hurka');
    sendAmessage(uzi);
    messageinput.value = '';
});
//Clickel??s a chatForm submit gomb??ja fel t??lt egy v??ltoz??t a messageinput nev?? input ??rt??k??vel ??s az elt??rolt n??vvel.
//Ezut??n megh??vja a sendAmessage functiont az uzenettel param??terk??nt ??s t??rli az input tartalm??t.



function sendAmessage(paramAdat) {
    ws.send(JSON.stringify({
        msgType: "msg",
        adat: paramAdat
    }));
}
//Stringg?? alak??t egy json objektumot ??s megh??vja a websocketsbe be??p??tett send funkci??t ami egy string-et k??ld
//A stringg?? alak??tott json jelenleg 2 tulajdons??ggal rendelkezik: msgType: az ??zenet t??pusa. ami most ??zenet t??pus??
//??s adat: ami most az ??zenet tartalma lesz

function recieveAmessage(text) {
    if (Math.abs(reciever.scrollHeight - reciever.clientHeight - reciever.scrollTop) <= 20) {
        console.log("works");
        reciever.innerHTML += `<p class="uzenet">${text}</p><br>`;
        reciever.lastChild.scrollIntoView();
    }
    else{
        
        reciever.innerHTML += `<p class="uzenet">${text}</p><br>`;
    }

}
//Ennek a functionnak a param??tere a websockett??l kapott ??zenet lesz.
//Ha a cseveg??ablak alj??n j??r a felhaszn??l?? akkor lejebb teker, ha nincs a tetej??n akkor nem ugrik, hogy a felhaszn??l??
//megszak??t??smentesen olvashassa a kor??bbi ??zeneteket

ws.addEventListener("message", (event) => {
    let ballsData = JSON.parse(event.data);
    console.log(event);
    switch (ballsData.msgType) {
        //case user:
        //function listusers
        case "msg":
            recieveAmessage(ballsData.adat);
            break;
        case "video":
            VidRecieve(ballsData.adat);
            break;
        case "action":
            if (ballsData.adat == "pause") {
                // player.pauseVideo();
                jsPlayer.play()
                isPaused = true;
            }
            else{
                // player.playVideo();
                jsPlayer.pause();
                isPaused = false;
            }
            break;
        case "connect":

            break;
        
        default:
            break;
    }
});
//A websocketnek a message eventj??hez egy event listenert adunk.
//el??ssz??r egy v??ltoz??ba ker??l mag??nak az eventnek az adatai. amit egy jsonn?? v??ltoztatunk
//Egy switch ami az el??bb megadott msgType tulajdons??got vizsg??lja, a megfelel?? functiont meg h??vja az adat tulajdons??g ??rt??k??vel.


// chat end



// When You Tube API is ready, create a new 
// You Tube player in the div with id 'player'
// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player_div',
//         {
//             videoId: 'Dfv8qgrQNKk',   // Load the initial video
//             playerVars: {
//                 autoplay: 1,      // Don't autoplay the initial video
//                 rel: 0,           //  Don???t show related videos
//                 theme: "light",   // Use a light player instead of a dark one
//                 controls: 1,      // Show player controls
//                 showinfo: 0,      // Don???t show title or loader
//                 modestbranding: 1, // No You Tube logo on control bar
//                 enablejsapi: 1
//             },
//             events: {
//                 // Callback when onReady fires
//                 onReady: onReady,

//                 // Callback when onStateChange fires
//                 onStateChange: onStateChange,

//                 // Callback when onError fires
//                 onError: onError
//             }
//         });

// }
// Callback specified to process the onReady event has been received
// so can proceed with creating and managing You Tube player(s)


//Ez a youtube player ??rt felel. publikusan el??rhet?? a youtube api oldal??n

// Log state changes
// function onReady(event) {
//     player.playVideo();
//     console.log("Kaklanafffffffff");
//     setTimeout(function () {
//         player.pauseVideo();
//     }, 700);
//     event.target.setVolume(5);
//     $('#PlayPause').click(function (event) {
//         if (isPaused == false) {
//             ws.send(JSON.stringify({
//                 msgType: "action",
//                 adat: "pause"
//             }));

//         }
//         else {
//             ws.send(JSON.stringify({
//                 msgType: "action",
//                 adat: "play"
//             }));
//         }
        
//     });
//     ytvideoState.innerText = player.getPlayerState();
// }

$('#PlayPause').click(function (event) {
        if (isPaused == false) {
            ws.send(JSON.stringify({
                msgType: "action",
                adat: "pause"
            }));

        }
        else {
            ws.send(JSON.stringify({
                msgType: "action",
                adat: "play"
            }));
        }
        
    });

// 4. The API calls this function when the player's state changes.
// function onStateChange(event) {
//     ytvideoState.innerText = player.getPlayerState();
//     if (player.getPlayerState == '-1') {
//         event.player.playVideo();
//         event.player.playVideo();
//         event.player.playVideo();
//         console.log("puraein");
//     }
// }



// Log any errors
// function onError(event) {
//     var error = "undefined";
//     switch (event.data) {
//         case 2:
//             error = "Invalid parameter value";
//             break;
//         case 5:
//             error = "HTML 5 related error";
//             break;
//         case 100:
//             error = "Video requested is not found";
//             break;
//         case 101:
//             error = "Embedded playback forbidden by ownder";
//             break;
//         case 150:
//             error = "Error processing video request";
//             break;
//         default:
//             error = "unknown (" + event.data + ")";
//     }

// }


// linkForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     VidSend();
//     messageinput.value = '';
// });

let jsLinkPutter = document.getElementById("jsLinkPutter");
let VideoJsLoadVid = document.getElementById("VideoJsLoadVid");
console.log(jsLinkPutter);

let jsPlayer = videojs('myVideoJs');


jsLinkPutter.addEventListener("submit", (e) =>{
    e.preventDefault();
    VidSend();
});


function JsPlayThis(videoURL) {
    jsPlayer.src({ type: "video/youtube", src: videoURL});
    jsPlayer.load();
    isPaused = false;
    // jsPlayer.play();
}

function VidSend() {
    ws.send(JSON.stringify({
        msgType: "video",
        // adat: linkInput.value
        adat: VideoJsLoadVid.value
    }));
}
function VidRecieve(data) {
    // player.loadVideoById({ videoId: data });
    JsPlayThis(data);
    document.getElementById('myVideoJs').click();
}

document.getElementById('myVideoJs').addEventListener('click', () => {
    console.log("Basz??s!");
});