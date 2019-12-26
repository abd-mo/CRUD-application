<template>
  <div class ="container">
    <h1>Son Iletiler</h1>
    <!-- create post-->
    <div class="create-post">
      <label for="create-post">Iletiniz yazın</label>
      <input type="text" id="create-post" v-model="text" placeholder="iletiniz yazin.....">
      <button v-on:click="kaydet">kaydet</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class ="post-container">
      <div class="post" v-for="ileti in iletiler" v-bind:key="ileti._id" v-on:dblclick=sil(ileti._id)>
        {{`
        ${ileti.createdAt.getDate()}/
        ${ileti.createdAt.getMonth()}/
        ${ileti.createdAt.getFullYear()}`}}
        <p class="text">{{ileti.text}}</p>
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
    await iletiService.inserPosts(this.text);
    this.iletiler=await iletiService.getPosts();

    
  },
  async sil(id){
    await iletiService.deletPosts(id);
    this.iletiler=await iletiService.getPosts();}
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
  border: 1px solid #5bd658; 
  background-color: #bcffb8; 
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
</style>