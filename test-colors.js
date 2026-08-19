function colorToAss(c) {
  c = c || 'white';
  if (c === 'yellow') return '&H0000FFFF';
  if (c === 'white') return '&H00FFFFFF';
  if (c === 'black') return '&H00000000';
  if (c.startsWith('#')) {
    let hex = c.substring(1);
    if (hex.length === 3) hex = hex.split('').map(x => x+x).join('');
    const r = hex.substring(0,2);
    const g = hex.substring(2,4);
    const b = hex.substring(4,6);
    return `&H00${b}${g}${r}`;
  }
  return '&H00FFFFFF';
}
console.log(colorToAss('#FBBF24'))
