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
            let date = info.date.getUTCDay();
            let titel = info.title;
            let content = info.content;

            alert(titel + " " + date + " " + '\n' + content );




        },



    });

});

