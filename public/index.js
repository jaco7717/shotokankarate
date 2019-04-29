onload = async () => {
    update();
    addNews();

};


async function update() {
    const overskrift = document.querySelector('#headline');
    const tekst = document.querySelector('#content');

    overskrift.value = '';
    tekst.value = '';
    getNews();
    getNewsUserPage()
}

async function getNews() {
    const [template, userResponse] =
        await Promise.all([fetch('/news.hbs'), fetch('https://shotokankarate.herokuapp.com/api/news')]);
    const templateText = await template.text();
    const news = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.querySelector('#nyheder').innerHTML = compiledTemplate({news});
}

async function getNewsUserPage() {
    const [template, userResponse] =
        await Promise.all([fetch('/newsUserPage.hbs'), fetch('https://shotokankarate.herokuapp.com/api/news')]);
    const templateText = await template.text();
    const newsUserPage = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.querySelector('#nyhederBrugerside').innerHTML = compiledTemplate({newsUserPage});
}

async function addNews() {
    document.querySelector('#saveNews').onclick = () => {
        let url = 'https://shotokankarate.herokuapp.com/api/news';
        console.log("test af knap");
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
    console.log(id);
    let url = 'https://shotokankarate.herokuapp.com/api/news/' + id;
    console.log(url);
    fetch(url, {
        method: "DELETE",
        body: JSON.stringify(id),
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
}


function deler(id) {
    tilDel(id);

}


async function tilDel(id) {
    console.log(id);

}



