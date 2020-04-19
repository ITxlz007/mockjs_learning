<template>
    <div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {

    }
  },

  created() {
    axios.get('/api/news').then(res=>{
      console.log(res)
    })
    axios.post('/api/post/news').then(res=>{
      console.log(res)
    })
  },

  methods: {

  }
};
</script>

<style scoped lang='less'>

</style>
