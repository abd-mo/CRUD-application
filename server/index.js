const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors')

const app=express();

app.use(bodyParser.json());
app.use(cors());

const iletiler=require('./routes/api/iletiler');
app.use('/api/iletiler',iletiler);

const port=process.env.port||5000;
app.listen(port,() => console.log(`server started on port ${port}`));

