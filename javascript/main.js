//1. Grab the input text
document.querySelector('.btn1').addEventListener('click', function(){
    var input = document.querySelector('input').value;
    userType(input);
    sendRequest(input);
});
document.querySelector('.input-field').addEventListener('keyup', function(e){
    var input = document.querySelector('input').value;

    // if the key ENTER is pressed...
    if(e.which === 13){
        userType(input);
        sendRequest(input);
    }
});
function userType(type) {
    console.log(type);
}

// what is type by user show in UI
function userType(input){
    var p = document.querySelector('.showUserTypeValue');
    p.innerHTML = 'Showing result for ' + input;
}

// Send Request and Get Data
function sendRequest(input){
    typeByUser = input.split(' ').join('+');
    var url = `https://api.lyrics.ovh/suggest/${typeByUser}`;
    // AJAX Request
    var musicData = new XMLHttpRequest();
    musicData.open( 'GET', url );
    musicData.send();
    musicData.addEventListener('load', function(e){
    var data = e.target.response;
    pushToDOM(data);
});
}
function pushToDOM(inputValue) {
    var response = JSON.parse(inputValue);
    var information = response.data;
    var card = document.querySelector('.card-area');
    clear(card);
    information.map(music => 
        //console.log(music.album.cover_small))
        card.innerHTML += `
        <div class="card">
            <p class="song-title">${music.title}</p>
            <button class="playlist-btn" onclick="playlistButton()">+ Add to Playlist</button>
            <img src="${music.artist.picture_big}" class="image"/>
            <div class="audio-area">
                <audio controls class="audio-area">
                    <source src="${music.preview}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>`);
}

// for playlist 
function playlistButton(){
    var width30 = document.querySelector('.width-30');
    width30.innerHTML = `<h3 class="playlist">Developer is sleeping</h3>`;
}

function clear(item) {
     item.innerHTML = '';
}