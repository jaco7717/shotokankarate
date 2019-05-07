const fetch = require('node-fetch');

let url = 'https://shotokankarate.herokuapp.com/api/members';
let data = {name: "Mads scooterboi", age: "23",
    email: "scooterboi@mokaimail.com",
    username: "randers4ever",
    password: "1234"};



fetch(url, {
    method: "POST",
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
