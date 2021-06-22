import request from '@/utils/request';

export function getList(){
  return request.get('/articles');
}

export function getArticle(id){
  return request.get(`/articles/${id}`);
}