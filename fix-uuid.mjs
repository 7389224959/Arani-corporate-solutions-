function isUUID(str) {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(str);
}
console.log(isUUID("ACS-8042"));
console.log(isUUID("d1c7d32d-1231-458e-b40f-c5a80ce4009f"));
