onload = () => {
    getNewsUserPage();

};

//-GET--------------------------------------------------------------------------------------
async function getNewsUserPage() {
    const [template, userResponse] =
        await Promise.all([fetch('/newsUserPage.hbs'), fetch('https://shotokankarate.herokuapp.com/api/news')]);
    const templateText = await template.text();
    const newsUserPage = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.querySelector('#newsUser').innerHTML = compiledTemplate({newsUserPage});
}


//-member--------------------------------------------------------------------------------------
function toEditMemberM(id, name, age, email, password) {
    toEditMemberMemberPart(id, name, age, email, password);
}

async function toEditMemberMemberPart(id, name, age, email, password) {

    let name1 = prompt("name", name);
    let age1 = prompt("age", age);
    let email1 = prompt("email", email);
    let password1 = prompt("adgangskode", password);



    if (name1 !== '' && age1 !== '' && email1 !== '' && password1 !== '') {
        let data = {name: name1, age: age1, email: email1, password:password1};

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


