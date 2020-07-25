+++
title = "如何发表博客"

+++


### 准备

1. 参考 <http://git.mydoc.io/?t=179267> 注册Gitee账号。

1. 在Gitee个人设置中设置主邮箱地址，在此<https://gitee.com/profile/emails>。

1. 签署贡献者协议，<https://openlookeng.io/zh-cn/signcla.html>。

1. 参考<http://git.mydoc.io/?t=180692>准备你的git环境。

### 理解博客格式

openLooKeng是用markdown格式写博客的。

请阅读该文章<https://gitee.com/openlookeng/website/tree/master/docs/blog_design.md>来理解openLooKeng博客是如何设计的。

文件头需要包含如下信息：
```
+++
title = "Sample Post"
date = "2020-03-03"
tags = ["Sample", "ABC", "cccc"]
archives = "2020-03"
author = "openLooKeng Blog Author"
description = "Just about everything you'll need to style in the theme: headings, paragraphs, blockquotes, tables, code blocks, and more."
+++

Here you can edit your blog. 
```

小提示：你可以复制 docs/blog_example/2020-03-03-sample-post.md 到你的工作路径下然后继续编辑。

### 提交博客

博客的提交利用了[Gitee](https://gitee.com)的PR(Pull Request)。

1. Fork openLooKeng 博客项目 <https://gitee.com/openlookeng/website> 到你自己的Gitee上。如果需要具体指导请参考 <http://git.mydoc.io/?t=153749> 。

2. Clone代码

```
git clone https://gitee.com/<your-gitee-id>/website
```

3. 创建分支

```
git checkout -b <branch-name>
```

4. 创建工作路径

If you are going to post a blog in English, the content/en-us/blog is your work path. 

如果你发表中文博客，工作路径是 content/zh-cn/blog 。

假设你要写一个英文博客：

```
cd content/en-us/post
mkdir <your-gitee-id>
cd <your-gitee-id>
touch YEAR-MONTH-DAY-title.md
```

你可以可以以你的md文档名来命名你的资源文件，方便使用。例如： 

```
YEAR-MONTH-DAY-title-NN.MARKUP
```


其中，YEAR, MONTH, DAY, 和 title 和你的博客md文件名一致。NN 是01、02、03这样的序号。MARKUP文件扩展名。如下例子：

```
2020-01-01-new-years-is-coming.md
2020-01-01-new-years-is-coming-01.png
2020-01-01-new-years-is-coming-02.gif
2020-01-01-new-years-is-coming-03.pdf
```
使用HTML `<img>` 标签嵌入图片， 输入图片名称作为 `src` 值：

```
<img src = "2020-01-01-new-years-is-coming-01.png">
```

5. commit你的博客

```
git add <file-path>
git commit -m "<message>"
git push origin <branch-name>:<branch-name>
```

6. 参考 <http://git.mydoc.io/?t=153749> 提交PR

7. 等待评审和合入。
