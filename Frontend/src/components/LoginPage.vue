<template lang="html">
  <div>
    <h1>Login</h1>
        <form @submit="onSubmit(uid , password)">
            <input type="text" v-model="uid" placeholder="user id">
            <input type="password" v-model="password">
            <input type="submit" value="Login">
        </form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      uid: '',
      password: ''
    }
  },
  methods: {
    onSubmit (uid, password) {
      // action login
      console.log(this.uid + ':' + this.password)
      this.goToPages ()
    },
    goToPages () {
      this.$router.push({
        name: 'hello'
      })
    }
  }
}
</script>

<style lang="css">
</style>
