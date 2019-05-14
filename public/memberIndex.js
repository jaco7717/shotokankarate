onload = () => {
    getNewsUserPage();

};


async function getNewsUserPage() {
    const [template, userResponse] =
        await Promise.all([fetch('/newsUserPage.hbs'), fetch('https://shotokankarate.herokuapp.com/api/news')]);
    const templateText = await template.text();
    const newsUserPage = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.querySelector('#nyhederBrugerside').innerHTML = compiledTemplate({newsUserPage});
}


function toEditMemberM(id, name, age, email, password) {
    toEditMemberMemberPart(id, name, age, email, password);
}

async function toEditMemberMemberPart(id, name, age, email, password) {

    let navn = prompt("name", name);
    let alder = prompt("age", age);
    let mail = prompt("email", email);
    let adgangskode = prompt("adgangskode", password);



    if (navn !== '' && alder !== '' && mail !== '' && password !== '') {
        let data = {name: navn, age: alder, email: mail, password:adgangskode};
        console.log(id);
        let url = 'https://shotokankarate.herokuapp.com/api/member/' + id;

        fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
            .then(resultat => {
                if (resultat.status >= 400)
                    throw new Error(resultat.status);
                else

                    return resultat.json();
            })
            .then(resultat => console.log(`Resultat: %o`, resultat))
            .catch(fejl => console.log('Fejl: ' + fejl));
    } else {

        alert('FEJL - Der må ikke være tomme felter');
    }

}


