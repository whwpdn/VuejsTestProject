
<style>
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 10px;
  color: #444;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 50px;
  padding: 3px 3px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-bind:key="key" v-for="key in columns">
            {{key}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in data" v-on:click="handleClickItem(entry)">
          <td v-for="key in columns">
            <div  v-if="key === 'date'">
              {{DateFormat(entry[key] , 'YY-MM-DD HH:mm:ss')}}
            </div>
            <div  v-else-if="key === 'incomingDate'">
              {{DateFormat(entry[key] , 'YYYY-MM')}}
            </div>
            <div v-else>
              {{entry[key]}}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <app-my-modal 
    :visible="visible" 
    :editItem="item" 
    
    @close="visible = false"/>
  </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import myModal from './MyModal.vue'
import moment from 'moment'
export default {

  name: 'MyGrid',
  props: ['columns', 'data', 'viewType'],
  data () {
    return {
      visible: false,
      item: []

    }
  },
  components: {
    appMyModal: myModal
  },
  methods: {
    handleClickItem: function (entry) {
      if(this.viewType == 2) return
      this.visible = !this.visible
      this.item = entry
      //console.log('click' + this.item + this.visible)
    },
    DateFormat: function (value, formatString){
      if( value) {
        return moment(String(value)).format(formatString)
      }
    }
    //@childs-event="parentsMethod"
    // parentsMethod: function(editedData) {
    //   for(var key in editedData){
    //     this.data[key] = editedData[key]
    //     console.log(key,editedData[key])
    //   }
    // }
  }
}
</script>
