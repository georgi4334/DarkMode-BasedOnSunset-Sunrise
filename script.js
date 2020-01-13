//for iOS devices
// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     document.body.className = 'night-theme';
// } else {
//     document.body.className = 'day-theme';
// }

let manualButton = document.querySelector('.manual-container');
let txt = document.querySelector('.text-toggle');
const body = document.body;
if (document.querySelector('#auto').checked) {

    //api link
    const url = 'https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today';
    //current time
    let timeNow = new Date();
    let formatted = `${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`;

    //convert from 12 to 24 time format 
    function convertTimetoMs(time) {
        var PM = time.match('PM') ? true : false

        time = time.split(':')
        var min = time[1]

        if (PM) {
            var hour = 12 + parseInt(time[0], 10)
            var sec = time[2].replace('PM', '')
        } else {
            var hour = time[0]
            var sec = time[2].replace('AM', '')
        }
        return (hour + ':' + min + ':' + sec)
    }

    fetch(url)
        .then((result) => {
            return result.json();
        })
        .then((time) => {

            let {
                sunrise,
                sunset
            } = time.results;
            //convert into sec
            let sunriseSec = (convertTimetoMs(sunrise).split(':').reduce((acc, time) => (60 * acc) + +time));
            let sunsetSec = (convertTimetoMs(sunset).split(':').reduce((acc, time) => (60 * acc) + +time));
            let currTime = (convertTimetoMs(formatted).split(':').reduce((acc, time) => (60 * acc) + +time));

            if (currTime >= sunriseSec && currTime <= sunsetSec) {
                console.log('day theme')
                document.body.className = 'day-theme';
            } else {
                console.log('night theme')
                document.body.className = 'night-theme';
            }
        })
        .catch((error) => {
            console.error('There has been a problem with fetch/internet:', error);
        })

    manualButton.style.display = 'none';
}


// show/hide manual button from auto toggle
document.querySelector('#auto').addEventListener('click', (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
        manualButton.style.display = 'none';
        txt.style.display = 'none';
    } else {
        manualButton.style.display = 'block';
        txt.style.display = 'block'
    }
});
//manual add light/dark theme
manualButton.addEventListener('input', (e) => {
    const isChecked = e.target.checked;

    if (isChecked == false) {
        if (body.classList == 'day-theme') {
            body.classList.remove('day-theme');
            body.classList.add('night-theme');
        } else if (body.classList == 'night-theme') {
            body.classList.remove('night-theme');
            body.classList.add('day-theme');
        }

    } else {
        if (body.classList == 'day-theme') {
            body.classList.remove('day-theme');
            body.classList.add('night-theme');
        } else if (body.classList == 'night-theme') {
            body.classList.remove('night-theme');
            body.classList.add('day-theme');
        }
    }
});