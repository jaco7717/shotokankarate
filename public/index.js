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
    console.log(data)

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