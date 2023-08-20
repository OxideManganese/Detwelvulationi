const fetch = (...args) => import('node-fetch').then(({
    default: fetch
  }) => fetch(...args));
  
  exports.handler = async function(event, context) {
  
    const response = await fetch(`http://seraph.it/Detwelvulation.html`);
    let page = await response.text();
    page = page.split('<div id="content">')[1].split('<!-- End main content wrapper -->')[0];
  
    let list2 = [];
    let tracklist = ``;
    let list = page.split(`rel="external">`);

    list.forEach((elem, i) => {
      if (i > 0) {
        let track = elem.split('</a>')[0]
        let links = elem.split(`http://`);
        links.forEach((e, i) => {
          links[i] = `http://` + e.split(`"`)[0]
        })
        if (track != "movie") list2.push({
          name: track,
          mp3: links.find(elem => elem.indexOf(".mp3") != -1),
          mov: links.find(elem => elem.indexOf(".mov") != -1),
          youtube: links.find(elem => elem.indexOf("youtube") != -1),
        });
      }
    })
  
    console.log(list2);
  
    let html = `<h1>Detwelvulation Project <i style="color: darkgreen;">by Carlo Serafini</i></h1>
  <p>Detwelvulation Project is a collection of original Xenharmonic compositions in a variety of alternative tuning systems. This is Carlo Serafini's most streamed album on Last.fm with over 800 scrobbles</p>
  <p>On this site you can listen to and download all the tracks from <a href="http://seraph.it/">Carlo Serafini's</a> Detwelvulation project for free. Developer of this site: <a href="https://t.me/OxideManganese">@OxideManganese</a></p>
  <p>To download all tracks at once (≈1Gb), press Ctrl+S and select the save directory.</p>
  <image src="https://ia802705.us.archive.org/3/items/FastAndFurious13/detwelvulation.jpg" width="300" alt="cover">`
  
    list2.forEach((track, i) => {
      html += `<h3>${list2.length - i}. Carlo Serafini - ${track.name}</h3>`
      if (track.mp3) html += `<audio controls src="${track.mp3}"></audio>`;
  
  
      if (track.mov) html += `<video width="300" height="210" src="${track.mov}" controls="controls" poster="http://seraph.it/Detwelvulation_files/page17_sidebar_1.jpg"></video>`;
  
      html += `<div class="knopki">
    <a href="https://www.last.fm/ru/music/Carlo+Serafini/Detwelvulation+Project/${track.name}" target="_blank">
    <img src="https://www.last.fm/static/images/lastfm_avatar_applemusic.b06eb8ad89be.png" alt="Last.fm" width="40" height="40"/></a>`;
  
      if (track.youtube) html += `
    , <a href="${track.youtube}" target="_blank">
    <img src="https://www.youtube.com/s/desktop/510f0670/img/favicon_96x96.png" alt="Last.fm" width="40" height="40"/></a>`;
  
      html += `</div><hr><br>`;
    })
  
    return {
      statusCode: 500,
      body: `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="utf-8" />
      <title>Detwelvulation Project - Listen to and download microtonal music online</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="copyright" content="(С) Networks M.N.O. tv"/>
      <meta name="author" content="Tsvetkov Fedor"/>
    </head>
    <body style="background-image: url('https://lastfm.freetls.fastly.net/i/u/770x0/1391126fe1e43be47725d42a8f23a862.jpg#1391126fe1e43be47725d42a8f23a862');background-size: 100%;background-position: center;background-attachment: fixed;">
    <div style="background: whitesmoke;max-width: 800px;margin: 0 auto;padding: 40px;font-family: sans-serif; border-radius: 10px;">${html}</div>
    </body>
    </html>`
    };
  
  
  }
  