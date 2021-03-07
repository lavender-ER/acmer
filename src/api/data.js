import request from "@/utils/request"

// 爬取单词释义题目等
export function getDailyWords() {
    return request({
        url: '/daily_words/',
        method: 'get'
    })
}

export function getWords() {
    return request({
        url: 'getWords/',
        method: 'get',
    })
}

export function getMeaning(key) {
    return request({
        url: 'getMeaning/',
        method: 'post',
        data: {
            key: key
        }
    })
}

export function getAC() {
    return request({
        url: 'getAC/',
        method: 'get',
    })
}

// 文章种类
export function getAlgorithms() {
    return request({
        url: '/algorithms/',
        method: 'get'
    })
}

export function addType(name) {
    return request({
        url: 'algorithm/add_algorithm/',
        method: 'post',
        data: {name: name}
    })
}

export function getType() {
    return request({
        url: 'algorithm/getAll/',
        method: 'get'
    })
}

export function deleteType(id) {
    return request({
        url: 'algorithm/deleteAlgorithm/',
        method: 'delete',
        data: {
            id: id
        }
    })
}

export function editType(id, name) {
    return request({
        url: 'algorithm/edit_algorithm/',
        method: 'put',
        data: {
            id: id,
            name: name
        }
    })
}

// 博客文章
export function getAllBlogs() {
    return request({
        url: 'article/get_articles/',
        method: 'post',
        data: {
            algorithm: 'all'
        }
    })
}

export function getBlogs(start, end, alg) {
    return request({
        url: 'article/get_articlesByCs/',
        method: 'post',
        data: {
            algorithm: alg,
            start: start,
            end: end
        }
    })
}

export function deleteBlog(id) {
    return request({
        url: 'article/deleteItem/',
        method: 'delete',
        data: {
            id: id
        }
    })
}

export function addBlog(id, title, content, algorithm, desc, name) {
    console.log(id + " " + title + " " + content + " " + algorithm + " " + desc + " " + name);
    return request({
        url: 'article/add_article/',
        method: 'post',
        data: {
            author_id: id,
            title: title,
            content: content,
            algorithm: algorithm,
            desc: desc,
            author: name
        }
    })
}

export function getTopArticle() {
    return request({
        url: 'article/topArticles/',
        method: 'get',
    })
}

export function getArticleById(id) {
    return request({
        url: 'article/get_articlesById/',
        method: 'post',
        data: {
            id: id,
        }
    })
}

export function getArticleByAuthorId(id) {
    return request({
        url: 'article/get_articlesByAuthorId/',
        method: 'post',
        data: {
            id: id,
        }
    })
}

export function getArticlesByAlgId(id) {
    return request({
        url: 'article/get_articlesByAlgId/',
        method: 'post',
        data: {
            id: id
        }
    })
}

// 倒计时
export function getCountDown() {
    return request({
        url: 'countDown/getAll/',
        method: 'get',
    })
}

export function addCountDown(Name, link, date) {
    return request({
        url: 'countDown/add_countDown/',
        method: 'post',
        data: {
            name: Name,
            date: date,
            sign: link,
        }
    })
}

export function deleteCountDown(id) {
    return request({
        url: 'countDown/multiple_delete/',
        method: 'delete',
        data: {
            id: id
        }
    })
}

export function searchCountDown(start, end) {
    return request({
        url: 'countDown/getSE/',
        method: 'post',
        data: {
            start: start,
            end: end
        }
    })
}

export function editCountDown(id, sign, name, date) {
    return request({
        url: 'countDown/edit_count/',
        method: 'put',
        data: {
            id: id,
            sign: sign,
            name: name,
            date: date
        }
    })
}

//  新闻
export function getTopNews() {
    return request({
        url: 'news/topNews/',
        method: 'get',
    })
}

export function getNews() {
    return request({
        url: 'news/news/',
        method: 'get',
    })
}

export function getNewsByPage(max_page, page) {
    return request({
        url: 'news/',
        method: 'get',
        params: {
            max_page, page
        }
    })
}

