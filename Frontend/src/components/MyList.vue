
<style>

  a{color:black}
  .list-group-item:hover{color:rgb(255,98,124);}
  .left{
    position:fixed; 
    top:0px; 
    left:0px; 
    width:250px; 
    height:1000px; 
    background:rgba(255,98,124,0.6); 
    padding:30px 0; 
    overflow: hidden
  }
  .left ul {
    padding: 0 30px;
    list-style:none;
            }
  .left ul li { font-size:20px;  height:60px;} 
  .left ul li#logo {font-family: 'Passion One', cursive; font-size:50px; height:170px;}
  .left ul li#logo div {line-height: 0.8}
  .left ul li#company {font-size:16px; margin-top:150px; }
  #left_btn {position:fixed; top:495px; left:-60px; cursor:pointer}

</style>

<template>
  <div class=left>
    <ul >
      <li v-for="item in items">
        {{item.modelname}}
      </li>
    </ul>
  </div>
  <button id='left_btn'>dd</button>
</template>

<script>
export default {
  name: 'MyList',
  props: ['items'],
  methods: {
    enter: function (el, done) {
      this.toggle = this.leave
      var left = (250 - (parseInt(left_btn).css('width')) / 2) + 'px'
      left.stop().animate({left: '0px'}, 800)
      left_btn.stop().animate({left: left}, 800)
      left_btn.css({transform: 'rotate(180deg)'})
    },
    leave: function (el, done) {
      this.toggle = this.enter
      var left = (0 - (parseInt(left_btn).css('width')) / 2) + 'px'
      left.stop().animate({left: '-250px'}, 800)
      left_btn.stop().animate({left: left}, 800)
      left_btn.css({transform: 'rotate(0deg)'})
    },
    resize: function () {
      window.addEventListener('resize', function () {
        var height = (window.innerHeight / 2) + 'px'
        left_btn.css({'top': height})
      })
    }
  },
  created(){
    this.resize()
  }
}
</script>