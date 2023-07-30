const getcurrentMonth=()=>{
    const d = new Date()

    const month = String(d.getMonth() + 1).padStart(2, '0');
    const date = `${month}`
    return date;
}

module.exports = getcurrentMonth