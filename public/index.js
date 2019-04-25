onload = async () => {
    update();
    addNews();
};


async function update() {
    document.querySelector('#news').innerHTML = '';
    for (let input of document.querySelectorAll('input')) input.value = '';
    getNews();
}

async function getNews() {
    const [template, userResponse] =
        await Promise.all([fetch('/news.hbs'), fetch('https://shotokankarate.herokuapp.com/api/news')]);
    const templateText = await template.text();
    const news = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.querySelector('#news').innerHTML = compiledTemplate({news});
}

async function addNews() {
    document.querySelector('#saveNews').onclick = () => {
        const msg = {
            headline: document.querySelector('#headline').value,
            date: Date.now(),
            content: document.querySelector('#content').value
        };

        fetch('/api/news', {
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
