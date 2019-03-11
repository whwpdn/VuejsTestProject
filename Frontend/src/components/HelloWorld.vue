<template>
  <meta charset=euc-kr" />
  <div class="hello">
    <section class="content">
      <nav>
        <mylist :items="equipmentTypeList" 
               @UpdateGridData-event="UpdateGridData"></mylist>
      </nav>
      <main>
        <mygrid
          :data="equipment"
         :columns="gridColumns"></mygrid>
      </main>
    </section>

  </div>
</template>

<script>
import MyGrid from '@/components/MyGrid.vue'
import MyClickList from '@/components/MyClickList.vue'
export default {
  name: 'HelloWorld',
  created () {
    //this.$http.get('api/equipment/all')
    this.$http.get('api/equipment/all2')
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
      gridColumns: ['ManageNum','System','MatroxBoard', 'SerialNum', 'Splitter', 'CPU', 'RAM', 'HDD', 'VGA', 'UserName', 'Location', 'incomingDate', 'Note'],
      equipment: [],
      equipmentTypeList: []
    }
  },
  methods: {
    UpdateGridData: function(datas) {
      this.equipment = datas
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
nav, aside{
            flex-basis: 150px;
            flex-shrink: 0;
}
.content{
  display:flex;
}
.content nav{
  border-right:1px solid gray;
}
main{
  padding:10px;
}
</style>
