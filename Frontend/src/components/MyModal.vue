<template>
  <div class="modal-mask"  v-if="visible" >
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h2> 상세정보</h2>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <tr v-for="(value, key) in editItem">
                <div v-if="key==='_id'">
                </div>
                <div v-else>
                  <td>{{key}}</td>
                  <td>
                  <input type="text" :id="key" v-on:change="onChanged" v-model="value">
                </td>
                </div>
              </tr>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" v-on:click="clickOk">
                OK
              </button>
              <button class="modal-default-button" v-on:click="$emit('close')">
                Cancel
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'my-modal',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    editItem: []
  
  },
  data() {
    return {
      changedData: {}
    }
  },
  methods: {
    clickOk: function () {
      this.visible = false
      this.updateEquipmentDetail ()
      //this.$emit('childs-event', this.editItem)
      this.$emit('close')
      
    },
    onChanged: function(evt){
      //this.editItem[evt.target.id] = evt.target.value
      this.changedData[evt.target.id] = evt.target.value
      //console.log(this.changedData)
    },
    updateEquipmentDetail () {
      var para = this.editItem
      this.changedData['_id'] = this.editItem._id
      this.$http.post(`api/equipment/UpdateEqDetail/`,this.changedData)
         .then((response) => {
           if ( response.status ==200){
            for(var key in this.changedData) {
              this.editItem[key] = this.changedData[key]
            }
           }
         })
    }
  }
}
</script>

<style type="text/css">
  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
