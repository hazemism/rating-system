/last.fm/;
fetch(
  "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=hazemfarouk&api_key=a6f725dafa7d37704451de78615c9fce&format=json",
)
  .then((res) => res.json())
  .then((data) => {
    const song = document.getElementById("song");
    const track = data.recenttracks.track[0];

    if (track["@attr"]?.nowplaying !== "true") {
      song.style.display = "none";
      return;
    }

    document.getElementById("song").innerText =
      "now listening to ---> " + track.name + " - " + track.artist["#text"];
  })
  .catch((error) => {
    document.getElementById("song").innerText = "none";
    console.error(error);
  });
