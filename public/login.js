onload = () => {
    getNewsUserPage();
    loginButton();
    addMember();
};

async function loginButton() {
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    const button = document.querySelector('#button');
    const fejl = document.querySelector('#fejl');
    button.onclick = async () => {
        const data = {username: username.value, password: password.value};
        const resultat = await fetch("https://shotokankarate.herokuapp.com/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
        const svar = await resultat.json();
        if (svar.ok)
            window.location.href = "https://shotokankarate.herokuapp.com/session";
        else {
            const resultatMedlem = await fetch("https://shotokankarate.herokuapp.com/api/member", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            });
            const svarMedlem = await resultatMedlem.json();
            if (svarMedlem.ok)

                console.log('ind med dig');
            else {
                fejl.innerHTML = "Login fejl!";
            }
        }


    }

}


async function getNewsUserPage() {
    const [template, userResponse] =
        await Promise.all([fetch('/newsUserPage.hbs'), fetch('https://shotokankarate.herokuapp.com/api/news')]);
        const templateText = await template.text();
    const newsUserPage = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.querySelector('#nyhederBrugerside').innerHTML = compiledTemplate({newsUserPage});
}




async function addMember() {
    document.querySelector('#saveMember').onclick = () => {
        let url = 'https://shotokankarate.herokuapp.com/api/members';
        const opret = document.querySelector('#oprettet');
        const msg = {
            name: document.querySelector('#memberName').value,
            age: document.querySelector('#memberAge').value,
            email: document.querySelector('#memberEmail').value,
            password: document.querySelector('#memberPassword').value
        };


        let nameTest = document.querySelector('#memberName').value;
        let ageTest = document.querySelector('#memberAge').value;
        let emailTest = document.querySelector('#memberEmail').value;
        let password = document.querySelector('#memberPassword').value;

        if (nameTest !== '' && ageTest !== '' && emailTest !== '' && password !== '') {

        fetch(url, {
            method: "POST",
            body: JSON.stringify(msg),
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => {
                if (response.status >= 400)

                opret.innerHTML = 'Allerede oprettet';

                else
                    updateMembers();

                return response.json();
            })
            .then(resultat => console.log(`Resultat: %o`, resultat))
            .catch(fejl => console.log('Fejl: ' + fejl));

            }  else {
            opret.innerHTML = 'Alle felter skal udfyldes';
        }

    };
}

async function updateMembers() {
    const memberName = document.querySelector('#memberName');
    const memberAge = document.querySelector('#memberAge');
    const memberEmail = document.querySelector('#memberEmail');
    const memberPassword = document.querySelector('#memberPassword');
    const tjek = document.querySelector('#oprettet');


    memberName.value = '';
    memberAge.value = '';
    memberEmail.value = '';
    memberPassword.value = '';
    tjek.innerHTML = 'Du er nu oprettet';
}