function isNotDevices() {
  return arr => arr.filter(item => !item.devices);
}

function isDevices() {
  return arr => arr.filter(item => item.devices);
}

export { isNotDevices, isDevices };
