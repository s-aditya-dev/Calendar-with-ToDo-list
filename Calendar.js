//calendar handlers

function load() {


    const dt = new Date();


    if (nav != 0 || navYear != 0) {

        dt.setDate(1);
        dt.setMonth(new Date().getMonth() + nav);
        dt.setFullYear(new Date().getFullYear() + navYear);

        TodayBtn.style.display = 'flex'
        TodayBtn.addEventListener('click', () => {
            nav = 0;
            navYear = 0;
            load();
        });

    } else {
        TodayBtn.style.display = 'none'
    }

    CurrDay = dt.getDate();
    CurrMonth = dt.getMonth();
    CurrYear = dt.getFullYear();

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();


    const FirstDay = new Date(year, month, 1);
    const DaysInMonth = new Date(year, month + 1, 0).getDate();

    const DateString = FirstDay.toLocaleDateString('en-in', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });

    const PaddingDays = Weekdays.indexOf(DateString.split(', ')[0]);


    let statusDisplay = `${dt.toLocaleDateString('en-in', { month: 'long' })} ${year}`;
    if (navType) { statusDisplay = year }

    document.getElementById('StatusDisplay').innerText = statusDisplay;

    calendar.innerHTML = '';

    CurrDay = parseInt(day);

    let alertMark = false;

    if (events.hasOwnProperty(CurrYear)) {
        if (events[year].hasOwnProperty(Months[CurrMonth])) {
            alertMark = true;         
        }
    }

    for (i = 1; i <= 42; i++) {
        const DaySquare = document.createElement('div');
        DaySquare.classList.add('day');

        if (i > PaddingDays && i <= (PaddingDays + DaysInMonth)) {

            DaySquare.innerText = i - PaddingDays;
            
            DaySquare.addEventListener('click', () => {
                CurrDay = parseInt(DaySquare.innerText);

                // Onclick code for Todo-list comes here

                temp = document.getElementsByClassName('curr-date')[0] //temp is a temp variable to hold the element with class name "curr-date" so that if its not null then it can be removed in the next if block

                if (temp)
                    temp.classList.remove('curr-date');

                DaySquare.classList.add('curr-date');

                loadTodo(CurrDay,Months[CurrMonth],CurrYear);
            });


            // Todo-List-markers code will come here
            if (alertMark) {

                let arr = events[CurrYear][Months[CurrMonth]][i - PaddingDays];

                if (arr) {
                    let alertType = checkToDoDay(arr);
                    
                    if (alertType) {
                        const alertMsg = document.createElement('div');
                        alertMsg.setAttribute('id','alert')
                        
                        if (alertType == 1){
                            alertMsg.classList.add('status-low');
                        } else if (alertType == 2) {
                            alertMsg.classList.add('status-high');
                        }

                        DaySquare.appendChild(alertMsg);
                    }
            }}

        } else if (i > DaysInMonth) {

            DaySquare.innerText = i - (PaddingDays + DaysInMonth);
            DaySquare.classList.add('next');
            DaySquare.addEventListener('click', () => {
                nav++;
                load();
            });

        } else {

            DaySquare.innerText = new Date(year, month, 1 - (PaddingDays + 1 - i)).getDate();
            DaySquare.classList.add('prev');
            DaySquare.addEventListener('click', () => {
                nav--;
                load();
            });
        }



        if ((i - PaddingDays) == day && nav == 0 && navYear == 0) {
            DaySquare.classList.add('today');
        }

        calendar.appendChild(DaySquare);
    }


}

function initButtons() {

    document.getElementById('prev-btn').addEventListener('click', () => {
        if (navType) {
            navYear--;
        } else {
            nav--;
            if ((currDate.getMonth() + nav + 1) % 12 == 0) {
                navYear--;
            }
        }
        load();
    });

    document.getElementById('next-btn').addEventListener('click', () => {

        if (navType) {
            navYear++;
        } else {
            nav++;

            if (((currDate.getMonth() + nav) % 12) == 0) {
                navYear++;
            }
        }
        load();
    });

}

function yearSelector() {

    if (navType) {
        navType = false;
        MonthSelector.classList.remove('active');
        MonthSelector.classList.add('hidden');

    } else {
        monthLoad();
        navType = true;
        MonthSelector.classList.add('active');
        MonthSelector.classList.remove('hidden');
    }

    load();

}

function monthLoad() {
    MonthSelector.innerHTML = ''

    for (let i = 0; i <= 11; i++) {
        const monthSquare = document.createElement('div');
        monthSquare.classList.add('month');
        monthSquare.innerText = Months[i];
        
        if (i === CurrMonth) monthSquare.classList.add('curr-month');
        
        monthSquare.addEventListener('click', () => {
            nav = (i + 1) - (currDate.getMonth() + 1)
            load();
            yearSelector();
        });
        
        MonthSelector.appendChild(monthSquare);
    }
}
