/listening activity/;
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
      "★ now listening to ---> " + track.name + " - " + track.artist["#text"];
  })
  .catch((error) => {
    document.getElementById("song").innerText = "";
    console.error(error);
  });

/watching activity/;
const TRAKT_CLIENT_ID =
  "91887e3e23bc9c17be6fbdf0a87ca5978a847d7099322b0f15d6e0ca5b9303ea";
const TRAKT_USERNAME = "scytale";

fetch(`https://api.trakt.tv/users/${TRAKT_USERNAME}/watching`, {
  headers: {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": TRAKT_CLIENT_ID,
  },
})
  .then((res) => (res.status === 204 ? null : res.json()))
  .then((data) => {
    const trakt = document.getElementById("trakt-now");

    if (!data) {
      trakt.textContent = "";
      return;
    }

    if (data.type === "movie") {
      trakt.textContent = `★ watching ---> ${data.movie.title} (${data.movie.year})`;
    } else if (data.type === "episode") {
      trakt.textContent = `★ watching ---> ${data.show.title} S${data.episode.season}E${data.episode.number}: ${data.episode.title}`;
    } else {
      trakt.textContent = "";
    }
  })
  .catch(() => {
    document.getElementById("trakt-now").textContent = "";
  });
