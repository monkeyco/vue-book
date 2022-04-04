<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-card class="mx-auto">
                    <v-row>
                        <!-- 画像表示部 -->
                        <v-col cols="2" class="d-flex align-center">
                            <v-img :src="book.image" max-height="500" contain class="ml-2"></v-img>
                        </v-col>
                        <!-- テキスト入力部 -->
                        <v-col cols="10">
                            <v-card-title>
                                タイトル：{{ book.title }}
                            </v-card-title>
                            読んだ日：
                            <v-menu
                                v-model="menu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="date"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <!--
                                    下記記述を追加して日本語化している
                                    ・locale="jp-ja"
                                    ・:day-format="date => new Date(date).getDate()"
                                    【参考】
                                    https://arm4.hatenablog.com/entry/2018/08/17/155344
                                -->
                                <v-date-picker
                                    v-model="date"
                                    @input="menu = false"
                                    locale="jp-ja"
                                    :day-format="date => new Date(date).getDate()"
                                ></v-date-picker>
                            </v-menu>

                            感想：
                            <v-textarea
                                class="mx-2"
                                clearable
                                clear-icon="mdi-close-circle"
                                v-model="book.memo">
                                {{ book.memo }}
                            </v-textarea>

                            <v-card-actions>
                                <v-btn v-if="this.isRegisted"  color="secondary" to="/">一覧に戻る</v-btn>
                                <v-btn color="success" @click="$router.go(-1)">書籍検索に戻る</v-btn>
                                <v-btn color="info" @click="updateBookInfo">保存する</v-btn>
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
    name: 'BookEdit',
    props: {
        bookList: Array
    },
    data() {
        return {
            book: '',
            date: '',
            isRegisted: false,
            menu: false,
        }
    },
    methods: {
        // 更新処理
        updateBookInfo() {
            this.book.readDate = this.date
            // Vueに更新対象のbook情報を送る
            this.$emit('update-book-info', this.book)
        },
        async init() {

            // 登録済データ検索
            await this.fetchBookInfo()
            // ない場合はAPI検索
            await this.fetchApi()

            if (!this.book) {
                this.$router.push('/')
            }
            if (this.book.readDate){
                this.date = this.book.readDate
            } else {
                this.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
            }
        },
        async fetchBookInfo() {
            // 登録データ内に存在する場合は返却
            for (let registedBook of this.bookList) {
                if (registedBook.id === this.$route.params.id) {
                    this.book = registedBook
                    this.isRegisted = true
                    break
                }
            }
            return
        },
        async fetchApi() {
            if (this.book) {
                return
            }
            // GoogleAPIにアクセス
            const url = 'https://www.googleapis.com/books/v1/volumes/' + this.$route.params.id
            return this.axios.get(url)
                .then(res => {
                    let id = res.data.id
                    let title = res.data.volumeInfo.title
                    let img = res.data.volumeInfo.imageLinks
                    let description = res.data.volumeInfo.description
                    this.book = {
                        id : id,
                        title: title ? title : '',
                        image: img ? img.thumbnail : '/vue-sample/bookapp/img/no_image.jpg',
                        description: description ? description : '',
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // `vm` を通じてコンポーネントインスタンスにアクセス
            vm.$nextTick(()=>{
                vm.init()
            })
        })
    },

}
</script>