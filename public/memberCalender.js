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
        defaultSelected: 'month',
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
                registered: String,
            },
            error: function () {
                alert('There was an error while fetching events!');
            }
        },
        let: name1,

        setName: function (name) {
            name1 = name;
        },

        eventClick: function (info, request, response) {

            let id = info._id;
            let titel = info.title;
            let found = false;
            console.log(id);
            console.log(titel);
            console.log(found);


            if (info.registered !== '') {


            let registrered = info.registered;
                console.log(name1);

            let regis = registrered.split(',');
                console.log(regis);
            for (let n of regis) {
                if (name1 === n) {
                    found = true;

                }
            }

            if (!found) {
                registrered += info.name;

                if (confirm("Vil du tilmelde dig event? " + titel)) {

                    let url = 'https://shotokankarate.herokuapp.com/api/calender/' + id;


                    let data = {registrered: registrered};


                    fetch(url, {
                        method: "PUT",
                        body: JSON.stringify(data),
                        headers: {'Content-Type': 'application/json'}
                    })
                        .then(resultat => {
                            if (resultat.status >= 400)
                                throw new Error(resultat.status);
                            else

                                return resultat.json();
                        })
                        .then(resultat => console.log(`Resultat: %o`, resultat))
                        .catch(fejl => console.log('Fejl: ' + fejl));


                }

            }

        }}
        });

});

