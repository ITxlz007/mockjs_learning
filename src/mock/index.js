import Mock from 'mockjs'

var { newsList } = Mock.mock({
  'newsList|75': [
    {
      "id":"@increment()",
      "title":"@ctitle()",
      "content":"@cparagraph(5,15)",
      "img_url":"@image('100x100','#FF83FA','#FCFCFC','png','坤坤')",
      "add_time":"@date(yyyy-MM-dd)"
    }
  ]
})
console.log(newsList)
// 根据url获取query参数
const getQuery = (url,name)=>{
  const index = url.indexOf('?')
  if(index !== -1) {
    const queryStrArr = url.substr(index+1).split('&')
    for(var i=0;i<queryStrArr.length;i++) {
      const itemArr = queryStrArr[i].split('=')
      console.log(itemArr)
      if(itemArr[0] === name) {
        return itemArr[1]
      }
    }
  }
  return null
}

// 定义获取新闻列表的数据 /api/get/news?pageindex=1&pagesie=10
Mock.mock(/\/api\/get\/news/,'get',(options)=>{
  // 获取传递的参数pageindex
  const pageindex = getQuery(options.url,'pageindex')
  // 获取传递的参数pagesize
  const pagesize = getQuery(options.url,'pagesize')
  // 截取数据的起始位置
  const start = (pageindex-1)*pagesize
  // 截取数据的终点位置
  const end = pageindex*pagesize
  // 计算总页数
  const totalPage = Math.ceil(newsList.length/pagesize)
  // 
  //1 0-9  
  //2 10-19
  //3 20-29
  // 数据的起始位置：(pageindex-1)*pagesize  数据的结束位置：pageindex*pagesize
  const list = pageindex>totalPage?[]:newsList.slice(start,end)
  return {
    status: 200,
    message: '获取新闻列表成功',
    list: list,
    total: newsList.length
  }
})

// 定义添加新闻列表的数据
Mock.mock('/api/add/news','post',(options)=>{
  const body = JSON.parse(options.body)
  newsList.push(Mock.mock({
    "id":"@increment()",
    "title": body.title,
    "content": body.content,
    "img_url":"@image('100x100','#FF83FA','#FCFCFC','png','坤坤')",
    "add_time":"@date(yyyy-MM-dd)"
  }))
  
  return {
    status: 200,
    message: '添加成功',
    list: newsList,
    total: newsList.length
  }
})

// 定义删除的接口
Mock.mock('/api/delete/news','post',(options)=>{
  
  const body = JSON.parse(options.body)
  const index = newsList.findIndex(item=>item.id === body.id)
  newsList.splice(index,1)
  return {
    status: 200,
    message: '删除成功',
    list: newsList,
    total: newsList.length
  }
})