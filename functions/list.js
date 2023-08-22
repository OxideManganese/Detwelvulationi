const gettrackss = require('./gettrackss');

const fetch = (...args) => import('node-fetch').then(({
    default: fetch
  }) => fetch(...args));

(async function(){
    console.log(gettrackss())
})()


exports.handler = async function(event, context) {
  
    let tracks = await gettrackss();;
  
    return {
      statusCode: 200,
      body: tracks
    };
  
  
  }
  