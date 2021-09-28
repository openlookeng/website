+++
title = "Security"
description = "openLooKeng is a high-performance distributed data virtualization query engine that supports joint query from heterogeneous data sources in different domains. It is applicable to interactive queries from TB or PB of data and must meet security requirements in various scenarios. "
+++

openLooKeng is a high-performance distributed data virtualization query engine that supports joint query from heterogeneous data sources in different domains. It is applicable to interactive queries from TB or PB of data and must meet security requirements in various scenarios. As a high-performance big data in-memory computing engine, openLooKeng can run on different CPU platforms. Users can run standard SQL query statements to obtain query results. As data is the core asset, it is essential for perform continuous security protection of the big data system.

Join us to build a more secure big data in-memory computing engine.

### Reporting Security Issues to the openLooKeng Community

Use the [Suspected Security Issue Reporting Template](https://gitee.com/openlookeng/community/blob/master/security/report-template_en.md) to report the potential security issue so that the vulnerability management team (VMT) can identify and fix the issue as soon as possible. Your email will be acknowledged within one working day and replied with more details and subsequent handling measures within seven days. It is highly recommended to use [PGP public key](https://download.openlookeng.io/security/openlookeng_security_pub.asc) to encrypt your email, because security issues are sensitive information.

- Please send your email to securities@openlookeng.io.  

#### Reporting Channel
To quickly identify and verify suspected vulnerabilities, the reporting e-mail should include but is not limited to the following content:
- Basic information: including the modules affected by the vulnerability, triggering conditions of the vulnerability, and impact on the system after the vulnerability is exploited.
- Technical details: including system configuration, fault locating method, description of exploit, POC, and method and procedure of fault reproduction.
- Suggestions on resolving the vulnerability.
- Organization and contact information of the vulnerability reporter.
- Reporter's possible plan for vulnerability disclosure.


#### Vulnerability Assessment
The Common Vulnerability Scoring System (CYSS) is widely used in the industry to assess vulnerability severity. Currently openLooKeng is using CVSS v3 to assess vulnerabilities, and such assessment focuses on the impact caused by the vulnerability in a preset attack scenario. The vulnerability severity assessment covers factors such as the exploit difficulty, and the impact of vulnerability exploit on the confidentiality, integrity, and availability of the product. A score will be given after these factors are assessed.

#### Assessment Criteria
The CVSS v3 adopted by the openLooKeng community assesses the impact of a vulnerability based on the following variables:
- Attack vector (AV): indicating the remoteness of an attack and how to exploit this vulnerability.
- Attack complexity (AC): describing the difficulty in executing an attack and the conditions for a successful attack.
- User interaction (UI): determining whether the attack requires users' participation.
- Permission required (PR): recording the level of user authorization required for a successful attack.
- Scope (S): determining whether an attack can affect components of different permission levels.
- Confidentiality (C): measuring the impact of unauthorized information disclosure.
- Integrity (I): measuring the impact of information tampering.
- Availability (A): measuring the impact on data access or services for users affected by the vulnerability.

#### Assessment Principles
- The severity of a vulnerability is assessed, not the risk of the vulnerability.
- The assessment must be based on an attack scenario where the system confidentiality, integrity, and availability are affected by a successful attack.
- When a security vulnerability has multiple attack scenarios, the attack scenario with the highest CVSS score (that is, with the greatest impact) shall prevail in the assessment.
- When a library that is embedded or invoked has vulnerabilities, the assessment on its vulnerability severity should be based on an attack scenario, which is determined by the usage of the library in the product.
- When a security defect does not trigger or affect the confidentiality/integrity/availability (CIA), the CVSS score is 0.

### Assessment Procedure
Perform this procedure to assess a vulnerability:
- Set a possible attack scenario and score based on this attack scenario.
- Identify vulnerable components and affected components.
- Select the value of the basic assessment indicator, and perform the vulnerability impact assessment based on the exploitable indicators (attack vector, attack complexity, permission required, user interaction, and scope) and affected indicators (confidentiality, integrity, and availability).

### Severity Rating
| Severity Rating | Score |
| :-------------------------- | :---------------- |
| Critical            | 9.0 - 10.0        |
| High                 | 7.0 - 8.9         |
| Medium                | 4.0 - 6.9         |
| Low                   | 0.1 - 3.9         |
| None                  | 0.0               |

### Security Issue Disclosure Process in the openLooKeng Community

The security issues are handled as follows:

- After receiving the security issue reported, the Security Committee (SC) immediately confirms the issue severity and integrity of the information reported.
- Organize community teams to conduct technical analysis, identify the issue details, and provide analysis reports.
- If the reported issue is a vulnerability, apply for Common Vulnerabilities and Exposures (CVE), communicate with vulnerability reporter about the issue and the subsequent fixing and release plan, and prepare the security advisory (SA).
- Develop and verify the patch to fix the vulnerability, and initiate restricted disclosure.
- Release the patch and SA.

### Security Committee (SC)

The SC consists of vulnerability management experts in the community. The team is responsible for coordinating the entire vulnerability fixing process, including:

- Vulnerability collection: Potential security vulnerabilities discovered by community members and external researchers can be reported to the VMT via securities@openlookeng.io.
- Vulnerability tracking and handling: The VMT confirms vulnerabilities, records the confirmed vulnerabilities in the openLooKeng community, fixes the vulnerabilities, and keeps communication with the reporter during the process.
- Responsible disclosure: After the vulnerability is fixed, the VMT releases the vulnerability information to the community in the form of SA.
- Organize activities such as project security architecture design, audit and code security review.
- Provide advice for technical decision-making on community projects.

### Meeting Organization
- Meeting time: Monday morning every two weeks, 11:00 to 12:00, Beijing time 
  - JOin us: Community will publish a meeting notice one day in advance. You can subscribe to the openLooKeng community email and join the openLooKeng community to get the notice.
- Routine topics for SC meetings include:
  - Community vulnerability handling progress tracking
  - Track the progress of community security tools
  - Other community security topics, such as security guides and vulnerability reward programs. 
    
### SC members
- michael.li1@huawei.com [@mike-ch-li]
- raghunandan.subramanya@huawei.com [@sraghunandan]
- zhangwei09@huawei.com [@kingbigcat]
- yujiwen@huawei.com [@jiwenyu0531]
- tushengxia1@huawei.com [@tushengxia]

### openLooKeng SA



