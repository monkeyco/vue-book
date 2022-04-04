<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-form ref="form">
                    <v-text-field
                        label="本のタイトルを検索"
                        v-model="keyword"
                        :rules="keywordRules"
                        @keydown.enter.prevent="trigger">
                    </v-text-field>
                </v-form>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" >
                <v-btn
                    color="primary"
                    :to="{name: 'BookSearch', query: {kw: keyword}}">
                    検索する
                </v-btn>

                <v-btn
                    color="secondary" class="ml-3"
                    to="/">
                    一覧に戻る
                </v-btn>
            </v-col>
        </v-row>
        <!-- 検索結果一覧部 -->
        <v-row >
            <v-col cols="12" md="4"
                v-for="book in searchResults"
                :key="book.index">
                <v-card class="mx-auto my-2" max-height="280">
                    <v-row>
                        <v-col cols="4">
                            <v-img :src="book.image" height="250" contain class="ml-2"></v-img>
                        </v-col>
                        <v-col cols="8">
                            <v-card-title class="text-overflow pl-0">{{ book.title }}</v-card-title>
                            <div class="text-overflow5" >
                                {{ book.description }}
                            </div>
                            <v-spacer></v-spacer>
                            <v-card-actions>
                                <v-btn
                                fab dark x-small
                                color="indigo"
                                :to="{name: 'BookEdit', params: {id: book.id}}">
                                    <v-icon dark>mdi-pencil</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'BookSearch',
    data() {
        return {
            keyword: '',
            searchResults:[],
            keywordRules: [
                v => !!v || '本のタイトルを入力してください',
            ],
        }
    },
    mounted() {
        this.keyword = this.$route.query.kw
        if (this.keyword) {
            this.search()
        }
    },
    watch: {
        $route() {
            this.search()
        }
    },
    methods: {
        // 検索処理
        search() {
            // 入力チェック
            if (!this.keyword) {
                return false
            }

            const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'
            const params = {
                q: `intitle:${this.keyword}`,
                country: 'JP',
                maxResults:40
            }
            const queryParams = new URLSearchParams(params)

            // GoogleAPIにアクセス
            this.axios.get(baseUrl + queryParams)
                .then(res => {
                    this.setResult(res.data)
                })
                .catch(error => {
                    console.log(error)
                    this.setResult()
                })
        },
        // 検索結果設定処理
        setResult(jsonData) {
            // 初期化
            this.searchResults = []

            if (!jsonData) {
                return
            }

            // 検索結果の配列に設定
            for (let book of jsonData.items) {
                let id = book.id
                let title = book.volumeInfo.title
                let img = book.volumeInfo.imageLinks
                let description = book.volumeInfo.description

                this.searchResults.push({
                    id : id,
                    title: title ? title : '',
                    image: img ? img.thumbnail : '/vue-sample/bookapp/img/no_image.jpg',
                    description: description ? description : '',
                })
            }
        },
        trigger(event) {
            if (event.keyCode == 13) {
                this.$router.push({name: 'BookSearch' ,query: { kw: this.keyword } }).catch(err => {})
            }
        }
    }
}
</script>
<style scoped>
.text-overflow {
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.text-overflow5 {
    display: -webkit-box;
    padding-right: 5px;
    overflow: hidden;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
}
</style>