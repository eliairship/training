# Course Summary

## Title: Introduction to AWS IAM – Identity, Access, and Auditing for Cloud Practitioners

## Target Audience

- Primary: Software Engineers, DevOps Engineers
- Secondary: QA Engineers, Anyone new to AWS and responsible for identity & access

---

## Classification

## Workshop (Includes practical demos, guided console walkthroughs, and security-focused case discussions)

## Time Requirement

Duration: 1.5 Hours

### Breakdown:

- 15 min: IAM Core Concepts – Users, Groups, Roles, and Policies
- 30 min: Hands-On – Creating Users, Groups, and Roles
- 15 min: IAM Policy Structure and Permissions Strategy
- 15 min: Password Policies, Identity Center (SSO), and Audit Tools
- 15 min: Q&A, Recap, and Certification Readiness Quiz

---

### Complexity

### Minimum Seniority Required:

- Trainee Level
- No prior AWS experience required, though basic cloud familiarity helps

---

## Trainer Requirements:

- Strong grasp of AWS IAM, Identity Center, and basic security practices
- Experience delivering AWS foundational or certification training
- Ability to map IAM concepts to real-world security and audit needs

---

## Expected Outcomes

By the end of this course, participants will:

- Understand the purpose and structure of IAM in AWS
- Create and manage users, groups, roles, and policies
- Apply IAM best practices for least privilege and secure access
- Explore Identity Center (SSO) for scalable user management
- Use AWS audit tools like IAM Access Analyzer and CloudTrail to monitor activity
- Be prepared to answer IAM-related questions on the AWS Cloud Practitioner exam

---

## What Do We Want to Get Out of the Course?

- Build strong identity and access foundations for AWS learners
- Equip teams with the ability to apply secure, scalable access strategies
- Provide exam-ready coverage of IAM, Identity Center, and related tooling
- Help learners understand how IAM connects to security, cost in AWS

---

## Course Content

### IAM Core Concepts – Users, Groups, Roles, and Policies

- **Users** - Represents a person or service that interacts with AWS.

  - Features:

    - Has long-term credentials: username, password (for console) or access keys (for API/CLI).
    - Each user can be assigned permissions directly or through groups.

  - Use case
    - Individual human access or long-lived applications.

- **Groups** – Logical collection of users (e.g. Admins, Developers)

  - Features:
    - Permissions assigned to a group apply to all its users.
    - Helps manage access at scale.
    - Use case
      - Assign policies like "Developers", "Admins", "Support" to relevant users easily.

- **Policies** – Identities assumed temporarily by services, users, or accounts

  - Features:
    - JSON documents defining what actions are allowed or denied
    - Managed Policies:
      - AWS-managed (predefined, like AmazonS3ReadOnlyAccess)
      - Customer-managed (you create and maintain)
    - Inline Policies:
      - Embedded directly into a user, group, or role.
  - Structure:

    - Includes Effect (Allow/Deny), Action (e.g., s3:GetObject), Resource (ARN).

  - Use case

    - Fine-grained access control.

  - Inline vs managed policies

  Feature
  Inline Policy

| Feature          | Inline Policy                                     | Managed Policy                              |
| ---------------- | ------------------------------------------------- | ------------------------------------------- |
| Attached To      | One specific IAM user, group, or role             | Reusable: attached to multiple identities   |
| Tightly Coupled? | Yes — deleted when the user/role/group is deleted | No — separate object, managed independently |
| Reusable?        | No — one-to-one relationship                      | Yes — can be attached to many users/roles   |
| Who Manages It?  | You (customer)                                    | You (Customer-Managed) or AWS (AWS-Managed) |
| Best For         | Fine-tuned, one-off permissions                   | Reusable and consistent access control      |
| Visibility       | Harder to audit across users                      | Easier to manage, audit, and apply at scale |

- **Roles** – An IAM identity you can assume to gain temporary permissions.
  - Features
    - Unlike Users, Roles don’t have permanent credentials.
  - Use cases
    - AWS services accessing other services (e.g., Lambda accessing S3).
    - Cross-account access.
    - Federated access (e.g., corporate login using SSO).

**Exercise:**

- Create a user and assign it to a group
- Attach a managed policy to the group
- Assume a role using the console

---

### Hands-On – IAM Walkthrough

- Creating custom inline and managed policies
- Viewing and editing permissions
- IAM Policy Simulator

**Exercise:**

- Create a policy that grants S3:ListBucket to a user
- Use the Policy Simulator to verify access
  - [Policy Simulator](https://policysim.aws.amazon.com/)
- Restrict access to a specific S3 bucket

---

### IAM Policy Language & Permissions Strategy

- Anatomy of a Policy:

```json
{
  "Effect": "Allow",
  "Action": "s3:ListBucket",
  "Resource": "arn:aws:s3:::example-bucket"
}
```

- Wildcards, conditions, and least privilege
- Differences between identity-based and resource-based policies
- Choosing between inline vs managed policies

**Exercise:**

- Write and attach a policy that grants EC2 instance start/stop only in us-east-1
- Use conditions to enforce MFA

---

### Password Policy, Identity Center (SSO), and Audit Tools

- **Password Policy** - Set of rules to enforce secure password practices for IAM users.

  - Configurable
    - Minimum password length.
    - Require symbols, numbers, uppercase/lowercase.
    - Password expiration and reuse prevention.
  - Strengthen user authentication security.

- **Identity Center** - Central place to manage SSO access to AWS accounts and applications.

  - Integrates with corporate directories (like Active Directory).
  - Manages user access without creating IAM users.
  - Supports role-based access across multiple AWS accounts.
  - Centralized access for organizations with many users/accounts.

- **Access Analyzer**

  - Identifies resources shared with external entities.
  - Detects unintended access to help meet security and compliance.

- **CloudTrail**

  - Records all IAM-related activity like logins, policy changes, role assumptions.
  - Useful for auditing, troubleshooting, and compliance.

- **Credential Report**

  - CSV report listing all IAM users and the status of their credentials (e.g., access keys, password age).

- **Access Advisor**
  - Shows which services IAM roles or users have recently accessed.
  - Helps clean up unused permissions

**Exercise:**

- Configure a strong password policy
- Generate and review a Credential Report
- Use IAM Access Analyzer to check for public access to S3

**Additional Notes and Tips**

- Root user: Full access. Should be protected with MFA and used only when absolutely necessary.
- Least privilege principle: Always grant the minimum permissions necessary.
- Temporary credentials: Roles (not users) are used for this.
- IAM is Global: No region-specific setup needed.

---

## Assessment Requirements

**Practical Task:**

- Configure a user, group, and role with appropriate access
- Apply a password policy and generate a credential report

**Knowledge Check:**

- Quiz with multiple-choice and scenario questions on IAM principles

**Hands-on Review:**

- Review each participant’s IAM setup and discuss permissions strategy
