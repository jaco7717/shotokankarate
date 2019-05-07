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

function editMember(id, name, age, email, username, password) {
    toEditMember(id, name, age, email, username, password);
}

async function toEditMember(id, name, age, email, username, password) {
    let navn = prompt("name", name);
    let alder = prompt("age", age);
    let mail = prompt("email", email);
    let brugernavn = prompt("username", username);
    let kodeord = prompt("password", password);

    if (navn != null && alder != null && mail != null && brugernavn != null && kodeord != null) {
        console.log("fungere editmember");
    }


    let data = {name: navn, age: alder, email: mail, username: brugernavn, password: kodeord};


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

$(document).ready(function () {

    /* initialize the calendar
    -----------------------------------------------------------------*/

    let calendar = $('#calendar').fullCalendar({
        header: {
            left: 'title',
            center: 'month',
            right: 'prev,next today'
        },
        editable: true,
        firstDay: 1, //  1(Monday) this can be changed to 0(Sunday) for the USA system
        selectable: true,
        select: 'month',
        defaultSelected:  'month',
        defaultView: 'month',

        axisFormat: 'h:mm',
        columnFormat: {
            month: 'ddd',    // Mon
            week: 'ddd d', // Mon 7
            day: 'dddd M/d',  // Monday 9/7
            agendaDay: 'dddd d'
        },
        titleFormat: {
            month: 'MMMM yyyy', // September 2009
            week: "MMMM yyyy", // September 2009
            day: 'MMMM yyyy',                  // Tuesday, Sep 8, 2009

        },
        allDaySlot: false,
        selectHelper: true,



        events: {
            url: 'https://shotokankarate.herokuapp.com/api/calender',
            type: 'get',
            data: {
                title: String,
                date: Date,
                content: String,
                className: String,
                allDay: Boolean,
            },
            error: function () {
                alert('There was an error while fetching events!');
            }
        },

        eventClick: function(info) {

            let tekst = info.content;

            alert(tekst );


        },





    });

});




