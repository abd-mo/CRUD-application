<template>
  <div class ="container">
    <h1>Son iletiler</h1>
    <!-- create post-->
    <div class="create-post">
      <label for="create-post">iletiniz yazın : </label>
      <input type="text" id="create-post" v-model="text" placeholder="iletiniz yazin....."> &nbsp; &nbsp;
      <button v-on:click="kaydet">kaydet</button>
    </div>
    <br>
    <div class="update-post">
      <label for="update-post">ip yazın : </label>
      <input type="text" id="update-post" v-model="id" placeholder="ip yazin....."> &nbsp; &nbsp;
      <button v-on:click="update">update</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class ="post-container">
      <div class="post" v-for="ileti in iletiler" v-bind:key="ileti._id" v-on:dblclick=sil(ileti._id)>
        {{`
        ${ileti.createdAt.getDate()}/
        ${ileti.createdAt.getMonth()+1}/
        ${ileti.createdAt.getFullYear()}`}}
        <p class="text">{{ileti.text}}</p>
        <p class="id">Ip : {{ileti._id}}</p>
      </div>
       </div>
      

      
  </div>
</template>

<script>
import iletiService from '../iletiService';
export default {
  name: 'IletiComponent',
  data(){
return {
  iletiler:[],
  error:'',
  text:''

}
  },
async created(){
    try {
    this.iletiler=await iletiService.getPosts()
    } catch (err) {
      this.error=err.message;
    }
  },

methods:{
  async kaydet(){
    await iletiService.inserPost(this.text);
    this.iletiler=await iletiService.getPosts();
    this.text=''
  },
  async sil(id){
    await iletiService.deletPost(id);
    this.iletiler=await iletiService.getPosts();},

  async update(){
    await iletiService.updatePost(this.id,this.text);
    this.iletiler=await iletiService.getPosts();
    this.text=''
    this.id=''}
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container { 
  max-width: 800px; 
  margin: 0 auto; 
}

p.error { 
  border: 1px solid #ff5b5f; 
  background-color: #ffc5c1; 
  padding: 10px; 
  margin-bottom: 15px; 
}

div.post { 
  position: relative; 
  border: 10px solid rgb(0, 0, 0, 0); 
  background-color:#bcffb8; 
  padding: 10px 10px 30px 10px; 
  margin-bottom: 15px; 
}

div.created-at { 
  position: absolute; 
  top: 0; 
  left: 0; 
  padding: 5px 15px 5px 15px; 
  background-color: darkgreen; 
}

p.text { 
  font-size: 22px; 
  font-weight: 700; 
  margin-bottom: 0; 
}

p.id { 
  font-size: 16px; 
  font-weight: 700; 
  margin-bottom: 0; 
  color: rgb(59, 3, 150);
}
</style>