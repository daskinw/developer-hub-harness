---
title: Wiz scanner reference for STO
sidebar_label: Wiz scanner reference
sidebar_position: 415
description: Scan code repositories and container images with Wiz scanner.
---

# Wiz scanner reference for STO

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

import StoDinDNoIntro from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step-setup.md';

You can include [Wiz](https://www.wiz.io/) vulnerability scans in your Harness pipelines. Wiz is a cloud security platform that scans IaC templates, container images, and directories/repositories before deployment. Wiz can detect security misconfigurations, vulnerabilities, and exposed secrets.

Harness currently supports the following:

1. Orchestrated Wiz scans for container images
2. Ingestion of Wiz scan reports (JSON/SARIF format) generated for container images and repositories

### Important notes for running Wiz scans in STO

* This integration is behind the feature flag `STO_STEP_PALETTE_WIZ`. Contact [Harness Support](mailto:support@harness.io) to enable it.
* Harness STO can ingest both JSON and SARIF data from Wiz, but Harness recommends publishing to JSON because this format includes more detailed information.
* You can set up your STO scan images and pipelines to run scans as non-root and establish trust for your own proxies using custom certificates. For more information, go to [Configure STO to Download Images from a Private Registry](../use-sto/set-up-sto-pipelines/download-images-from-private-registry/).

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/\_more-information.md';

### Set-up workflows

<details>

<summary>Orchestration scans for container images</summary>

The setup process for Kubernetes and Docker build infrastructures has a few additional steps and requirements.

```
<br/>
```

**Prerequisites**

```
- A [Kubernetes](#/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure/) or [Docker](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure) build infrastructure

- [Harness text secrets](/docs/platform/secrets/add-use-text-secrets) if your image registry requires an access ID and access token

- [Harness text secrets](/docs/platform/secrets/add-use-text-secrets) for your `client-id` and `client-secret` shared by Wiz 

<br/>
```

**Add a Docker-in-Docker background step**

This is required for orchestrated image scans on Kubernetes or Docker build infrastructures.

```
<StoDinDNoIntro />

<br/>
```

**Add the Wiz scanner**

```
Do the following:

1. Add a CI Build or Security Tests stage to your pipeline.
2. Add a Wiz step to the stage.
```

\


**Set up the Wiz scanner**

**Required settings**

```
	1. Scan mode = [Orchestration](#scan-mode)
	2. Target and Variant Detection = [Auto](#detect-target-and-variant)
	3. Container image: 
		1. [Type](#type-1)
		2. [Domain](#domain) — Required only if you're using a registry with a non-standard domain, such as a private registry 
		3. [Name](#name) — for example, `jsmith/myimage`
		4. [Tag](#name) — for example, `latest`
		5. Authentication — Required only if the registry requires authentication:
			1. [Registry access Id](#access-id) as a Harness secret
			2. [Registry access token](#access-token) as a Harness secret. 
	8. Authentication:
		1. [Wiz access ID](#access-id-1) as a Harness secret. This is your `client-id` shared by Wiz.
		2. [Wiz access token](#access-token) as a Harness secret. This is your `client-secret` shared by Wiz.
```

**Optional settings**

* [Fail on Severity](wiz-scanner-reference.md#fail-on-severity) — Stop the pipeline if the scan detects any issues at a specified severity or higher
* [Log Level](wiz-scanner-reference.md#log-level) — Useful for debugging

\


**Prerequisites**

```
- [Harness text secrets](/docs/platform/secrets/add-use-text-secrets) if your image registry requires an access Id and access token

- [Harness text secrets](/docs/platform/secrets/add-use-text-secrets) for your `client-id` and `client-secret` shared by Wiz

<br/>
```

**Add the Wiz scanner**

```
Do the following:

1. Add a CI Build or Security Tests stage to your pipeline.
2. Add a Wiz step to the stage.

<br/>
```

**Set up the Wiz scanner**

**Required settings**

```
	1. Scan mode = [Orchestration](#scan-mode)
	2. Target and Variant Detection = [Auto](#detect-target-and-variant)
	3. Container image: 
		1. [Type](#type-1)
		2. [Domain](#domain) — Required only if you're using a registry with a non-standard domain, such as a private registry 
		3. [Name](#name) — for example, `jsmith/myimage`
		4. [Tag](#name) — for example, `latest`
		5. Authentication — Required only if the registry requires authentication:
			1. [Registry access Id](#access-id) as a Harness secret. 
			2. [Registry access token](#access-token) as a Harness secret. 
	8. Authentication:
		1. [Wiz access ID](#access-id-1) as a Harness secret. This is your `client-id` shared by Wiz.
		2. [Wiz access token](#access-token) as a Harness secret. This is your `client-secret` shared by Wiz.
```

**Optional settings**

* [Fail on Severity](wiz-scanner-reference.md#fail-on-severity) — Stop the pipeline if the scan detects any issues at a specified severity or higher
* [Log Level](wiz-scanner-reference.md#log-level) — Useful for debugging

</details>

<details>

<summary>Ingestion scans for container images</summary>

:::note

Harness STO can ingest both JSON and SARIF data from Wiz, but Harness recommends publishing to JSON because this format includes more detailed information.

:::

**Add a shared path for your scan results**

```
1. Add a CI Build or Security Tests stage to your pipeline.
2. In the stage **Overview**, add a shared path such as `/shared/scan_results`.
```

**Copy scan results to the shared path**

There are two primary workflows to do this:

* Add a Run step that runs a Wiz scan from the command line and then copies the results to the shared path.
* Copy results from a Wiz scan that ran outside the pipeline.

For more information and examples, go to [Ingestion scans](../use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline/).

**Set up the Wiz scanner**

Add a Wiz step to the stage and set it up as follows.

**Required settings**

```
1. Scan mode = [Ingestion](#scan-mode)
<!-- 2. [Target type](#type) = `Container Image` -->
2. [Target name](#name) — Usually the image name, such as `jsmith/myimage`
2. [Target variant](#name) — Usually the image tag, such as `latest`. 
   You can also use a [runtime input](/docs/platform/variables-and-expressions/runtime-input-usage) and specify the tag at runtime.
3. [Ingestion file](#ingestion-file) — For example, `/shared/scan_results/wiz-scan.json`
```

**Optional settings**

* [Fail on Severity](wiz-scanner-reference.md#fail-on-severity) — Stop the pipeline if the scan detects any issues at a specified severity or higher
* [Log Level](wiz-scanner-reference.md#log-level) — Useful for debugging

</details>

<details>

<summary>Ingestion scans for code repositories</summary>

:::note

Harness STO can ingest both JSON and SARIF data from Wiz, but Harness recommends publishing to JSON because this format includes more detailed information.

:::

**Add a shared path for your scan results**

```
1. Add a CI Build or Security Tests stage to your pipeline.
2. In the stage **Overview**, add a shared path such as `/shared/scan_results`.
```

**Copy scan results to the shared path**

There are two primary workflows to do this:

* Add a Run step that runs a Wiz scan from the command line and then copies the results to the shared path.
* Copy results from a Wiz scan that ran outside the pipeline.

For more information and examples, go to [Ingestion scans](../use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline/).

**Set up the Wiz scanner**

Add a Wiz step to the stage and set it up as follows.

**Required settings**

```
1. Scan mode = [Ingestion](#scan-mode)
<!-- 2. [Target type](#type) = `Code Repository` -->
2. [Target name](#name) — Usually the repo name
2. [Target variant](#name) — Usually the scanned branch. You can also use a [runtime input](/docs/platform/variables-and-expressions/runtime-input-usage) and specify the branch at runtime.
3. [Ingestion file](#ingestion-file) — For example, `/shared/scan_results/wiz-scan.json`
```

**Set the target type in the YAML editor**

:::note

Currently the Wiz UI does not support setting the target type to **Code Repository**. This will be available shortly. For now, you can set the target type in the YAML editor.

:::

1. Select **YAML** (top).
2.  Change the `target : type` from `container` to `repository` as follows:

    ```yaml
     - step:
     	type: Wiz
     	name: wiz_ingestion
     	identifier: wiz_ingestion
     	spec:
     	  mode: ingestion
     	  config: default
     	  target:
     		type: repository # <----------------
     		detection: manual
     		name: wiz-repo
     		variant: main
    ```

```
3. Save the pipeline and select **Visual**. 
```

**Optional settings**

* [Fail on Severity](wiz-scanner-reference.md#fail-on-severity) — Stop the pipeline if the scan detects any issues at a specified severity or higher
* [Log Level](wiz-scanner-reference.md#log-level) — Useful for debugging

</details>

### Wiz step settings reference

The recommended workflow is add a Wiz step to a Security Tests or CI Build stage and then configure it as described below.

#### Scan

**Scan Mode**

import StoSettingScanModeOrch from './shared/step\_palette/scan/mode/\_orchestration.md'; import StoSettingScanModeIngest from './shared/step\_palette/scan/mode/\_ingestion.md';

**Scan Configuration**

import StoSettingProductConfigName from './shared/step\_palette/scan/\_config-name.md';

#### Target

**Type**

import StoSettingScanTypeRepo from './shared/step\_palette/target/type/\_repo.md'; import StoSettingScanTypeCont from './shared/step\_palette/target/type/\_image.md';

**Detect target and variant**

import StoSettingScanTypeAutodetectContainer from './shared/step\_palette/target/auto-detect/\_container-image.md'; import StoSettingScanTypeAutodetectNote from './shared/step\_palette/target/auto-detect/\_note.md';

**Name**

import StoSettingTargetName from './shared/step\_palette/target/\_name.md';

**Variant**

import StoSettingTargetVariant from './shared/step\_palette/target/\_variant.md';

**Workspace**

import StoSettingTargetWorkspace from './shared/step\_palette/target/\_workspace.md';

#### Container image

**Type**

import StoSettingImageType from './shared/step\_palette/image/\_type.md';

**Domain**

import StoSettingImageDomain from './shared/step\_palette/image/\_domain.md';

**Name**

import StoSettingImageName from './shared/step\_palette/image/\_name.md';

**Tag**

import StoSettingImageTag from './shared/step\_palette/image/\_tag.md';

**Access ID**

import StoSettingImageAccessID from './shared/step\_palette/image/\_access-id.md';

**Access Token**

import StoSettingImageAccessToken from './shared/step\_palette/image/\_access-token.md';

#### Ingestion File

:::note Harness STO can ingest both JSON and SARIF data from Wiz, but Harness recommends publishing to JSON because this format includes more detailed information. :::

The path to your scan results when running an [Ingestion scan](../use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline/), for example `/shared/scan_results/wiz.latest.json`.

* The data file must be in a [supported format](security-step-settings-reference/#supported-ingestion-formats) for the scanner.
*   The data file must be accessible to the scan step. It's good practice to save your results files to a [shared path](../../continuous-integration/get-started/key-concepts/#stages) in your stage. In the visual editor, go to the stage where you're running the scan. Then go to **Overview** > **Shared Paths**. You can also add the path to the YAML stage definition like this:

    ```yaml
        - stage:
          spec:
            sharedPaths:
              - /shared/scan_results
    ```

#### Authentication

**Access ID**

This is your `client-id` shared by Wiz.

**Access Token**

This is your `client-secret` shared by Wiz.

You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("project.my-access-token")>`. For more information, go to [Add and Reference Text Secrets](../../platform/secrets/add-use-text-secrets/).

#### Log Level

import StoSettingLogLevel from './shared/step\_palette/all/\_log-level.md';

#### Additional CLI flags

import StoSettingCliFlags from './shared/step\_palette/all/\_cli-flags.md';

:::caution

Passing CLI flags is an advanced feature. Some flags might not work in the context of STO. You should test your flags and arguments thoroughly before you use them in your production environment.

:::

#### Fail on Severity

import StoSettingFailOnSeverity from './shared/step\_palette/all/\_fail-on-severity.md';

#### Settings

You can add more settings to the scan step as needed.

#### Additional Configuration

In the **Additional Configuration** settings, you can use the following options:

* [Privileged](../../continuous-integration/use-ci/manage-dependencies/background-step-settings/#privileged)
* [Image Pull Policy](../../continuous-integration/use-ci/manage-dependencies/background-step-settings/#image-pull-policy)
* [Run as User](../../continuous-integration/use-ci/manage-dependencies/background-step-settings/#run-as-user)
* [Set Container Resources](../../continuous-integration/use-ci/manage-dependencies/background-step-settings/#set-container-resources)

#### Advanced settings

In the **Advanced** settings, you can use the following options:

* [Conditional Execution](../../platform/pipelines/step-skip-condition-settings/)
* [Failure Strategy](../../platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps/)
* [Looping Strategy](../../platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](../../platform/governance/policy-as-code/harness-governance-overview/)
