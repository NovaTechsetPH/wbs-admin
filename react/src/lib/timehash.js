import moment from 'moment';

export const CandleData = (candleStart, candleLast, date) => {
  let startTime = moment(candleStart, 'hours'),
    endTime = startTime
  var sticks = [startTime.format('HH:mm')];
  var limitDate = moment(date).isSame(moment(), 'date') ? moment.now() : moment(candleLast)
  while (endTime.isBefore(limitDate)) {
    endTime = endTime.add(10, 'minutes');
    sticks.push(endTime.format('HH:mm'));
  }

  return sticks;
}

function timeStringToSecs(data) {
  var a = data.split(':'); // split it at the colons
  if (a.length < 3) {
    a[2] = '00';
  }
  var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); // 495 / 60 = 8.25 |
  return seconds;
}

function getStickIndex(itemTime, sticks) {
  var itemSecs = timeStringToSecs(itemTime)
  var firstTick = timeStringToSecs(sticks[0].label);
  var diffSecs = itemSecs - firstTick;
  var index = Math.floor(diffSecs / 600);
  var remainder = diffSecs % 600;
  return { index: index, secs: remainder }
}

function getItemDuration(startTime, endTime) {
  var startSecs = timeStringToSecs(startTime)
  var endSecs = timeStringToSecs(endTime)
  var duration = endSecs - startSecs;
  return duration;
}

export const handleAllocateTime = (data, sticks) => {
  let clonedData = [...data]
  let clonedSticks = [...sticks]

  clonedData.forEach((d) => {
    if (d.end_time == null) return;

    var item = getStickIndex(d.time, sticks)
    var initStickAddedTime = 600 - item.secs
    var itemDuration = getItemDuration(d.time, d.end_time)
    var remainderAddedTime = itemDuration - initStickAddedTime
    var sticksToFill = Math.floor(remainderAddedTime / 600)
    var remainderToFill = remainderAddedTime % 600

    clonedSticks[item.index].value += initStickAddedTime

    for (let i = 1; i <= sticksToFill; i++) {
      clonedSticks[item.index + i].value += 600
    }

    if (!clonedSticks[item.index + sticksToFill + 1]) return
    clonedSticks[item.index + sticksToFill + 1].value += remainderToFill
  })

  return clonedSticks
}



