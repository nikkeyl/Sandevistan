const getDigFormat = item => item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')

export { getDigFormat }
