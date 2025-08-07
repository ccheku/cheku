      /*while (true) {
        setTimeout(fetchStatus, 5000)
      }*/

      setInterval(fetchStatus, 1000);

      async function fetchStatus() {
        try {
          const response = await fetch('https://api.lanyard.rest/v1/users/491473057538506763');
          const result = await response.json();
          console.log(result);

          // Data variables
          const data = result.data;
          const discord_status = data.discord_status;
          const spotify = data.spotify;

          if (result && data && data.discord_user) {
            document.getElementById("userProfile").src = `https://cdn.discordapp.com/avatars/491473057538506763/${data.discord_user.avatar}.png`;
            document.getElementById("userProfile").style.marginRight = "10px";
          }
          if (result && data && data.discord_user) {
            document.getElementById("username").innerHTML = `${data.discord_user.display_name} (${data.discord_user.global_name})`;
            document.getElementById("titleName").innerHTML = data.discord_user.display_name;
          } else {
            document.getElementById("username").innerHTML = "User data not found";
          }

          // Discord Status
          if (result && data && discord_status) {
            document.getElementById("discordStatus").innerHTML = discord_status;
            if (discord_status === "online") {
              document.getElementById("discordStatus").style.backgroundColor = "rgb(67, 162, 90)";
              document.getElementById("discordStatus").style.borderStyle = "none";
              discordStatus.style.boxShadow = "0 0 10px rgb(67, 162, 90)";

            } else if (discord_status === "idle") {
              document.getElementById("discordStatus").style.backgroundColor = "rgb(202, 150, 84)";
              document.getElementById("discordStatus").style.borderStyle = "none";
              discordStatus.style.boxShadow = "0 0 10px rgb(202, 150, 84)";

            } else if (discord_status === "dnd") {
              document.getElementById("discordStatus").innerHTML = 'Do Not Disturb';
              document.getElementById("discordStatus").style.backgroundColor = "rgb(216, 58, 66)";
              document.getElementById("discordStatus").style.borderStyle = "none";
              discordStatus.style.boxShadow = "0 0 10px rgb(216, 58, 66)";

            } else if (discord_status === "offline") {
              document.getElementById("discordStatus").style.backgroundColor = "rgb(130, 131, 139)";
              document.getElementById("discordStatus").style.borderStyle = "none";
              discordStatus.style.boxShadow = "0 0 10px rgb(130, 131, 139)";
            }
          }

          // Spotify
          if (result && data && data.listening_to_spotify && spotify) {
            document.getElementById("spotifyArt").src = spotify.album_art_url;
            document.getElementById("spotifyArt").style.marginRight = "10px";
            document.getElementById("spotifyArt").style.marginLeft = "0px";
            document.getElementById("trackLink").href = `https://open.spotify.com/track/${spotify.track_id}`;
            /* // Album Checks 
            if (spotify.album === spotify.artist) {
              document.getElementById("spotifyAlbum").innerHTML = "Self-Titled |";
            } else if (spotify.album === spotify.song) {
              document.getElementById("spotifyAlbum").innerHTML = "";
            } else {
              document.getElementById("spotifyAlbum").innerHTML = spotify.album + ' |';
            }
            */
            document.getElementById("spotifyTrack").innerHTML = spotify.song + ' |';
            document.getElementById("spotifyArtist").innerHTML = spotify.artist;
            document.getElementById("progress-container").style.borderStyle = 'solid';

            const spotifyStart = spotify.timestamps.start;
            const spotifyEnd = spotify.timestamps.end;
            const now = Date.now();

            const elapsedMs = now - spotifyStart;
            const elapsedSeconds = Math.floor(elapsedMs / 1000);

            const songMilliseconds = spotifyEnd - spotifyStart
            songLength = Math.floor(songMilliseconds / 1000)

            function formatTime(seconds) {
              const mins = Math.floor(seconds / 60);
              const secs = Math.floor(seconds % 60);
              return `${mins}:${secs.toString().padStart(2, '0')}`;
            }

            document.getElementById("songDuration").innerHTML = `${formatTime(elapsedSeconds)}/${formatTime(songLength)}`
            updateProgressBar(elapsedSeconds, songLength)
            
            function updateProgressBar(elapsed, total) {
              const percent = (elapsed / total) * 100;
              document.getElementById("progress-bar").style.width = `${percent}%`;
            }
          } else {
            document.getElementById("spotifyArt").src = "transparent-placeholder.png";
            document.getElementById("spotifyArt").style.marginLeft = "8px";
            document.getElementById("spotifyArt").style.marginRight = "0px";
            document.getElementById("spotifyTrack").innerHTML = '';
            document.getElementById("spotifyArtist").innerHTML = '';
            document.getElementById("trackLink").href = "";
            document.getElementById("progress-container").style.borderStyle = 'none';
            document.getElementById("progress-bar").style.width = `0%`;
            document.getElementById("songDuration").innerHTML = ``

          }

        } catch (error) {
          console.error('Error fetching status:', error);
          document.getElementById("username").innerHTML = "Error loading user";
        }
      }

      function lightMode() {
        if (document.getElementById("body").style.backgroundColor === "black") {
          document.getElementById("body").style.backgroundColor = "white";
          document.getElementById("body").style.color = "black";
          document.getElementById("lightModeButton").innerHTML = "🌙";
          document.getElementById("discordStatus").style.color = "black";
          document.getElementById("discordStatus").style.borderColor = "black";
          document.getElementById("progress-container").style.borderColor = "black";
          document.getElementById("progress-bar").style.backgroundColor = "black";
          document.getElementById("discordIcon").src = 'discord-black.png';
          document.getElementById("steamIcon").src = 'steam-black.png';
          if (document.getElementById("discordStatus").style.backgroundColor === "black") {
            document.getElementById("discordStatus").style.backgroundColor = "white";
          }
        } else {
          document.getElementById("body").style.backgroundColor = "black";
          document.getElementById("body").style.color = "white";
          document.getElementById("lightModeButton").innerHTML = "☀️";
          document.getElementById("discordStatus").style.color = "white";
          document.getElementById("discordStatus").style.borderColor = "white";
          document.getElementById("progress-container").style.borderColor = "white";
          document.getElementById("progress-bar").style.backgroundColor = "white";
          document.getElementById("discordIcon").src = 'discord-white.png';
          document.getElementById("steamIcon").src = 'steam-white.png';
          if (document.getElementById("discordStatus").style.backgroundColor === "white") {
            document.getElementById("discordStatus").style.backgroundColor = "black";
          }
        }
      }