<template>
  <el-col :span="18" :offset="3">
    <el-row type="flex" align="middle">
      <el-avatar :size="24" icon="el-icon-user-solid"></el-avatar>
      <span class="commenter">
        {{ comment.commenter }}
      </span>
    </el-row>
    <el-row>
      {{ comment.body }}
    </el-row>
  </el-col>
</template>

<script>
export default {
  name: "Comment",
  props: ['comment'],
}
</script>

<style scoped>
.commenter {
  margin-left: 1em;
}
</style>