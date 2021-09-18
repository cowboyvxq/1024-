<template>
  <div class="wrapper">
    <h1>2222</h1>
  </div>
</template>

<script>
// import getLearnApi from "../api/learn";
export default {
  components: {},
  data() {
    return {};
  },
  created() {
    this.axios
    .get('https://cnodejs.org/api/v1/topics')
    .then(res => {
      console.log(res);
    })
  },
  methods: {
    
  },
  watch: {},
};
</script>
<style lang="less" scoped>
</style>