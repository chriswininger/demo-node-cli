const fs = require('fs');
const { promisify } = require('util');
const axios = require('axios');
const asyncReadFile = promisify(fs.readFile);
const attr = process.argv[2] || 'status';


// === Helpers ===
// can throw an error on asyncReadFile or JSON.parse
const getSources = async () => {
  const contents = await asyncReadFile('./sources.json');
  return JSON.parse(contents);
}

// === Main ===
(async function() {
  let sources;
  try {
    sources = await getSources();
  } catch (ex) {
    // handle possible errors that can occur reading and parsing the file
    console.error(`error reading sources ${ex}`);
    process.exit(1);
  }

  console.log(`processing ${sources.length} sources`);

  /*
    tasks will have an array of promises
    these tasks may finish in any order
   */
  const tasks = sources.map(src => {
    return axios.get(src.url)
      .then(resp => console.log(
        `========${src.name}========
          ${resp[attr]}
        
        `)
      )
      .catch(err => console.error(err));
  });

  // our .then will execute when all promises have finished
  Promise.all(tasks)
    .then(() => console.log('complete'));
})();
