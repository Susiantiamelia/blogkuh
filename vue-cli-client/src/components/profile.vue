<template>
  <v-flex xs4>
    <v-card>
      <br><br><br>
      <h3>Profile</h3>
      <br>
      <v-container>
        <v-layout>
          <v-flex>
            <v-text-field v-model="user.fullname" label="fullname" ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-layout>
          <v-flex>
            <v-text-field v-model="user.username" label="username" ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-layout>
          <v-flex>
            <v-text-field v-model="user.email" label="email" ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-btn block color="black" dark @click="edit">EDIT</v-btn>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ['user'],
  methods: {
    edit(){
      this.$emit('edit', {
        fullname: this.user.fullname,
        username: this.user.username,
        email: this.user.email
      })
    }
  }
}
</script>

<style scoped>

</style>
