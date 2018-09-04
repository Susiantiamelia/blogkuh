<template>
  <div id="regist">
    <Navbar :token="token"></Navbar>
    <v-container>
      <v-layout justify-center align-center fill-height row>
        <login :error="error" @login="login"></login>
        <regist @regist="regist"></regist>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import login from '@/components/login.vue'
import regist from '@/components/regist.vue'
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  components: {
    login,
    regist,
    Navbar
  },
  data(){
    return {
      error: '',
      token: localStorage.getItem('token') || false
    }
  },
  created() {
    if(this.token){
      this.$router.push('/dashboard')
    }
  },
  methods: {
    login (value) {
      console.log(value);
      axios.post('http://35.197.142.60/users/login',value)
      .then(user => {
        console.log(user);
        localStorage.setItem('token', user.data.token)
        this.$router.push('/dashboard')
      })
      .catch(err => {
        this.error = 'Username / Email / Password wrong'        
      })
      
    },
    regist(value){
      console.log(value);
      axios.post('http://35.197.142.60/users/register',value)
      .then(result => {
        swal({
          title: result.data.msg,
          type: "success",
        });
      })
      .catch(err => {
        swal({
          title: `${err.message}`,
          type: "error",
        });

      })
    }
  }
}
</script>

<style scoped>
#regist{
  background-color: #bdd8e8 !important;
  height: 150vh
}

.fill-height{
  height: 100vh !important;
}
</style>
