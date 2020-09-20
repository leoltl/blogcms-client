<template>
  <header>
    <el-page-header v-if="focusPost" @back="goBack" :content="focusPost.title">
    </el-page-header>
    <div v-else class="logo" >
      LOGO
    </div>
  </header>
  
  <main>
    <el-row v-if="focusPost">
      <el-col :md="{ span: 18, offset: 3}" :lg="{ span: 18, offset: 3}">
        <Post :post="focusPost" :selectable="false" :createComment="createComment"/>
      </el-col>
    </el-row>
    <template v-else>
      <el-row v-for="post in posts" :key="post.id">
        <el-col :md="{ span: 18, offset: 3}" :lg="{ span: 12, offset: 6}">
          <Post :post="post" v-on:click="viewPost(post._id)" :selectable="true"/>
        </el-col>
      </el-row>
    </template>
  </main>
</template>

<script>
import { ref } from 'vue'
import API from './RemoteAPI/API'
import Post from './components/Post'

export default {
  name: 'App',
  components: {
    Post
  },
  setup() {
    const posts = ref(null)
    const focusPost = ref(null)
    API.listPosts().then(res => { 
      posts.value = res.data
    })

    function viewPost(id) {
      focusPost.value = posts.value.find(post => post._id === id)
    }
    function goBack() {
      focusPost.value = null
    }

    function createComment(id) {
      return async function (comment) {
        const _post = focusPost.value
        console.log(_post)
        API.createComment(id, { body: comment.body, commenter: comment.commenter }).then(res => {
          _post.comments.push(res.data)
          console.log(_post)
        });
      }
    }

    return {
      posts,
      focusPost,
      viewPost,
      goBack,
      createComment,
    }
  }
}
</script>

<style scope>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.el-row {
  margin-bottom: 20px;
}

header {
  min-height: 64px;
  position: fixed;
  width: 100vw;
  display: flex;
  align-items: center;
  padding-left: 10vw;
  background: #409eff;
  z-index: 99;
  color: white;
  font-weight: bold;
}

main {
  padding-top: 69px;
}
</style>
