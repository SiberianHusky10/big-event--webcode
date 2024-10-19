import request from '@/utils/request.js'
//import { useTokenStore } from '@/stores/token.js'

//文章分类列表查询
export const articleCategoryListService = ()=>{
    //const tokenStore = useTokenStore();
    //再pinia中定义的响应式数据，都不要.value
    // return request.get('/category', {headers:{'Authorization':tokenStore.token}})
    return request.get('/category')
}

//添加文章分类
export const addArticleCategoryService = (categoryData)=>{
    return request.post('/category', categoryData)
}

//更新文章分类
export const updateCategoryService = (categoryData)=>{
    return request.put('/category', categoryData)
}

//删除文章分类

export const deleteArticleCategoryService = (id)=>{
    return request.delete('/category?id=' + id)
}

//文章列表查询
export const articleListService = (params)=>{
    return request.get('/article', {params:params});
}

//文章上传
export const uploadArticleService = (articleData)=>{
    return request.post('/article',articleData)
}

//删除文章
export const deleteArticleService = (id)=>{
    return request.delete('/article?id=' + id)
}

//文章更新
export const updateArticleService = (articleData)=>{
    return request.put('/article', articleData)
}

//获取文章详情
export const detailArticleService = (id)=>{
    return request.get('/article/detail?id=' + id)
}
