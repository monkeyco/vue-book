<template>
  <div>
    <v-app-bar
      app
      color="primary lighten-2"
      dark>
        <v-toolbar-title >書籍管理ツール</v-toolbar-title>
        <v-tabs>
            <v-tab to="/">書籍一覧</v-tab>
            <v-tab to="/search">書籍検索</v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>

<script>
export default {
    name:'Headers'
}
</script>

<style>
.v-toolbar__title {
    overflow: visible !important;
    margin-right: 50px !important;
}
</style>