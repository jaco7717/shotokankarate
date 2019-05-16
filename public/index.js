onload = async () => {
    addNews();
    addMember();
    getNews();
    getMembers();
};

//-UPDATE--------------------------------------------------------------------------------------
async function updateNews() {
    const title = document.querySelector('#headline');
    const content = document.querySelector('#content');
    const newsLabelUpdate = document.querySelector('#newsLabel');

    newsLabelUpdate.innerHTML = 'Oprettet';
    title.value = '';
    content.value = '';

    getNews();
}

async function updateMembers() {
    const memberName = document.querySelector('#memberName');
    const memberAge = document.querySelector('#memberAge');
    const memberEmail = document.querySelector('#memberEmail');
    const memberPassword = document.querySelector('#memberPassword');
    const adminLabel = document.querySelector('#createAdmin');

    memberName.value = '';
    memberAge.value = '';
    memberEmail.value = '';
    memberPassword.value = '';
    adminLabel.innerHTML = 'Medlem oprettet';

    getMembers();
}


//-GET--------------------------------------------------------------------------------------
async function getNews() {
    const [template, userResponse] =
        await Promise.all([fetch('/news.hbs'), fetch('https://shotokankarate.herokuapp.com/api/news')]);
    const templateText = await template.text();
    const news = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.querySelector('#news').innerHTML = compiledTemplate({news});
}


async function getMembers() {
    const [template, userResponse] =
        await Promise.all([fetch('/members.hbs'), fetch('https://shotokankarate.herokuapp.com/api/member')]);
    const templateText = await template.text();
    const members = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.querySelector('#members').innerHTML = compiledTemplate({members});
}


//-NEWS--------------------------------------------------------------------------------------
async function addNews() {
    document.querySelector('#saveNews').onclick = () => {
        let url = 'https://shotokankarate.herokuapp.com/api/news';
        let newsLabel = document.querySelector('#newsLabel').value;
        const msg = {
            headline: document.querySelector('#headline').value,
            content: document.querySelector('#content').value
        };

        let headlineTest = document.querySelector('#headline').value;
        let contentTest = document.querySelector('#content').value;

        if (headlineTest !== '' && contentTest !== '') {

            fetch(url, {
                method: "POST",
                body: JSON.stringify(msg),
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => {
                    if (response.status >= 400)
                        throw new Error(response.status);

                    else
                        updateNews();

                    return response.json();
                })
                .catch(fejl => console.log('Fejl: ' + fejl));
        } else {
            newsLabel.innerHTML = 'Udfyld overskrift og tekst';
        }
    };

}

function deleteNews(id) {
    toDeleteNews(id);

}

async function toDeleteNews(id) {

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
    toEditNews(id, content, headline);

}

async function toEditNews(id, content, headline) {
    let title = prompt("Overskrift", headline);
    let content2 = prompt("text", content);

    if (title !== '' && content2 !== '') {
        let data = {headline: title, content: content2};
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


//-MEMBER--------------------------------------------------------------------------------------

async function addMember() {
    document.querySelector('#saveMember').onclick = () => {
        let url = 'https://shotokankarate.herokuapp.com/api/member';
        const createAdmin = document.querySelector('#createAdmin');

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

                        createAdmin.innerHTML = 'Allerede oprettet';
                    else
                        updateMembers();
                    return response.json();
                })
                .then(resultat => console.log(`Resultat: %o`, resultat))
                .catch(fejl => console.log('Fejl: ' + fejl));
        } else {
            createAdmin.innerHTML = 'Alle felter skal udfyldes';
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
    let name2 = prompt("name", name);
    let age2 = prompt("age", age);
    let email2 = prompt("email", email);

    if (name2 !== '' && age2 !== '' && email2 !== '') {
        let data = {name: name2, age: age2, email: email2};

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







