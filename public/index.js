onload = async () => {

    addNews();
    addMember();
    getNews();
    getMembers();

};



async function update() {
    const overskrift = document.querySelector('#headline');
    const tekst = document.querySelector('#content');
    const nyhedLabelUpdate = document.querySelector('#nyhedLabel');

    nyhedLabelUpdate.innerHTML = 'Oprettet';
    overskrift.value = '';
    tekst.value = '';

    getNews();
}

async function updateMembers() {
    const memberName = document.querySelector('#memberName');
    const memberAge = document.querySelector('#memberAge');
    const memberEmail = document.querySelector('#memberEmail');
    const memberPassword = document.querySelector('#memberPassword');
    const adminLabel = document.querySelector('#oprettetAdmin');

    memberName.value = '';
    memberAge.value = '';
    memberEmail.value = '';
    memberPassword.value = '';
    adminLabel.innerHTML = 'Medlem oprettet';

    getMembers();
}

async function getNews() {
    const [template, userResponse] =
        await Promise.all([fetch('/news.hbs'), fetch('https://shotokankarate.herokuapp.com/api/news')]);
    const templateText = await template.text();
    const news = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.querySelector('#nyheder').innerHTML = compiledTemplate({news});
    console.log('test3');
}


async function addNews() {
    document.querySelector('#saveNews').onclick = () => {
        let url = 'https://shotokankarate.herokuapp.com/api/news';
        let nyhedLabel = document.querySelector('#nyhedLabel').value;
        const msg = {
            headline: document.querySelector('#headline').value,
            content: document.querySelector('#content').value
        };

        let headlineTest = document.querySelector('#headline').value;
        let contentTest = document.querySelector('#content').value;

        if(headlineTest !== '' && contentTest !== '' ) {

            fetch(url, {
                method: "POST",
                body: JSON.stringify(msg),
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => {
                    if (response.status >= 400)
                       throw new Error(response.status);

                    else
                        update();

                    return response.json();
                })
                .then(resultat => console.log(`Resultat: %o`, resultat))
                .catch(fejl => console.log('Fejl: ' + fejl));
        } else {
            nyhedLabel.innerHTML = 'Udfyld overskrift og tekst';
        }
    };
   
}

function slet(id) {
    tilSletNews(id);

}


async function tilSletNews(id) {

    if (confirm("vil du slette: ")) {

    let url = 'https://shotokankarate.herokuapp.com/api/news/' + id;
    fetch(url, {
        method: "DELETE",
    })
        .then(response => {
            if (response.status >= 400)
                throw new Error(response.status);
            else
                getNews();
            return response.json();
        })
        .then(resultat => console.log(`Resultat: %o`, resultat))
        .catch(fejl => console.log('Fejl: ' + fejl));
}
}

function edit(id, content, headline) {
    tilEditNews(id, content, headline);

}


async function tilEditNews(id, content, headline) {
    let overskrift = prompt("Overskrift", headline);
    let text = prompt("text", content);

    if (overskrift !== '' && text !== '') {
        let data = {headline: overskrift, content: text};
        let url = 'https://shotokankarate.herokuapp.com/api/news/' + id;

        fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
            .then(resultat => {
                if (resultat.status >= 400)
                    throw new Error(resultat.status);
                else
                    getNews();
                return resultat.json();
            })
            .then(resultat => console.log(`Resultat: %o`, resultat))
            .catch(fejl => console.log('Fejl: ' + fejl));
    } else {
        alert('FEJL - Der må ikke være tomme felter');
    }
}

async function getMembers() {
    const [template, userResponse] =
        await Promise.all([fetch('/members.hbs'), fetch('https://shotokankarate.herokuapp.com/api/member')]);
    const templateText = await template.text();
    const members = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.querySelector('#medlemmer').innerHTML = compiledTemplate({members});
}


async function addMember() {
    document.querySelector('#saveMember').onclick = () => {
        let url = 'https://shotokankarate.herokuapp.com/api/member';
        const opretMedlemAdmin = document.querySelector('#oprettetAdmin');

        let nameTest = document.querySelector('#memberName').value;
        let ageTest = document.querySelector('#memberAge').value;
        let emailTest = document.querySelector('#memberEmail').value;
        let password = document.querySelector('#memberPassword').value;

        if (nameTest !== '' && ageTest !== '' && emailTest !== '' && password !== '') {
            const msg = {
                name: document.querySelector('#memberName').value,
                age: document.querySelector('#memberAge').value,
                email: document.querySelector('#memberEmail').value,
                password: document.querySelector('#memberPassword').value
            };

            fetch(url, {
                method: "POST",
                body: JSON.stringify(msg),
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => {
                    if (response.status >= 400)

                        opretMedlemAdmin.innerHTML = 'Allerede oprettet';
                    else
                        updateMembers();
                    return response.json();
                })
                .then(resultat => console.log(`Resultat: %o`, resultat))
                .catch(fejl => console.log('Fejl: ' + fejl));
        } else {
            opretMedlemAdmin.innerHTML = 'Alle felter skal udfyldes';
        }

    }


}

function deleteMember(id) {
    toDeleteMember(id);
}

async function toDeleteMember(id) {
    let url = 'https://shotokankarate.herokuapp.com/api/member/' + id;
    fetch(url, {
        method: "DELETE",
    })
        .then(response => {
            if (response.status >= 400)
                throw new Error(response.status);
            else
                getMembers();
            return response.json();
        })
        .then(resultat => console.log(`Resultat: %o`, resultat))
        .catch(fejl => console.log('Fejl: ' + fejl));
}

function editMember(id, name, age, email) {
    toEditMember(id, name, age, email);
}

async function toEditMember(id, name, age, email) {
    let navn = prompt("name", name);
    let alder = prompt("age", age);
    let mail = prompt("email", email);

    if (navn !== '' && alder !== '' && mail !== '') {
        let data = {name: navn, age: alder, email: mail};

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
                    getMembers();
                return resultat.json();
            })
            .then(resultat => console.log(`Resultat: %o`, resultat))
            .catch(fejl => console.log('Fejl: ' + fejl));
    } else {

        alert('FEJL - Der må ikke være tomme felter');
    }

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






