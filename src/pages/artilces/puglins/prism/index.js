// import * as remarkPrism from 'remark-prism';
import Prism from 'prismjs';

const reg = /{(.+)}/g;
export default function prism(init, options){
  console.log('ssss')
  return{

    viewerEffect(prams){
      const { markdownBody } = prams;
      
      // 给标题添加锚点
      // 和菜单里同步
      const $heads = markdownBody.querySelectorAll("h1,h2,h3,h4,h5,h6");
      $heads.forEach((el, i) => {
        el.setAttribute('id', `heading-${i + 1}`)
      })

      const els = markdownBody.querySelectorAll('pre');      
      if (els.length === 0) return;

      // 设置高亮和行号
      els.forEach((el) => {
        el.classList.add("line-numbers");
        const className = el.querySelector("code").classList.value;
        const res = reg.exec(className)
        if(res){
          el.dataset.line = res[1]
        }
      });  
      Prism.highlightAll();
    },
  }
}