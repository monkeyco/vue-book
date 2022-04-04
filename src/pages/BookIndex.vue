<template>
    <v-container fluid>
        <v-row v-if="bookList.length">
            <v-col cols="12" sm="6">
                <v-text-field
                    v-model="keyword"
                    label="タイトル検索"
                    ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-btn color="error mt-4" @click="deleteLocalStorage">一括削除ボタン</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-if="!bookList.length">
                <v-alert
                    outlined
                    type="warning"
                    prominent
                    border="left"
                >
                    登録された書籍がありません。書籍検索より検索してください。
                </v-alert>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4" v-for="book in matchedList" :key="book.id">
                <v-card height="280">
                    <v-row>
                        <v-col cols="4" class="d-flex align-center">
                            <v-img :src="book.image" height="250" contain class="ml-2"></v-img>
                        </v-col>
                        <v-col cols="8">
                            <v-card-title class="pb-0 pl-0">
                                {{ book.title }}
                            </v-card-title>
                            <v-card-text class="pl-0">
                                <v-btn
                                    :to="{name: 'BookEdit', params: {id: book.id}}"
                                    color="indigo" fab x-small dark
                                    class="ml-0"
                                >
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn
                                    color="red"
                                    class="ml-2"
                                    fab x-small dark
                                    @click="deleteBook(book)">
                                    <v-icon>mdi-delete-circle-outline</v-icon>
                                </v-btn>
                            </v-card-text>
                            <v-icon>mdi-calendar</v-icon>
                            <span class="pl-1">{{ book.readDate }}</span>
                            <div class="text-overflow5">
                                <v-icon>mdi-chat-processing-outline</v-icon>
                                <span class="pl-1" :inner-html.prop="book.memo | convLine" />
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'BookIndex',
    props: {
        bookList: Array
    },
    data() {
        return {
            keyword: ''
        }
    },
    filters: {
        convLine(text) {
            if (text) {
                // 改行コードを<br>に変換
                return text.replace(/\r?\n/g, '<br>')
            }
        }
    },
    methods: {
        deleteBook(book) {
            // App.vueに削除するbook情報を送る
            this.$emit('delete-book', book)
        },
        deleteLocalStorage() {
            // App.vueのローカルストレージ削除処理を実行する
            this.$emit('delete-local-storage')
        }
    },
    computed: {
        matchedList() {
            return this.bookList.filter(function(el) {
                if (!this.keyword) {
                    return true
                }
                // タイトル入力ある場合、キーワードが含まれるものを返却
                return el.title.toUpperCase().indexOf(this.keyword.toUpperCase()) != -1
            },this)
        }
    }
}
</script>
<style scoped>
.text-overflow5 {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
}
</style>