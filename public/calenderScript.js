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
                let data = {
                    title: title,
                    date: new Date(start.getFullYear(), start.getMonth(), start.getDate(), hourInt,minInt),
                    content: content,
                };


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


            }
            calendar.fullCalendar('unselect');
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


    });




});

