(function () {
    var openTime = new Date(2018, 6, 27, 13);
    var secOfMinute = 60;
    var secOfHour = 60 * secOfMinute;
    var secOfDay = 24 * secOfHour;

    Number.prototype.twoDigit = function () {
        var integerNum = Math.floor(this);
        return integerNum > 9 ? integerNum.toString() : "0" + integerNum.toString();
    };

    function getRemainTimeText() {
        var now = Date.now() - serverTimeDiff;
        var remainDays, remainHours, remainMinutes, remainSec;
        var remainSec = (openTime.getTime() - now) / 1000;
        remainDays = Math.floor(remainSec / secOfDay);
        remainSec %= secOfDay;
        remainHours = Math.floor(remainSec / secOfHour);
        remainSec %= secOfHour;
        remainMinutes = Math.floor(remainSec / secOfMinute);
        remainSec %= secOfMinute;
        return ("D - " + remainDays.twoDigit() + ":" + remainHours.twoDigit() + ":" + remainMinutes.twoDigit() + ":" + remainSec.twoDigit());
    }

    var timerElement = $('.section1 .timer');
    timerElement.text(getRemainTimeText());

    $('.section1').addClass('fadeIn');

    function calculateRemainTime() {
        timerElement.text(getRemainTimeText());
    }

    window.setInterval(calculateRemainTime, 33);
})();