const express=require('express');
const mongodb=require('mongodb');
const router=express.Router();


router.get('/',(req,res)=>{
    res.send('hello to my web site')
});

router.get('/',async(req,res)=>
{
    const iletiler=await loadIletilerCollection();
res.send(await iletiler.find({}).toArray());
});
//İletiler koleksiyonunu çekmek için
async function loadIletilerCollection()
{

    const client=await mongodb.MongoClient.connect
    (

        'mongodb+srv://abdelrahman:<password>@cluster0-fqdy1.mongodb.net/test?retryWrites=true&w=majority' ,
        {

        useNewUrlParser:true,
        useUnifiedTopology:true
        }

    );
 
    return client.db('deneme').collection('iletiler');
}
module.exports=router;

