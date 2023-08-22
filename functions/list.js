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
        if (track == "Galactic Overload") links.push("https://www.youtube.com/watch?v=kqitxSW9NTk");
        if (track != "movie") list2.push({
          name: track,
          mp3: links.find(elem => elem.indexOf(".mp3") != -1),
          mov: links.find(elem => elem.indexOf(".mov") != -1),
          youtube: links.find(elem => elem.indexOf("youtube") != -1),
        });
      }
    })
  
  
    list2.forEach((track, i) => {
        track.number = i;
    })
  
    return {
      statusCode: 200,
      body: JSON.stringify(list2)
    };
  
  
  }
  