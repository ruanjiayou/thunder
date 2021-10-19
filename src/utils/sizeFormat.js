export default function (size) {
  const gb = 1024 * 1024 * 1024;
  const mb = 1024 * 1024;
  const kb = 1024;
  if (size > gb) {
    const GB = Math.floor(size / gb);
    size -= GB * gb;
    const MB = Math.floor(size / mb);
    return `${GB}G${MB}M`
  } else if (size > mb) {
    const MB = Math.floor(size / mb)
    size -= MB * mb;
    const KB = (size / 1024).toFixed(0);
    return `${MB}M${KB}K`;
  } else {
    return (size / kb).toFixed(2) + 'K';
  }
}