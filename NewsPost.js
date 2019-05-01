const fetch = require('node-fetch');

let url = 'https://shotokankarate.herokuapp.com/api/news/5cc6c90ee5fc6b00041f9e1b';
let data = {headline: 'NEWS', content: 'Fede nyheder'};

fetch(url, {
    method: "put",
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
})
    .then(resultat => {
        if (resultat.status >= 400)
            throw new Error(resultat.status);
        else
            return resultat.json();
    })
    .then(resultat => console.log(`Resultat: %o`, resultat))
    .catch(fejl => console.log('Fejl: ' + fejl));