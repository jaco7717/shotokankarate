$(document).ready(function () {


    /* initialize the calendar
    -----------------------------------------------------------------*/

    let calendar = $('#calendar').fullCalendar({
        header: {
            left: 'title',
            center: 'month',
            right: 'prev,next today'
        },
        editable: false,
        firstDay: 1, //  1(Monday) this can be changed to 0(Sunday) for the USA system
        selectable: true,
        defaultSelected:  'today',
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

        select: function (start, end, allDay) {
            let title = prompt('Title:');
            let content = prompt('content:');
            let hour = prompt('Time');
            let min = prompt('Minut:');

            let hourInt = parseInt(hour);
            let minInt = parseInt(min);

            if (title && content) {


                let url = 'https://shotokankarate.herokuapp.com/api/calender';
                let data = {title: title, date: new Date(start.getFullYear(),start.getMonth(),start.getDate(), hourInt, minInt), content: content};



                fetch(url, {
                    method: "POST",
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


                location.reload()

            }

        },



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
            let id = info._id;
            let tekst = info.title;

            if (confirm("vil du slette: "+ tekst )) {
                let url = 'https://shotokankarate.herokuapp.com/api/calender/' + id;
                console.log(url);
                fetch(url, {
                    method: "DELETE",
                })
                    .then(response => {
                        if (response.status >= 400)
                            throw new Error(response.status);
                        else

                            return response.json();
                    })
                    .then(resultat => console.log(`Resultat: %o`, resultat))
                    .catch(fejl => console.log('Fejl: ' + fejl));

            } else {

            }

        },


    });

});

