const dealing = require("../helpers/dealing")

const showAll = (req,res)=>{
 const data = dealing.read()

    res.render("showAll",{
        pagetitle:"All users",
        data
    })
}

const addOp = (req,res)=>{

    const id = req.query.id
    const opvalue = req.query.opvalue
    const optype = req.query.optype
    let data = dealing.read()
    let index = data.findIndex(u=>u.id==id)
     if (req.query.addop)         
 {   
    if (!(id && opvalue && optype)) {res.redirect("addoperation")}

    { if(optype=="add" && opvalue<=6000){
    
        data[index].remainingbalance = Number(data[index].remainingbalance) +Number(req.query.opvalue)
    }
    else if(optype=="withdraw" && opvalue<data[index].remainingbalance){
        
     data[index].remainingbalance = Number(data[index].remainingbalance) -Number(req.query.opvalue)
   
}
 else(res.redirect("addoperation"))}

let operation={ type: req.query.optype,
    value: req.query.opvalue,
    at: new Date()
}

data[index].operations.push(operation)
dealing.write(data)
res.redirect("/")
}

    res.render("addoperation",{pagetitle:"add operation"})
}

const show = (req,res)=>{
const id = req.query.id
const data = dealing.read()
const cust = data.find(u=>u.id==id)
    if(req.query.showCu) if(!cust) res.send("user not fond")

res.render("show",{
    pageTitle:"show",
    cust
})
}

const addCust = (req,res)=>{
  
    if( req.query.name &&
        req.query.initialbalance)

    { let data = dealing.read()
        let customer = {
        id:new Date(),
        name:req.query.name,
        initialbalance:req.query.initialbalance,
        remainingbalance:req.query.initialbalance,
        operations:[]
    }
    data.push(customer)
    dealing.write(data)
    res.redirect("/")
}
res.render("add")
}

module.exports = 
    {
        showAll,addCust,addOp,show
    }