export default function (ts) {
  let seconds = Math.floor(ts / 1000);
  const hh = seconds >= 3600 ? Math.floor(seconds / 3600) + ':' : '';
  seconds -= hh * 3600;
  const mm = seconds >= 60 ? Math.floor(seconds / 60) : '00';
  seconds -= mm * 60;
  return `${hh}${mm}:${seconds < 10 ? seconds + '0': seconds
} `
}