export function getNewsById(id) {
    return request({
        url: 'news/get_NewsById/',
        method: 'post',
        data: {
            id: id
        }
    })
}

export function searchNews(start, end) {
    return request({
        url: 'news/getByDate/',
        method: 'post',
        data: {
            start: start,
            end: end
        }
    })
}

export function deleteNews(id) {
    return request({
        url: 'news/news_delete/',
        method: 'delete',
        data: {
            id: id
        }
    })
}

export function addNews(title, content, author) {
    return request({
        url: 'news/add_news/',
        method: 'post',
        data: {
            title: title,
            content: content,
            author: author
        }
    })
}

export function editNews(id, title, content, author) {
    return request({
        url: 'news/edit_news/',
        method: 'put',
        data: {
            id: id,
            title: title,
            content: content,
            author: author
        }
    })
}

// 登录
export function SignInM(username, password) {
    return request({
        url: 'login/LogOn/',
        method: 'post',
        data: {
            username: username,
            password: password
        }
    })
}

// 注册
export function registerM(username, password) {
    return request({
        url: 'login/register/',
        method: 'post',
        data: {
            nickname: username,
            pwd: password
        }
    })
}

// 推荐书籍
export function addBooks(bookName, PublisherName) {
    return request({
        url: 'books/',
        method: 'post',
        data: {
            name: bookName,
            publisher: PublisherName
        }
    })
}

export function editBooks(id, bookName, PublisherName) {
    return request({
        url: 'books/edit_book/',
        method: 'put',
        data: {
            id: id,
            name: bookName,
            publisher: PublisherName
        }
    })
}

export function searchAllBooks() {
    return request({
        url: 'books/getAll/',
        method: 'get',
    })
}

export function deleteBooks(id) {
    return request({
        url: 'books/deleteBook/',
        method: 'delete',
        data: {
            id: id
        }
    })
}

// 集训队员
export function searchCoder(year) {
    return request({
        url: 'acmer/getByDate',
        method: 'post',
        data: {
            year: year
        }
    })
}

export function searchAllCoder() {
    return request({
        url: 'acmer/getAll/',
        method: 'get',
    })
}

// 链接
export function getHref() {
    return request({
        url: 'href/hrefs/',
        method: 'get',
    })
}

export function getAllLink() {
    return request({
        url: '/href/hrefs/',
        method: 'get',
    })
}

export function addHref(name, href) {
    return request({
        url: '/href/add_href/',
        method: 'post',
        data: {name: name, url: href}
    })
}

export function deleteHref(id) {
    return request({
        url: '/href/deleteLink/',
        method: 'delete',
        data: {id: id}
    })
}

export function editHref(id, name, url) {
    return request({
        url: '/href/edit_href/',
        method: 'put',
        data: {id: id, name: name, url: url}
    })
}

// 资源
export function uploadR(file) {
    console.log(file);
    return request({
        url: 'resource/add_resource/',
        method: 'post',
        data: {file: file},
    })
}

export function getSourceInfo() {
    return request({
        url: 'resource/get_resourceInfo/',
        method: 'get',
    })
}

export function deleteSourceInfo(id) {
    return request({
        url: 'resource/deleteSource/',
        method: 'delete',
        data: {
            id: id
        }
    })
}

export function editSourceInfo(id, name, desc) {
    return request({
        url: 'resource/edit_resource/',
        method: 'put',
        data: {
            id: id,
            name: name,
            desc: desc
        }
    })
}

export function downloadSource(id) {
    return request({
        url: 'resource/download_resource/',
        method: 'post',
        data: {
            id: id,
        }
    })
}

// 轮播图
export function getCarouselInfo() {
    return request({
        url: 'carousel/get_carouselInfo/',
        method: 'get',
    })
}

export function deleteCarouselInfo(id) {
    return request({
        url: 'carousel/deleteCar/',
        method: 'delete',
        data: {
            id: id,
        }
    })
}

// 用户信息
export function getPersonInfo(id) {
    console.log('12131');
    console.log(id);
    return request({
        url: 'user/get_InfoById/',
        method: 'post',
        data: {
            id: id
        }
    })
}

