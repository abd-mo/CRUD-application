const express=require('express');
const mongodb=require('mongodb');
const router=express.Router();


//router.get('/',(req,res)=>{
//    res.send('hello to my web site')
//});

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
//read from database
router.get('/',async(req,res)=>
{
    const iletiler=await loadIletilerCollection();
res.send(await iletiler.find({}).toArray());
});
//insert to database
router.post('/',async(req,res)=>
{const iletiler=await loadIletilerCollection();
    await iletiler.insertOne({
        text:req.body.text,
        createdAt:new Date()
    });
res.status(201).send("element inserted sucessfully");
});
router.post('/:id',async(req,res)=>
{const iletiler=await loadIletilerCollection();
    const id=new mongodb.ObjectID(req.params.id);
    await iletiler.update({_id:id},{$set:{text:req.body.text ,updatedAt:new Date()}});
    res.status(200).send("element updated sucessfully");
    });
//delete from database
router.delete('/:id',async(req,res)=>
{
    const iletiler=await loadIletilerCollection();
    await iletiler.deleteOne({_id:new mongodb.ObjectID(req.params.id)});
    res.status(200).send("element deleted sucessfully");
   
});
//update database using put
 router.put('/:id',async(req,res,next)=>{
    const iletiler=await loadIletilerCollection();
    const id=new mongodb.ObjectID(req.params.id);
    await iletiler.update({_id:id},{$set:{text:req.body.text ,updatedAt:new Date()}});
    res.status(200).send("element updated sucessfully");
    });
//update datebase using patch
router.patch('/:id',async(req,res,next)=>{
    const iletiler=await loadIletilerCollection();
    const id=new mongodb.ObjectID(req.params.id);
     await iletiler.update({_id:id},{$set:{text:req.body.text,updatedAt:new Date()}});
    res.status(200).send("element updated sucessfully");
     });
module.exports=router;

