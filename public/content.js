onload = () => {
    update();
};

function update() {
    getNewsUserPage()
}

function getNewsUserPage() {
    const [template, userResponse] =
        Promise.all([fetch('/newsUserPage.hbs'), fetch('https://shotokankarate.herokuapp.com/api/news')]);
    console.log("kører funktionen getNewsUserPage?");
    const templateText = template.text();
    const newsUserPage = userResponse.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.querySelector('#nyhederBrugerside').innerHTML = compiledTemplate({newsUserPage});
}