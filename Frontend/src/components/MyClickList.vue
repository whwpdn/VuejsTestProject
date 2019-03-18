
<style>
  body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  font-size: 12px
}

.list-group-item {
  display: block;
  text-decoration: none;
  margin: 1em 0.2em;
  color: #4a4a4a;
}

.list-group-item:hover {
  color: red;
}

.highlight {
  color: blue;
}
</style>

<template>
  <div class="list-group">
      <a href="#"
        class="list-group-item list-group-item-action"
        @click="selectItem(item)"
        v-for="item in items">
          {{item.modelname}}
      </a>
  </div>
</template>

<script>
export default {
  name: 'MyList',
  props: ['items','viewType'],
  data () {
    return {
      selectedPlace: null
    }
  },
  methods: {
    selectItem (selectedItem) {
      this.selectedPlace = selectedItem

      var para = this.selectedPlace.modelname
      var sql =''
      if(para == "전체"){
        sql = '/all2'
      }
      else{
        sql = `/specific/${para}`
      }

      if(this.viewType ==0)
      {
        sql = 'api/equipment' + sql
        this.getList(sql)
      }
      else if(this.viewType ==1){

      }
      else if( this.viewType==2){
        sql = 'api/equipment/history' + sql
        this.getList(sql)
      }
    },
    getList(sql) {
        this.$http.get(`${sql}`)
        .then((response) => {
          this.$emit('UpdateGridData-event', response.data)
        })
        .catch(error => {
          console.log(error)
        });
    }
  }
}
</script>
