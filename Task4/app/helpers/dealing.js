const fs = require("fs")
const read = () => {
    let data
    try{
        data = JSON.parse(fs.readFileSync("models/data.json"))
        if(!Array.isArray(data)) throw new Error()
    }
    catch(e){
        data = []
    }
    return data
}
const write = (data) => {
    fs.writeFileSync("models/data.json", JSON.stringify(data))
}

module.exports = { read, write }