fetch(
  "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=hazemfarouk&api_key=a6f725dafa7d37704451de78615c9fce&format=json",
)
  .then((res) => res.json())
  .then((data) => {
    const track = data.recenttracks.track[0];

    document.getElementById("song").innerText =
      "now listning to ---> " + track.name + " - " + track.artist["#text"];
  })
  .catch((error) => {
    document.getElementById("song").innerText = "could not load song";
    console.error(error);
  });
