onload = () => {
    getNewsUserPage();
    loginButton();

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
        if (svar.ok) {
            window.location.href = "https://shotokankarate.herokuapp.com/session";
    } else {
            const dataMedlem = {email: username.value, password: password.value};
            const resultatMedlem = await fetch("https://shotokankarate.herokuapp.com/member", {

                method: "POST",
                body: JSON.stringify(dataMedlem),
                headers: {'Content-Type': 'application/json'}
            });
            const svarMedlem = await resultatMedlem.json();
            if (svarMedlem.ok)
                window.location.href = "https://shotokankarate.herokuapp.com/memberSession";

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




