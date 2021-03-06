(function () {
    function initIndexPage() {
        var openTime = new Date(2018, 7, 3, 19);
        var secOfMinute = 60;
        var secOfHour = 60 * secOfMinute;
        var secOfDay = 24 * secOfHour;

        Number.prototype.twoDigit = function () {
            var integerNum = Math.floor(this);
            return Math.abs(integerNum) > 9 ? integerNum.toString() :
                (
                    (integerNum < 0 ? "-" : "") + "0" + (Math.abs(integerNum))
                );
        };

        function getRemainTimeText() {
            var now = Date.now() - serverTimeDiff;
            var remainDays, remainHours, remainMinutes, remainSec;
            var remainSec = (openTime.getTime() - now) / 1000;
            var sign = remainSec > 0 ? '-' : '+';
            if (remainSec < 0) remainSec = (-remainSec);

            remainDays = Math.floor(remainSec / secOfDay);
            remainSec %= secOfDay;
            remainHours = Math.floor(remainSec / secOfHour);
            remainSec %= secOfHour;
            remainMinutes = Math.floor(remainSec / secOfMinute);
            remainSec %= secOfMinute;
            return ("D" + sign + " " + remainDays.twoDigit() + ":" + remainHours.twoDigit() + ":" + remainMinutes.twoDigit() + ":" + remainSec.twoDigit());
        }

        var timerElement = $('.section1 .timer');
        timerElement.text(getRemainTimeText());

        $('.section1').addClass('fadeIn');

        function calculateRemainTime() {
            timerElement.text(getRemainTimeText());
        }

        window.setInterval(calculateRemainTime, 33);

        $('a.menu').click(function (event) {
            event.preventDefault();
            $('#hamburger-menu').removeClass('open');
            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top - $('.appbar').height()
            }, 200);
        });

        $('#hamburger').click(function () {
            $('#hamburger-menu').toggleClass('open');
        });
    }

    function openPopup(message) {
        $.ajax('/template/response.html').done(function (data) {
            var html = $(data);
            html.find('.message').html(message);
            $('body').append(html).css('overflow-y', 'hidden');
            html.find('.return-btn').click(function () {
                html.remove();
                if (history && history.replaceState) {
                    history.replaceState(null, "", "/");
                }
                $('body').css('overflow-y', 'auto');
            });
        });
    }

    initIndexPage();

    switch (location.search) {
        case '?return=1':
            openPopup('신청하신 이력이 있습니다.<br/>' +
                '입력하신 메일로 초대장을 발송하였으니 확인 부탁드립니다.<br/>' +
                '추가적인 문의가 있으신 경우 service@ainetwork.ai로 연락 부탁드립니다.');
            break;
        case '?signup=1':
            openPopup('AI X Blockchain Techtalk for Developers에 참가신청이 완료되었습니다.<br/>' +
                '8월 3일 18시 구글 캠퍼스 서울에서 뵙겠습니다.<br/>' +
                '감사합니다.');
            break;
        case '?error=1':
            openPopup('밋업 신청 과정에서 오류가 발생했습니다.<br/>' +
                'service@ainetwork.ai로 연락 부탁드립니다.');
            break;
    }
})();