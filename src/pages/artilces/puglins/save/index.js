export default function save(){
  return{
    viewerEffect(params){
      console.log(params)
    },
    rightActions: [{
      title: '代码高亮',
      icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M6 44L6 25H12V17H36V25H42V44H6Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M17 17V8L31 4V17" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      handler: {
        type: 'action',
        click(params){
          console.log(params)
        }
      }
    }]
  }
}