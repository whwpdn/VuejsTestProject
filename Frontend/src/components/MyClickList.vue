
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
  props: ['items'],
  data () {
    return {
      selectedPlace: null
    }
  },
  methods: {
    selectItem (selectedItem) {
      this.selectedPlace = selectedItem
      this.getEquipmentList()
    },
    getEquipmentList () {
      var para = this.selectedPlace.modelname
      this.$http.get(`api/equipment/specific/${para}`)
        .then((response) => {
          this.$emit('UpdateGridData-event', response.data)
        })
    }
  }
}
</script>
