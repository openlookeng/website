+++
title = "openLooKeng Invites You to Register Your Profile"
date = "2020-12-08"
tags = ["Community", "Metrics"]
archives = "2020-12"
author = "Fred Li"
description = "In order to do the statistics on contribution of each contributor's company/school/organization, the Infrastructure team has developed a function that requires each contributor to fill in their company information. This blog is to guide contributors on how to fill in personal organizational information."
+++

### Introduction

Firstly, all the contributors' contribution to openLooKeng community is appreciated.

In order to do the statistics on contribution of each contributor's company/school/organization, the Infrastructure team has developed a function that requires each contributor to fill in their company information. 

This blog is to guide contributors on how to fill in personal organizational information.

### Steps

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

### Data Structure

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

gitee_id(Mandatory): The gitee's login account name, such as zhongjun2 in https://gitee.com/zhongjun2

github_id(Optional): Github login account name

company_name(Mandatory): Company name, if left blank, it will be listed as an independent organization (independent)

organization_name(Optional): The name of the organization under the company

end_date(Optional): The end time of this company. If left blank,it means now. Format: YYYY-MM-DD

user_name(Optional): The name displayed on the statistical board. If left blank,it will use gitee user name. github_id, gitee_id, etc. are displayed as user_name

emails(Optional): Email information used, such as emails that have subscribed to maillist, emails that registered gitee, emails that registered github

If you are in different comanies in different time, you can
```
companies:
  - company_name: CompanyA
    organization_name: 
    end_date: '2020-10-31'
  - company_name: CompanyB
    organization_name: 
    end_date: '2099-12-31'
```

If necessary, please visit <https://gitee.com/openlookeng/community/blob/master/om-data/readme.md> for more information.

### Questions or Suggestions?

Please send email to <dev@openlookeng.io>. Remember to subscribe dev@openlookeng.io in <https://openlookeng.io/communication.html> if you have not.

Or you can create issues in <https://gitee.com/openlookeng/community/issues>.
