const fetch = require('node-fetch');

let url = 'https://shotokankarate.herokuapp.com/api/calender';
let data = {headline: 'NEWS', date: 2019-1-23, content: 'CONTENT'};

fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json'}
})
    .then(resultat => {
        if (resultat.status >= 400)
            throw new Error(resultat.status);
        else
            return resultat.json();
    })
    .then(resultat => console.log(`Resultat: %o`, resultat))
    .catch(fejl => console.log('Fejl: ' + fejl));