Hooks.on("init", () => {
  Hooks.on("renderPlaylistDirectory", (_app, html, _data) => {
    addPlayExclusiveButton(html);
    addStopAllButton(html);
  });
  log("renderPlaylistDirectory modifications hooked");
});

function addPlayExclusiveButton(html) {
  const playExclusiveButton = SoundControl({
    title: game.i18n.localize("PLAY_EXCLUSIVELY"),
    icon: "play-circle",
  }).click(async (event) => {
    event.preventDefault();

    const playlistId =
      event.currentTarget.closest(".playlist").dataset.documentId;
    const { playlists } = game;

    for (let playlist of playlists) {
      if (playlist.id === playlistId) {
        await playlist.playAll();
      } else {
        await playlist.stopAll();
      }
    }
  });

  html.find(".playlist-controls").append(playExclusiveButton);
}

function addStopAllButton(html) {
  const playingDrawer = html.find("#currently-playing");

  if (playingDrawer.length === 0) {
    return;
  }
  let stopAllButton = playingDrawer.find(".stop-all");
  if (stopAllButton.length === 0) {
    const stopAllButton = SoundControl({
      title: game.i18n.localize("STOP_ALL"),
      icon: "circle-stop",
    })
      .click(async (event) => {
        event.preventDefault();

        const { playlists } = game;

        for (let playlist of playlists) {
          await playlist.stopAll();
        }
      })
      .css({
        "justify-self": "end",
        "justify-content": "end",
        "align-self": "center",
        flex: "0",
        "padding-right": "10px",
      });
    playingDrawer.find(".playlist-header").append(stopAllButton);
  }
}

function SoundControl(props = {}) {
  const { title, icon } = props;
  const control = $(
    `<a class="sound-control"><i class="fas fa-${icon}" title="${title}"></i></a>`
  );
  return control;
}

function log(msg) {
  console.log("Maru's Playlist Enhancements |", msg);
}
