var candle = [
  "08:00",
  "08:10",
  "08:20",
  "08:30",
  "08:40",
  "08:50",
  "09:00",
  "09:10",
  "09:20",
  "09:30",
  "09:40",
  "09:50",
  "10:00",
  "10:10",
  "10:20",
  "10:30",
  "10:40",
  "10:50",
  "11:00",
  "11:10",
  "11:20",
  "11:30",
  "11:40",
  "11:50",
  "12:00",
  "12:10",
  "12:20",
  "12:30",
  "12:40",
  "12:50",
  "13:00",
  "13:10",
  "13:20",
];

var candleTime = "09:23:26";
var endTime = "09:58:15";

var sticks = []
candle.forEach((t) => {
  sticks.push({
    label: t,
    value: 0,
  });
})

// console.log(sticks);
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

function allocateTime() {
  console.clear()
  var item = getStickIndex(candleTime, sticks)
  var itemDuration = getItemDuration(candleTime, endTime)
  var initStickAddedTime = 600 - item.secs
  var remainderAddedTime = itemDuration - initStickAddedTime
  var sticksToFill = Math.floor(remainderAddedTime / 600)
  var remainderToFill = remainderAddedTime % 600

  sticks[item.index].value += initStickAddedTime

  for (let i = 1; i <= sticksToFill; i++) {
    sticks[item.index + i].value += 600
  }

  sticks[item.index + sticksToFill + 1].value += remainderToFill

}

allocateTime();
console.log(sticks);



