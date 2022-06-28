---
title: Terraform Remote State with AWS S3 and DynamoDB
description: >-
    Using a remote Terraform state file with AWS using S3 and DynamoDB.
summary: >-
    No-nonsense example of using a remote Terraform state file with locking
    using AWS S3 and DynamoDB.
anchor: Remote Terraform State File with Locking using AWS
uri: terraform-remote-state-aws-s3-dynamodb
heading: Remote Terraform State File (with Locking) Using AWS S3 and DynamoDB
# image:
#     src: images/blog/puppet-pi.png
#     caption: puppet 7 raspberry pi
tags: [terraform, aws]
date: "2022-03-17"
jsonld:
    headline: "Remote Terraform state file with locking using AWS S3 and DynamoDB"
    datePublished: "2022-03-17"
    dateCreated: "2022-03-17"
    dateModified: "2022-03-17"
---

Using a remote backend to manage the Terraform state file provides a few 
advantages, primarily:

- State file versioning
- Removing sensitive data and state file merges in VCS
- Consistency checking
- Locking to prevent simultaneous resource creation

## S3 Bucket and DynamoDB Resources

```hcl
# resources.tf

# Create the S3 bucket
resource "aws_s3_bucket" "tf_state" {
  bucket = "tf-state-bucket-name"

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Name = "Terraform Remote State"
  }
}

# Enable bucket versioning
resource "aws_s3_bucket_versioning" "tf_state_versioning" {
  bucket = aws_s3_bucket.tf_state.id

  versioning_configuration {
    status = "Enabled"
  }
}

# Enable bucket server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "tf_state_sse" {
  bucket = aws_s3_bucket.tf_state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Create the DyanmoDB table
resource "aws_dynamodb_table" "tf_state_lock" {
  name           = "TerraformStateLock"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name = "dynamodb-tf-state-lock"
  }
}
```

Create the resources with `terraform plan` and `terraform apply`.

## S3 Backend

Add the S3 backend to the `terraform` configuration block:

```hcl
# terraform.tf
terraform {
  required_version = "~> 1.1.0"

  backend "s3" {
    bucket         = "tf-state-bucket-name"
    key            = "production/terraform.tfstate"
    encrypt        = "true"
    region         = "eu-west-2"
    dynamodb_table = "TerraformStateLock"
  }

  # ...
}
```

Run `terraform init` to re-initialise the backend and copy any existing state 
to S3. See [S3 Backend](https://www.terraform.io/language/settings/backends/s3)
for more information.
