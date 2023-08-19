const fetch = (...args) => import('node-fetch').then(({
    default: fetch
  }) => fetch(...args));
  
  exports.handler = async function(event, context) {
  
    const response = await fetch(`http://seraph.it/Detwelvulation.html`);
    let page = await response.text();
    page = page.split('<!-- Start main content wrapper -->')[1].split('<!-- End content -->')[0];
  
    let list2 = [];
    let tracklist = ``;
    let list = page.split(`" rel="external" target="_blank">`);
  
    list.forEach((elem, i) => {
      if (i > 0) {
        let track = elem.split('</a>')[0]
        let links = elem.split(`serif;"><a href="`);
        list2.push({
          name: track,
          mp3: links.find(elem => elem.indexOf(".mp3") != -1),
          mov: links.find(elem => elem.indexOf(".mov") != -1),
          youtube: (links.find(elem => elem.indexOf("youtube") != -1) || '"').split(`"`)[0],
        });
      }
    })
  
    console.log(list2);
  
    let html = `<h1>Detwelvulation Project by Carlo Serafini</h1>
  <p>On this site you can listen to and download microtonal music for free. Author of music: <a href="http://seraph.it/">Carlo Serafini</a>, developer of this site: <a href="https://t.me/OxideManganese">@OxideManganese</a></p>
  <image src="https://lastfm.freetls.fastly.net/i/u/770x0/1391126fe1e43be47725d42a8f23a862.jpg#1391126fe1e43be47725d42a8f23a862" width="300" alt="cover">`
  
    list2.forEach(track => {
      html += `<h3>Carlo Serafini - ${track.name}</h3>`
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
    <html lang="ru">
    <head>
      <meta charset="utf-8" />
      <title>Detwelvulation Project - Listen to and download microtonal music online</title>
    </head>
    <body>
     ${html}
    </body>
    </html>`
    };
  
  
  }
  