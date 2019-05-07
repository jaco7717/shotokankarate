onload = async () => {
    update();
    updateMembers();
    addNews();
    addMember();
};



async function update() {
    const overskrift = document.querySelector('#headline');
    const tekst = document.querySelector('#content');

    overskrift.value = '';
    tekst.value = '';
    getNews();
}

async function updateMembers() {
    const memberName = document.querySelector('#memberName');
    const memberAge = document.querySelector('#memberAge');
    const memberEmail = document.querySelector('#memberEmail');
    const memberPassword = document.querySelector('#memberPassword');

    memberName.value = '';
    memberAge.value = '';
    memberEmail.value = '';
    memberPassword.value = '';

    getMembers();
}



async function getNews() {
    const [template, userResponse] =
        await Promise.all([fetch('/news.hbs'), fetch('https://shotokankarate.herokuapp.com/api/news')]);
    const templateText = await template.text();
    const news = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.querySelector('#nyheder').innerHTML = compiledTemplate({news});
}


async function addNews() {
    document.querySelector('#saveNews').onclick = () => {
        let url = 'https://shotokankarate.herokuapp.com/api/news';

        const msg = {
            headline: document.querySelector('#headline').value,
            content: document.querySelector('#content').value
        };

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
    };
}

function slet(id) {
    tilSlet(id);

}


async function tilSlet(id) {
    let url = 'https://shotokankarate.herokuapp.com/api/news/' + id;
    fetch(url, {
        method: "DELETE",
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
}


function edit(id, content, headline) {
    tilEdit(id, content, headline);

}


async function tilEdit(id, content, headline) {
    let overskrift = prompt("Overskrift", headline);
    let text = prompt("text", content);

    if (overskrift != null && text != null ) {
        console.log("fungere");
    }


    let data = {headline: overskrift, content: text};


    let url = 'https://shotokankarate.herokuapp.com/api/news/'+id;

    fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(resultat => {
            if (resultat.status >= 400)
                throw new Error(resultat.status);
            else
                update();
                return resultat.json();
        })
        .then(resultat => console.log(`Resultat: %o`, resultat))
        .catch(fejl => console.log('Fejl: ' + fejl));
}

async function getMembers() {
    const [template, userResponse] =
        await Promise.all([fetch('/members.hbs'), fetch('https://shotokankarate.herokuapp.com/api/members')]);
    const templateText = await template.text();
    const members = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.querySelector('#medlemmer').innerHTML = compiledTemplate({members});
}


async function addMember() {
    document.querySelector('#saveMember').onclick = () => {
        let url = 'https://shotokankarate.herokuapp.com/api/members';

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
                    throw new Error(response.status);
                else
                    updateMembers();
                return response.json();
            })
            .then(resultat => console.log(`Resultat: %o`, resultat))
            .catch(fejl => console.log('Fejl: ' + fejl));
    };
}

function deleteMember(id) {
    toDeleteMember(id);
}

async function toDeleteMember(id) {
    let url = 'https://shotokankarate.herokuapp.com/api/members/' + id;
    fetch(url, {
        method: "DELETE",
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
}

function editMember(id, name, age, email, password) {
    toEditMember(id, name, age, email, password);
}

async function toEditMember(id, name, age, email, password) {
    let navn = prompt("name", name);
    let alder = prompt("age", age);
    let mail = prompt("email", email);

    if (navn != null && alder != null && mail != null) {
        console.log("fungere editmember");
    }


    let data = {name: navn, age: alder, email: mail};

    let url = 'https://shotokankarate.herokuapp.com/api/members/'+id;

    fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(resultat => {
            if (resultat.status >= 400)
                throw new Error(resultat.status);
            else
                update();
            return resultat.json();
        })
        .then(resultat => console.log(`Resultat: %o`, resultat))
        .catch(fejl => console.log('Fejl: ' + fejl));
}






