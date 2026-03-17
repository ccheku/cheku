
fetchProfile()
setInterval(fetchStatus, 1000);

async function fetchProfile() {
  try {
    const response = await fetch('https://api.lanyard.rest/v1/users/491473057538506763');
    const result = await response.json();
    console.log(result);

    // Data variables
    const data = result.data;

    if (result && data && data.discord_user) {
      avatar.src = `https://cdn.discordapp.com/avatars/491473057538506763/${data.discord_user.avatar}.png`;
    }
    if (result && data && data.discord_user) {
      switch (data.discord_user.global_name) {
        case null:
          username.innerHTML = '<i class="fa-brands fa-discord"></i> ' + `${data.discord_user.username}`;
          break;
        case data.discord_user.username:
          username.innerHTML = `${data.discord_user.username}`;
          break;
        default:
          username.innerHTML = `${data.discord_user.global_name} (${data.discord_user.username})`;
      }

    } else {
      username.innerHTML = "User data not found";
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    username.innerHTML = "Error loading user";
  }

}

async function fetchStatus() {
  try {
    const response = await fetch('https://api.lanyard.rest/v1/users/491473057538506763');
    const result = await response.json();
    const data = result.data;
    const discord_status = data.discord_status;
    const spotify = data.spotify;

    // Discord Status

    if (result && data && discord_status) {
      const discordStatus = document.getElementById("discordStatus");
      const avatar = document.getElementById("avatar");
      discordStatus.innerHTML = discord_status.toUpperCase();
      switch (discord_status) {
        case "online":
          discordStatus.style.backgroundColor = "rgb(37, 166, 90)";
          discordStatus.style.boxShadow = "0 0 10px rgb(37, 166, 90)";
          avatar.style.boxShadow = "0 0 25px rgba(37,166,90,0.1), 0 6px 20px rgba(0,0,0,0.6)"
          break;
        case "idle":
          discordStatus.style.backgroundColor = "rgb(241, 175, 49)";
          discordStatus.style.boxShadow = "0 0 10px rgb(241, 175, 49)";
          avatar.style.boxShadow = "0 0 25px rgba(241, 175, 49,0.1), 0 6px 20px rgba(0,0,0,0.6)"
          break;
        case "dnd":
          discordStatus.innerHTML = 'DO NOT DISTURB';
          discordStatus.style.backgroundColor = "rgb(239, 64, 65)";
          discordStatus.style.boxShadow = "0 0 10px rgb(239, 64, 65)";
          avatar.style.boxShadow = "0 0 25px rgba(239, 64, 65,0.1), 0 6px 20px rgba(0,0,0,0.6)"
          break;
        case "offline":
          discordStatus.style.backgroundColor = "rgb(150, 150, 161)";
          discordStatus.style.boxShadow = "0 0 10px rgb(150, 150, 161)";
          avatar.style.boxShadow = "0 0 25px rgba(150, 150, 161,0.1), 0 6px 20px rgba(0,0,0,0.6)"
          break;
      }
    }

    // Spotify

    if (result && data && data.listening_to_spotify && spotify) {
      const spotifyArt = document.getElementById("album");

      spotifyArt.src = spotify.album_art_url;
      trackLink.href = `https://open.spotify.com/track/${spotify.track_id}`
      music.style.display = "flex"

      // Splitting song and artists

      song.innerHTML = spotify.song.split("(feat")[0].split("(with")[0];
      artist.innerHTML = spotify.artist.split(";")[0];

      // Progress Bar
      progress.style.opacity = "1";
      const spotifyStart = spotify.timestamps.start;
      const spotifyEnd = spotify.timestamps.end;
      const now = Date.now();

      const elapsedMs = now - spotifyStart;
      const elapsedSeconds = Math.floor(elapsedMs / 1000);

      const songMilliseconds = spotifyEnd - spotifyStart
      songLength = Math.floor(songMilliseconds / 1000)

      updateProgressBar(elapsedSeconds, songLength)

      function updateProgressBar(elapsed, total) {
        const percent = (elapsed / total) * 100;
        bar.style.width = `${percent}%`;
      }
    } else {
      music.style.display = "none";
    }
  } catch (error) {
    console.error('Error fetching status:', error);
  }
}
