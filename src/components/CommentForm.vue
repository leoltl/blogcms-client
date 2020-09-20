<template>
  <el-form ref="form" label-width="120px">
    <h3>Submit Comment</h3>
    <el-form-item label="Name">
      <el-input v-model="form.commenter" placeholder="Your name..."></el-input>
    </el-form-item>
    <el-form-item label="Your Comment">
      <el-input type="textarea" v-model="form.body" placeholder="Your comment..."></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'CommentForm',
    props: ['postComment', 'postId'],
    data() {
      return { 
        form: {
          commenter: "",
          body: "",
        }
      }
    },
    methods: {
      onSubmit() {
        this.postComment(this.form)
        this.form.commenter = ''
        this.form.body = ''
      }
    }
  }
</script>

<style scoped>
h3 {
  font-family: 'Oswald', sans-serif;
  font-weight: 400;
  margin: 1em;
  font-size: 1.333em;
}
</style>