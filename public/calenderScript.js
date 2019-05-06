$(document).ready(function () {
    let date = new Date();
    let d = date.getDate();
    let m = date.getMonth();
    let y = date.getFullYear();

    /*  className colors

    className: default(transparent), important(red), chill(pink), success(green), info(blue)

    */


    /* initialize the external events
    -----------------------------------------------------------------*/

    $('#external-events div.external-event').each(function () {

        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // it doesn't need to have a start or end
        let eventObject = {
            title: $.trim($(this).text()) // use the element's text as the event title
        };

        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject);


    });


    /* initialize the calendar
    -----------------------------------------------------------------*/

    let calendar = $('#calendar').fullCalendar({
        header: {
            left: 'title',
            center: 'agendaDay,agendaWeek,month',
            right: 'prev,next today'
        },
        editable: true,
        firstDay: 1, //  1(Monday) this can be changed to 0(Sunday) for the USA system
        selectable: true,
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
                let data = {title: title, date: new Date(y, m, d, hourInt, minInt), content: content};

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


                calendar.fullCalendar('renderEvent',
                    {
                        title: title,
                        date: date,
                        content: content,
                        className: className,
                    },
                    true // make the event "stick"
                );
            }
            calendar.fullCalendar('unselect');
        },








        events: [
            {
                title: 'Special event i Herning ',
                content: 'Hele dagen er der baks og riv',
                date: new Date(y, m, 1, 12,12),
                allDay: false,

            },
            {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d - 3, 16, 0),
                allDay: false,
                className: 'info'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d + 4, 16, 0),
                allDay: false,
                className: 'info'
            },
            {
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                allDay: false,
                className: 'important'
            },
            {
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false,
                className: 'important'
            },
            {
                title: 'Birthday Party',
                start: new Date(y, m, d + 1, 19, 0),
                end: new Date(y, m, d + 1, 22, 30),
                allDay: false,
            }
        ],

        async function getcalender() {
            let url = 'https://shotokankarate.herokuapp.com/api/calender/';
            fetch(url, {
                method: "GET",
            })
                .then(response => {
                    if (response.status >= 400)
                        throw new Error(response.status);
                    else
                    return response.json();
                })
                .then(resultat => events = resultat))
                .catch(fejl => console.log('Fejl: ' + fejl));
        }
    });


});

