var log = console.log.bind(console)

var e = (selector) => {
    return document.querySelector(selector)
}

var es = function(selector) {
    return document.querySelectorAll(selector)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

function getCurrentDate() {
    var timeStr = '';
    var curDate = new Date();
    var curYear = curDate.getUTCFullYear()
    var curMonth = curDate.getMonth()+1;  //获取当前月份(0-11,0代表1月)
    var curDay = curDate.getDate();       //获取当前日(1-31)
    var curHour = curDate.getHours();      //获取当前小时数(0-23)
    var curMinute = curDate.getMinutes();   // 获取当前分钟数(0-59)
    timeStr = curYear + '/' + curMonth + '/' + curDay + '  ';

    if (curHour < 10) {
        if(curMinute < 10)
        {
           timeStr += '0' + curHour + ':0' + curMinute
        }
        else
        {
            timeStr += '0' + curHour + ':' + curMinute
        }
    } else {
        if (curMinute < 10) {
            timeStr += curHour + ':0' + curMinute
        } else {
            timeStr += curHour + ':' + curMinute
        }
    }
    return timeStr
}
