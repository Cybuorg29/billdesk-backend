 const getDate=()=>{
    const d = new Date()
    const day = d.getDate()
    const month = String(d.getMonth() + 1).padStart(2, '0');
    let year = d.getFullYear()
    var twoDigitYear = year.toString().substr(-2);
    const date = `${day}-${month}-${twoDigitYear}`
    return date;
}

module.exports = getDate