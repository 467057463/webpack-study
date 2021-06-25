import request from '@/utils/request';

export function getList(params){
  return request.get('/articles', params);
}

export function getArticle(id){
  return request.get(`/articles/${id}`);
}