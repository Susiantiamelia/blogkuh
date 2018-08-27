<template>
  <v-flex xs4>
    <v-card flat>
      <h3>Sign Up</h3>
      <br>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-layout>
            <v-flex>
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Name"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container>
          <v-layout>
            <v-flex>
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                label="Username"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container>
          <v-layout>
            <v-flex>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container>
          <v-layout>
            <v-flex>
              <v-text-field  
                v-model="password"
                :append-icon="show1 ? 'visibility_off' : 'visibility'"
                :type="show1 ? 'text' : 'password'"
                :rules="passRules"
                :counter="10"
                name="input-10-1"
                label="Password"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        
      </v-form>
      <v-container>
        <v-btn block color="blue" dark @click="submit">REGISTER</v-btn>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
      show1: false,
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      username: '',
      usernameRules: [
        v => !!v || 'Name is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(v).toLowerCase()) || 'E-mail must be valid'
      ],
      password:'',
      name: '',
      passRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters'
      ],
    }),
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.$emit('regist', {
            fullname: this.name,
            username: this.username,
            email: this.email,
            password: this.password
          })

          this.name = ''
          this.username = ''
          this.email = ''
          this.password = ''
        }
      },
    }
}
</script>

<style scoped>
.v-card{
  background-color: transparent !important;
  border-left: 1px solid #2c8098 !important
}

h3{
    font-family: 'Merienda', cursive !important;
    font-size: 20px
}
</style>

