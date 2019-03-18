<template>
  <meta charset=euc-kr" />
  <div class="hello">
    <section class="content">
      <nav>
        <mylist :items="equipmentTypeList"
                :viewType="tabIndex"
               @UpdateGridData-event="UpdateGridData"></mylist>
      </nav>
      <main>
        <vue-tabs @tab-change="handleTabChange">
          <v-tab title="장비">
            <mygrid
          :data="equipment"
         :columns="gridColumns"
         :viewType="tabIndex"></mygrid>
          </v-tab>

          <v-tab title="보드">
            <mygrid
            :data="board"
            :columns="boardCol"
            :viewType="tabIndex"></mygrid>
          </v-tab>

          <v-tab title="히스토리">
            <mygrid
              :data="history"
              :columns="historyCol"
              :viewType="tabIndex"></mygrid>
          </v-tab>
        </vue-tabs>
        
      </main>
    </section>

  </div>
</template>

<script>
import MyGrid from '@/components/MyGrid.vue'
import MyClickList from '@/components/MyClickList.vue'
//local registration
import {VueTabs, VTab} from 'vue-nav-tabs'
//you can also import this in your style tag
import 'vue-nav-tabs/themes/vue-tabs.css'
export default {
  name: 'HelloWorld',
  props: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  created () {
    //this.$http.get('api/equipment/all')
    
    this.$http.get('api/equipment/TypeList')
    .then((response) => {
      this.equipmentTypeList = response.data
      //console.log(this.equipmentTypeList)
      this.$http.get('api/equipment/all2')
      .then((response) => {
        this.equipment = response.data
      })
    })
  },
  data () {
    return {
      gridColumns: ['ManageNum','System','serialNum','MatroxBoard', 'BoardSerialNum', 'Splitter', 'CPU', 'RAM', 'HDD', 'VGA', 'UserName', 'Location', 'incomingDate', 'Note'],
      historyCol: ['No','date','ManageNum', 'system','Serial','MatroxBoard','BoardSerial', 'Splitter', 'CPU', 'RAM', 'HDD', 'VGA', 'name', 'Location', 'incomingDate', 'Note'],
      boardCol: ['ManageNum', 'MatroxBoard','SerialNum','use', 'name', 'Location','IncomingDate', 'Note'],
      equipment: [],
      equipmentTypeList: [],
      history: [],
      board: [],
      tabIndex: 0
    }
  },
  methods: {
    UpdateGridData: function(datas) {
      if(this.tabIndex==0){

        this.equipment = datas
      }
      else if(this.tabIndex==1){

      }
      else if(this.tabIndex==2){
        this.history = datas
      }
    },
    handleTabChange(tabIndex, newTab, oldTab){
      this.tabIndex = tabIndex
      if(tabIndex ==0){

      }
      else if(tabIndex ==1){
        if(this.board.length ==0) {
          this.$http.get('api/equipment/BoardDetails')
          .then((response) => {
            this.board = response.data
          })  
        }
      }
      else {// 히스토리
        if(this.history.length ==0){
          this.$http.get('api/equipment/history/all2')
          .then((response) => {
            this.history = response.data
            //console.log(this.equipmentTypeList)
          })
          .catch(error => {
            console.log(error)
          });  
        }
        
      } 
    }
  },
  components: {
    'mygrid': MyGrid,
    'mylist': MyClickList,
    VueTabs,
    VTab
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
