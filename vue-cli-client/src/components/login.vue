<template>
  <v-flex xs4>
    <v-card flat>
      <br><br><br>
      <h3>Sign In</h3>
      <br>
      <small>{{ error }}</small>
      <v-container>
        <v-layout >
          <v-flex >
            <v-text-field v-model="uname_email" label="Username / Email" ></v-text-field>
           </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-layout >
          <v-flex>
            <v-text-field  
              v-model="password"
              :append-icon="show1 ? 'visibility_off' : 'visibility'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-btn block color="blue" dark @click="login">LOGIN</v-btn>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data(){
    return {
      show1: false,
      uname_email: '',
      password: ''
    }
  },
  props: ['error'],
  methods: {
    login () {
      this.$emit('login', {
        uname_email: this.uname_email,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>
.v-card{
  background-color: transparent !important
}
.v-btn__content{
  color: white !important
}

small {
  color: red
}

h3{
    font-family: 'Merienda', cursive !important;
    font-size: 20px
}

</style>

