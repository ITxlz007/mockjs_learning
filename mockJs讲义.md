#### mockJs

##### 什么是mockJs

[文档](http://mockjs.com/)

生成随机数据，拦截 Ajax 请求 

##### 为什么使用mockJs

在工作开发中，如果后端接口还未开发完成，难道我们就只能写静态页面了吗？所以前端为了不影响工作效率，我们自己手动模拟后端接口返回随机数据。

1. 采用json数据模拟，生成数据比较繁琐，也比较有局限性，没办法达到增删改查
2. 采用mockJs进行模拟数据，可以模拟各种场景（get、post）生成接口，并且随机生成所需数据，还可以对数据进行增删改查 


##### 使用mockJs

通过vue-cli创建基本项目

+ 在项目中安装mock

  ```js
  npm install mockjs
  ```

+ 在项目中新建mock文件

  ```js
  //引入mock模块
  import Mock from 'mockjs';
  ```

+ 将mock文件在main.js中导入

  ```js
  import Vue from 'vue'
  import App from './App.vue'
  import './mock/index.js'

  Vue.config.productionTip = false

  new Vue({
    render: h => h(App),
  }).$mount('#app')
  ```

#####  mock语法

###### 生成字符串

+ 生成指定次数字符串

  ```js
  import Mock from 'mockJs'
  const data = Mock.mock({
      "string|4": "哎呦！"
  })
  ```

+ 生成指定范围长度字符串

  ```js
  const data = Mock.mock({
      "string|1-8": "哎呦！"
  })
  ```



###### 生成文本

- 生成一个随机字符串

  ```js
  const data = Mock.mock({
      "string": "@cword"
  })
  ```


- 生成指定长度和范围

  ```js
  const data = Mock.mock({
      string: "@cword(1)",
      str: '@cword(10,15)'
  })
  ```


###### 生成标题和句子

+ 生成标题和句子

  ```js
  const data = Mock.mock({
      title: "@ctitle",
      sentence: '@csentence'
  })
  ```

+ 生成指定长度的标题和句子

  ```js
  const data = Mock.mock({
      title: "@ctitle(8)",
      sentence: '@csentence(50)'
  })
  ```

+ 生成指定范围的

  ```js
  const data = Mock.mock({
      title: "@ctitle(5,8)",
      sentence: '@csentence(50,100)'
  })
  ```


###### 生成段落

+ 随机生成段落

  ```js
  const data = Mock.mock({
      content: '@cparagraph()' 
  })
  ```


###### 生成数字

+ 生成指定数字

  ```js
  const data = Mock.mock({
      "number|80": 1
  })
  ```

+ 生成范围数字

  ```js
  const data = Mock.mock({
      "number|1-999": 1
  })
  ```

###### 生成增量id

+ 随机生成标识

  ```js
  const data = Mock.mock({
      id: '@increment()'
  })
  ```

###### 生成姓名-地址-身份证号

+ 随机生成姓名-地址-身份证号

  ```js
  const data = Mock.mock({
      name: '@cname()',
      idCard: '@id()',
      address: '@city(true)'
  })​
  ```


###### 随机生成图片

+ 生成图片：@image("300x250","#ff0000","#fff","gif","坤坤")


+ 参数1：图片大小

  ```js
  [
      '300x250', '250x250', '240x400', '336x280', 
      '180x150', '720x300', '468x60', '234x60', 
      '88x31', '120x90', '120x60', '120x240', 
      '125x125', '728x90', '160x600', '120x600', 
      '300x600'
  ]
  ```

+ 参数2：图片背景色

+ 参数3：图片前景色

+ 参数4：图片格式

+ 参数5：图片文字

###### 生成时间

+ @Date
+ 生成指定格式时间：@date(yyyy-MM-dd hh:mm:ss)

###### 指定数组返回的条数

+ 指定长度：‘data|5’

+ 指定范围：‘data|5-10’

  ```js
  const data = Mock.mock({
      'list|50-99':[
          {
              name: '@cname()',
              address: '@city(true)',
              id: '@increment()'
          }
      ]
  })
  ```


##### mock拦截请求

###### 定义get请求

```js
Mock.mock('/api/get/news','get',()=>{
    return {
        status: 200,
        message: '获取新闻列表数据成功'
    }
})
```

###### 定义post请求

```js
Mock.mock('/api/post/news','post',()=>{
    return {
        status: 200,
        message: '添加新闻列表数据成功'
    }
})
```

##### 实现新闻管理案例

###### 定义获取数据的接口

```js
const data = Mock.mock({
    'newsList|50-70': [
        {
            id: '@increment()',
            title: '@ctitle(10,15)',
            content: '@cparagraph(5,15)',
            img_url: '@image("100x100","#FFE4B5","#fff","暂无图片")',
            add_time: '@date(yyyy-MM-dd hh:mm:ss)'
        }
    ]
})

// 定义获取新闻列表的接口
Mock.mock('/api/get/news','get',() => {
    const {newsList} = data
    return {
        status: 200,
        message: '获取新闻列表成功',
        list: data,
        total: newsList.length
    }
})
```

###### 定义分页功能

```js
const data = Mock.mock({
    'newsList|50-70': [
        {
            id: '@increment()',
            title: '@ctitle(10,15)',
            content: '@cparagraph(5,15)',
            img_url: '@image("100x100","#FFE4B5","#fff","暂无图片")',
            add_time: '@date(yyyy-MM-dd hh:mm:ss)'
        }
    ]
})

// 获取参数
const getSearchUrl =  (url,name) => {
    const index = url.indexOf('?')
    if(index>-1){
        const searchStr = url.substr(index+1)
        const searchArr = searchStr.split('&')
        for(var i=0;i<searchArr.length;i++){
            const itemArr = searchArr[i].split('=')
            console.log(name,itemArr[0])
            if(name === itemArr[0]){
                return itemArr[1]
            }
        }
    }
}
// 定义获取新闻列表的接口
Mock.mock(/\/api\/get\/news/,'get',(options) => {
  // 获取页码
  const pageindex = getUrlQuery(options.url,'pageindex')
  // 获取每页条数
  const pagesize = getUrlQuery(options.url,'pagesize')
  // 数据总条数
  const total = data.list.length
  // 数据总页数
  const totalPage = Math.ceil(total/pagesize)
  // 截取的开始位置
  const start = (pageindex - 1)*pagesize
  // 截取的结束位置
  const end = pageindex*pagesize
  // 数据截取
  const list = pageindex<=totalPage?data.list.slice(start,end):[]
  return {
    status: 200,
    message: '获取新闻列表成功',
    list: list,
    total: total
  }
})
```

###### 实现添加的接口

```js
// 添加新闻
Mock.mock('/api/add/news','post',(options) => {
    const body = JSON.parse(options.body)
    const {newsList} = data
    newsList.unshift(Mock.mock({
        id: '@increment()',
        title: body.title,
        content: body.content,
        img_url: '@image("100x100","#FFE4B5","#fff","暂无图片")',
        add_time: '@date(yyyy-MM-dd hh:mm:ss)'
    }))
    return {
        status: 200,
        message: '添加成功',
        list: newsList
    }
})
```

###### 实现删除

```js
// 删除接口
Mock.mock('/api/delete/news','post',(options)=>{
    var body = JSON.parse(options.body)
    const {newsList} = data
    const index = newsList.findIndex(item=>{
        return item.id === body.id
    })
    newsList.splice(index,1)
    return {
        status: 200,
        message: '删除成功',
        list: newsList
    }
})
```

#### 接口文档

##### 获取数据

接口地址：/api/get/news

接口参数：

```js
pageindex: 页码
pagesize：每页的条数
```

请求类型：GET

返回的数据:

```js
{
  status: 200,
  message: '获取新闻列表成功',
  list: [
    {
      "id":1,
      "title":"办证先许严六统百几住",
      "content":"着要去石金热具采重林包好。金改电自线育适称平山现精利。每大例查满开制得命也之们实专提温。深出清气边得因选自分入温型干级。别需压五级转据道象也却必质程。员种最空的满六气量别住叫山。近起常需十种每铁由性我过府式家油支压。那米水出低料几老数布强命。",
      "img_url":"http://dummyimage.com/100x100/FFE4B5/fff&text=暂无图片",
      "add_time":"1984-04-03 11:43:37"}
  ],
  total: 50
}
```

##### 添加新闻

接口地址：/api/add/news

接口参数：

```js
title: 标题
content：内容
```

请求类型：POST

返回的数据:

```js
{
  status: 200,
  message: '添加成功',
  list: [
    {
      "id":1,
      "title":"办证先许严六统百几住",
      "content":"着要去石金热具采重林包好。金改电自线育适称平山现精利。每大例查满开制得命也之们实专提温。深出清气边得因选自分入温型干级。别需压五级转据道象也却必质程。员种最空的满六气量别住叫山。近起常需十种每铁由性我过府式家油支压。那米水出低料几老数布强命。",
      "img_url":"http://dummyimage.com/100x100/FFE4B5/fff&text=暂无图片",
      "add_time":"1984-04-03 11:43:37"}
  ],
  total: 50
}
```

##### 删除新闻

接口地址：/api/delete/news

接口参数：

```js
id: 新闻id
```

请求类型：POST

返回的数据:

```js
{
  status: 200,
  message: '删除成功',
  list: [
    {
      "id":1,
      "title":"办证先许严六统百几住",
      "content":"着要去石金热具采重林包好。金改电自线育适称平山现精利。每大例查满开制得命也之们实专提温。深出清气边得因选自分入温型干级。别需压五级转据道象也却必质程。员种最空的满六气量别住叫山。近起常需十种每铁由性我过府式家油支压。那米水出低料几老数布强命。",
      "img_url":"http://dummyimage.com/100x100/FFE4B5/fff&text=暂无图片",
      "add_time":"1984-04-03 11:43:37"}
  ],
  total: 50
}
```

##### 

​

​