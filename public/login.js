onload = () => {
    getNewsUserPage();
    loginButton();
    addMember();
};


//-MEMBER--------------------------------------------------------------------------------------

async function addMember() {
    document.querySelector('#saveMember').onclick = () => {
        let url = 'https://shotokankarate.herokuapp.com/api/member';
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
    const create = document.querySelector('#create');


    memberName.value = '';
    memberAge.value = '';
    memberEmail.value = '';
    memberPassword.value = '';
    create.innerHTML = 'Du er nu oprettet';
}


//-LOGIN--------------------------------------------------------------------------------------


async function loginButton() {
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    const button = document.querySelector('#button');
    const fail = document.querySelector('#fail');

    button.onclick = async () => {
        const adminData = {username: username.value, password: password.value};
        const result = await fetch("https://shotokankarate.herokuapp.com/login", {
            method: "POST",
            body: JSON.stringify(adminData),
            headers: {'Content-Type': 'application/json'}
        });
        const res = await result.json();
        if (res.ok) {
            window.location.href = "https://shotokankarate.herokuapp.com/session";
        } else {
            const dataMember = {email: username.value, password: password.value};
            const resultMember = await fetch("https://shotokankarate.herokuapp.com/member", {

                method: "POST",
                body: JSON.stringify(dataMember),
                headers: {'Content-Type': 'application/json'}
            });
            const resMember = await resultMember.json();
            if (resMember.ok)
                window.location.href = "https://shotokankarate.herokuapp.com/memberSession";

            else {
                fail.innerHTML = "Login fejl!";
            }
        }

    }




}

//-GET--------------------------------------------------------------------------------------

async function getNewsUserPage() {
    const [template, userResponse] =
        await Promise.all([fetch('/newsUserPage.hbs'), fetch('https://shotokankarate.herokuapp.com/api/news')]);
    const templateText = await template.text();
    const newsUserPage = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.querySelector('#newsFrontPage').innerHTML = compiledTemplate({newsUserPage});

}

