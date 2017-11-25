class Webhook {
    constructor(){
    }
    async request(req,res){
        console.log(req.body);
        res.json({})
    }
}

export default Webhook;
