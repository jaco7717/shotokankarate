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
        if (svar.ok)
            window.location.href = "https://shotokankarate.herokuapp.com/session";
        else {
            fejl.innerHTML = "Login fejl!";
        }
    }

}


async function getNewsUserPage() {
    const [template, userResponse] =
        await Promise.all([fetch('/newsUserPage.hbs'), fetch('https://shotokankarate.herokuapp.com/api/news')]);
    console.log("kører funktionen getNewsUserPage?");
    const templateText = await template.text();
    const newsUserPage = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.querySelector('#nyhederBrugerside').innerHTML = compiledTemplate({newsUserPage});
}

$(document).ready(function () {
    console.log("per")

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