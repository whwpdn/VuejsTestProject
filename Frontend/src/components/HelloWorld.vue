<template>
  <div class="hello">
    <mylist :items="equipmentTypeList"></mylist>
    <mygrid
    :data="equipment"
    :columns="gridColumns"></mygrid>
  </div>
</template>

<script>
import MyGrid from '@/components/MyGrid.vue'
import MyClickList from '@/components/MyClickList.vue'
export default {
  name: 'HelloWorld',
  created () {
    this.$http.get('api/equipment/all')
      .then((response) => {
        this.equipment = response.data
        //console.log(this.equipment)
      })
    this.$http.get('api/equipment/TypeList')
    .then((response) => {
      this.equipmentTypeList = response.data
      //console.log(this.equipmentTypeList)
    })
  },
  data () {
    return {
      gridColumns: ['_id', 'ManageNum', 'SerialNum', 'BoardId', 'SystemId', 'Splitter', 'CPU', 'RAM', 'HDD', 'VGA', 'UserId', 'Location', 'incomingDate', 'Note'],
      equipment: [],
      equipmentTypeList: []
    }
  },
  components: {
    'mygrid': MyGrid,
    'mylist': MyClickList
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
