function info(message, metadata) {
  console.info(message, metadata || '')
}

function error(message, metadata) {
  console.error(message, metadata || '')
}

export { info, error }
