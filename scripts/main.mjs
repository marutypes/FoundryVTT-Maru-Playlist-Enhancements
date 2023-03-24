Hooks.on('init', () => {
    Hooks.on('renderPlaylistDirectory', (app, html, data) => {
      const playExclusiveButton = $('<button class="play-exclusively"><i class="fas fa-circle-play"></i> Play Exclusively</button>');
  
      playExclusiveButton.click(async (event) => {
        event.preventDefault();
        
        const playlistId = event.currentTarget.closest('.playlist').dataset.playlistId;
        const playlists = game.playlists.entities;
  
        for (let playlist of playlists) {
          if (playlist.id === playlistId) {
            await playlist.playAll();
          } else {
            await playlist.stopAll();
          }
        }
      });
  
      html.find('.playlist-controls').append(playExclusiveButton);
    });
  });