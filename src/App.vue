<template>
    <v-app>
        <Header/>
        <v-main>
            <router-view
                :bookList="bookList"
                @update-book-info="updateBookInfo"
                @delete-book="deleteBook"
                @delete-local-storage="deleteLocalStorage"
            />
        </v-main>
        <Footer/>
    </v-app>
</template>

<script>
import Header from '@/global/Header.vue';
import Footer from '@/global/Footer.vue';
const STORAGE_KEY = 'books'
export default {
    name: 'App',
    components: {
        Header,
        Footer
    },

    data() {
        return {
            // 保存されている本リスト
            bookList: [],
        }
    },
    // 初期表示
    mounted() {
        this.createMetaTitle()
        this.bookList = [];
        if (localStorage.getItem(STORAGE_KEY)) {
            try {
                // JSON 文字列を取得し、JavaScriptオブジェクトに変換
                this.bookList = JSON.parse(localStorage.getItem(STORAGE_KEY));
            } catch(e) {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    },
    methods: {
        // 書籍削除処理
        deleteBook(bookInfo) {
            const isDelete = 'この書籍を削除してもいいですか？'
            if (window.confirm(isDelete)) {
                let index = this.getBookListIndex(bookInfo.id)
                if (index >= 0) {
                    this.bookList.splice(index, 1)
                    this.saveLocalStorage();
                }
            }
        },
        getBookListIndex(id) {
            // 引数のidのデータがある場合はその配列のインデックスを返却する
            let idx = 0
            for (let book of this.bookList) {
                if (book.id === id) {
                    return idx
                }
                idx++
            }
            return -1
        },
        addBookList(bookInfo) {
            let index = this.getBookListIndex(bookInfo.id)
            if (index >= 0) {
                // bookListにある場合は差し替える
                this.bookList[index] = bookInfo
            } else {
                // bookListに存在しない場合、追加
                this.bookList.push(bookInfo)
            }
        },
        // 編集内容保存処理(編集画面で保存ボタン押下時に実行)
        updateBookInfo(updateInfo) {
            this.addBookList(updateInfo)
            this.saveLocalStorage()
            this.goToTopPage()
        },
        // ローカルストレージ登録
        saveLocalStorage() {
            const parsed = JSON.stringify(this.bookList);
            localStorage.setItem(STORAGE_KEY, parsed);
        },
        // 書籍一括削除
        deleteLocalStorage() {
            const isDelete = '登録した書籍を削除してもいいですか？'
            if (window.confirm(isDelete)) {
                localStorage.removeItem(STORAGE_KEY);
                this.books = []
                window.location.reload()
            }
        },
        goToTopPage() {
            // TOPページへ遷移
            this.$router.push('/')
        },
        // titleタグ設定(/router/index.jsに記述したtitleを取得・設定)
        createMetaTitle() {
            if (this.$route.meta.title) {
                document.title = this.$route.meta.title
            } else {
                document.title = '書籍管理ツール'
            }
        }
    },
    watch: {
        // 画面が切り変わったことを検知して実行
        '$route' (route) {
          this.createMetaTitle(route)
      }
    }
};
</script>
