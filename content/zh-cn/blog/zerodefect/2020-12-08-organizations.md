+++
title = "openLooKeng喊您登记您的组织信息喽"
date = "2020-12-08"
tags = ["社区", "度量"]
archives = "2020-12"
author = "Fred Li"
description = "为了了解各位贡献者所在的公司/学校/组织的整体贡献情况，Infrastructure小组开发了一个度量功能，需要各位贡献者填写自己所在的公司信息。本文是指导贡献者如何填写个人的组织信息。"
+++

### 简介

首先感谢贡献者在openLooKeng社区做成贡献。

为了了解各位贡献者所在的公司/学校/组织的整体贡献情况，Infrastructure小组开发了一个度量功能，需要各位贡献者填写自己所在的公司信息。

本文是指导贡献者如何填写个人的组织信息。

### 操作步骤

1. Fork https://gitee.com/openlookeng/community to your Gitee.

2. on your local PC

```
git clone https://gitee.com/YOUR_ID/community.openlookeng

cd YOUR_FOLDER

git checkout -b NEW_BRANCH_NAME

vi ./om-data/data.yaml

Search your Gitee ID and then edit your profile. Then save it and quit.

git add. 

git commit

git push --set-upstream orgin NEW_BRANCH_NAME
```

3. Creat a PR on your Gitee.

4. Wait for PR reviewed and merged.

### 数据结构介绍

```
gitee_id: gitee login id
github_id: generalfuzz
companies:
  - company_name: Huawei
    organization_name: openlookeng
    end_date: '2015-10-31'
user_name: test
emails:
  - generalftes@gmail.com
  - g.reseasdtes@gmail.com
```

gitee_id(必选)：gitee的login账号名，比如https://gitee.com/zhongjun2 中的zhongjun2

github_id(可选)：github的login账号名

company_name(必选): 公司名称,如果不填将会被列入独立组织(independent)

organization_name(可选): 公司下面的组织名称

end_date(可选)：在这个公司的结束时间，如果不填表示当前一直在该公司，格式：YYYY-MM-DD

user_name(可选): 显示在统计看板上面的名称，如果不填展示gitee账号的名称，github_id、gitee_id等统一对外显示成user_name

emails(可选): 使用的email信息，比如订阅过maillist的email，注册gitee的email，注册github的email

场景，如果您分时段在不同的公司，则这样填写companies
```
companies:
  - company_name: CompanyA
    organization_name: 
    end_date: '2020-10-31'
  - company_name: CompanyB
    organization_name: 
    end_date: '2099-12-31'
```

如果需要，可以访问<https://gitee.com/openlookeng/community/blob/master/om-data/readme_cn.md>获取更详细的信息。

### 有疑问或者建议？

请在<https://openlookeng.io/communication.html>注册dev@openlookeng.io邮件列表，然后发邮件给<dev@openlookeng.io>，发表您的意见或者建议。

也可以在<https://gitee.com/openlookeng/community/issues>创建Issue。
