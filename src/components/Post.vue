<template>
  <el-card class="box-card" :class="{ 'box-card__selectable': selectable }" shadow="hover">
    <template v-slot:header>
      <div>
        <h2>
          {{ post.title }}
        </h2>
      </div>
      <el-row class="meta" type="flex" justify="space-between">
        <el-col>
          <small>author:</small>
          <p>{{ post.author.username }}</p>
        </el-col>
        <el-col>
          <small>posted on:</small>
          <p>{{ new Date(post.created_at).toDateString() }}</p>
        </el-col>
        <el-col>
          <small>comments:</small>
          <p>{{ post.comments.length }} comment(s)</p>
        </el-col>
      </el-row>
    </template>
    <div>
      <el-row>
        <el-col :span="20" :offset="2">
         {{ post.body }}
        </el-col>
      </el-row>
    </div>
    <footer v-if="!selectable">
      <template v-if="showComments">
        <el-row v-for="comment in post.comments" :key="comment.commenter">
          <Comment :comment="comment" />
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="10">
            <CommentForm :postComment="createComment(post._id)" />
          </el-col>
        </el-row>
      </template>
      <el-row type="flex" justify="center">
        <el-button v-on:click="setShowComments(!showComments)">
          <template v-if="showComments">
            <i class="el-icon-minus"></i> Hide
          </template>
          <template v-else>
            <i class="el-icon-s-comment"></i>&nbsp;<span class="count">{{ post.comments.length }}</span>&nbsp;Comments
          </template>
        </el-button>
      </el-row>
    </footer>
  </el-card>
</template>

<script>
import Comment from './Comment'
import CommentForm from './CommentForm'
import { ref } from 'vue'

export default {
  name: 'Post',
  props: ['post', 'selectable', 'createComment'],
  components: { Comment, CommentForm },
  setup() {
    const showComments = ref(false)
    function setShowComments(show) {
      showComments.value = Boolean(show)
    }

    return {
      showComments,
      setShowComments
    }
  },
}
</script>

<style>
.el-card__header {
  text-align: center;
}
.meta small {
  margin-bottom: 0.5em;
  font-family: 'Cutive Mono', monospace;
}
.box-card__selectable {
  margin-top: 0;
  cursor: pointer;
}
.box-card:not(.box-card__selectable){
  margin-top: 5vh;
}
.box-card h2 {
  font-family: 'Oswald', sans-serif;
  font-weight: 400;
  margin: 1em;
  font-size: 1.77em;
}
footer {
  border-top: 1px solid #EBEEF5;
  padding-top: 1em;
}
</style>