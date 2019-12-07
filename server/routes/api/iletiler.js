const express=require('express');
const mongodb=require('mongodb');
const router=express.Router();


//router.get('/',(req,res)=>{
//    res.send('hello to my web site')
//});

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

        'mongodb+srv://abdelrahman:123456789Asd@cluster0-fqdy1.mongodb.net/test?retryWrites=true&w=majority',
        {

        useNewUrlParser:true,
        useUnifiedTopology:true
        }

    );
 
    return client.db('deneme').collection('iletiler');
}

router.post('/',async(req,res)=>
{const iletiler=await loadIletilerCollection();
    await iletiler.insertOne({
        text:req.body.text,
        createdAt:new Date()
    });
res.status(201).send();
});

router.delete('/:id',async(req,res)=>
{
    const iletiler=await loadIletilerCollection();
    await iletiler.deleteOne({_id:new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});
module.exports=router;

