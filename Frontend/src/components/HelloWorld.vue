<template>
  <div id="HelloWorld" class="hello">
    <mygrid
    :data="equipment"
    :columns="gridColumns"></mygrid>
  </div>
</template>

<script>
import MyGrid from '@/components/MyGrid.vue'

export default {
  name: 'HelloWorld',
  created () {
    this.$http.get('api/equipment')
      .then((response) => {
        this.equipment = response.data
        
      })
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      gridColumns: ['_id', 'ManageNum', 'SerialNum', 'BoardId', 'SystemId', 'Splitter', 'CPU', 'RAM', 'HDD', 'VGA', 'UserId', 'Location', 'incomingDate', 'Note'],
      equipment: []
    }
  },
  components: {
    'mygrid': MyGrid
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
