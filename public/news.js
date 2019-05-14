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




