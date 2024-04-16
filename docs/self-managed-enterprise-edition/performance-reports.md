---
title: Performance test reports
sidebar_position: 27
description: View test environment and resource configuration test scenarios and results.
---

# Performance test reports

Harness publishes performance test reports with each release. Select a report below to view test report details.

<details>

<summary>October 27, 2023</summary>

This document details information about following:

1. Test environment and resource configuration
2. Test scenario and results

#### Environment

* GKE (Kubernetes Version): 1.26.x

#### Database

* Mongo Atlas M60

#### Redis

* GCP Memory Store (5GB)

#### Harness services

Helm chart : https://github.com/harness/helm-charts/releases/tag/harness-0.9.2

**Override file:**

https://github.com/harness/helm-charts/blob/main/src/harness/override-perf-ci-cd-ff.yaml

**Manager config:**

update `LOG_STREAMING_SERVICE_EXTERNAL_URL` = `<smp host url>`/log-service/

#### Test scenarios

**> 1500 concurrent CI executions INLINE**

Each CI pipeline would:

* initialize a k8s pod and git clone repo
* run 5 parallel steps (70 sec sleep)
* run template with 2 parallel steps (140sec sleep)

Projects: 1 Pipelines: 1500 Stages per pipeline: 1 Delegates: 10 (1cpu/2gi)

Result : **PASS** Total Execution Time: **6min**

**> 1500 concurrent CI executions GitX**

Each CI pipeline would:

* initialize a k8s pod and git clone repo
* run 5 parallel steps (140 sec sleep) and echo statements

Projects: 1 Pipelines: 1500 Stages per pipeline: 1 Delegates: 10 (1cpu/2gi)

Result: **PASS** Total Execution Time: **5min**

**> 500 concurrent CD executions INLINE**

Each CD pipeline would:

* fetch docker artifact from AWS ECR repo
* run the following steps in order:
  * Canary deploy
  * Canary delete
  * Rolling deploy
  * K8s Delete

Projects: 1 Pipelines: 500 Stages per pipeline: 1 Delegates: 18 (1cpu/4gi)

Result: **PASS** Total Execution Time: **4.5min**

</details>

<details>

<summary>October 6, 2023</summary>

This document details information about following:

1. Test environment and resource configuration
2. Test scenario and results

#### Environment

* GKE (Kubernetes Version) : 1.26.x

#### Database

* Mongo Atlas M60

#### Redis

* GCP Memory Store (5GB)

#### Harness services

Helm chart : https://github.com/harness/helm-charts/releases/tag/harness-0.8.2

**Override file:**

https://github.com/harness/helm-charts/blob/main/src/harness/override-perf-ci-cd-ff.yaml

#### Test scenarios

**> 1500 concurrent CI executions INLINE**

Each CI pipeline would:

* initialize a k8s pod and git clone repo
* run 4 parallel steps (70 sec sleep)
* run template with 2 parallel steps (140sec sleep)

Projects: 1 Pipelines: 1500 Stages per pipeline: 1 Delegates: 10 (1cpu/2gi)

Result: **PASS** Total Execution Time: **6min**

**> 1500 concurrent CI executions GitX**

Each CI pipeline would

* initialize a k8s pod and git clone repo
* run 5 parallel steps (140 sec sleep) and echo statements

Projects: 1 Pipelines: 1500 Stages per pipeline: 1 Delegates: 10 (1cpu/2gi)

Result: **PASS** Total Execution Time: **4.2min**

**> 500 concurrent CD executions INLINE**

Each CD pipeline would:

* fetch docker artifact from AWS ECR repo
* run the following steps in order:
  * Canary deploy
  * Canary delete
  * Rolling deploy
  * K8s Delete

Projects : 1 Pipelines : 500 Stages per pipeline : 1 Delegates : 18 (1cpu/4gi)

Result : **PASS** Total Execution Time: **4.2min**

</details>
