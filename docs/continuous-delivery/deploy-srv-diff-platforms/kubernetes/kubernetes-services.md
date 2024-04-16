---
title: Harness Kubernetes services
sidebar_position: 3
helpdocs_topic_id: 2nx0de3w99
helpdocs_category_id: wfnd8y0ifs
helpdocs_is_private: false
helpdocs_is_published: true
description: Define a Kubernetes service.
---

# Harness Kubernetes services

This topic describes how to add and configure a Harness Kubernetes service.

A Kubernetes service represents the microservices and other workloads you want to deploy to the cluster.

Setting up a Kubernetes service involves the following steps:

1. Add your manifests.
2. Add the artifacts you want to deploy.
3. Add any service variables you want to use in your manifests or pipeline.

### Manifests

Harness supports the following manifest types and orchestration methods.

For more information about using Kubernetes manifests in Harness, go to [Add Kubernetes manifests](cd-kubernetes-category/define-kubernetes-manifests/).

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

#### Kubernetes

<details>

<summary>Use Kubernetes manifests</summary>

You can use:

* Standard Kubernetes manifests hosted in any repo or in Harness.
* Values YAML files that use Go templating to template manifests.
* Values YAML files can use a mix of hardcoded values and Harness expressions.

Here's a YAML example for a service with manifests hosted in Github and the nginx image hosted in Docker Hub.



Create a service using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.



For the Terraform Provider resource, go to [harness\_platform\_service](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_service).



To add Kubernetes manifests to your service, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Manifests**, click **Add Manifest**.
7. In **Specify Manifest Type**, select **K8s Manifest**, and then click **Continue**.
8.  In **Specify K8s Manifest Store**, select the Git provider.

    The settings for each Git provider are slightly different, but you simply want to point to the Git account For example, click GitHub, and then select or create a new GitHub Connector. See [Connect to Code Repo](../../../platform/connectors/code-repositories/connect-to-code-repo/).
9. Click **Continue**. **Manifest Details** appears.
10. In **Manifest Identifier**, enter an Id for the manifest.
11. If you selected a Connector that uses a Git account instead of a Git repo, enter the name of the repo where your manifests are located in **Repository Name**.
12. In **Git Fetch Type**, select **Latest from Branch** or **Specific Commit ID**, and then enter the branch or commit Id for the repo.
13. For **Specific Commit ID**, you can also use a [Git commit tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging).
14. In **File/Folder Path**, enter the path to the manifest file or folder in the repo. The Connector you selected already has the repo name, so you simply need to add the path from the root of the repo.

    If you are using a values.yaml file and it's in the same repo as your manifests, in **Values YAML**, click **Add File**.
15. Enter the path to the values.yaml file from the root of the repo.

    Here's an example with the manifest and values.yaml file added.

    ![](static/kubernetes-services-01.png)

    If you use multiple files, the highest priority is given from the last file, and the lowest priority to the first file. For example, if you have 3 files and the second and third files contain the same key:value as the first file, the third file's key:value overrides the second and first files.

    ![](static/kubernetes-services-02.png)
16. Click **Submit**. The manifest is added to **Manifests**.

Harness Kubernetes Services can use Values YAML files just like you would using Helm. Harness manifests can use [Go templating](kubernetes-services.md#go\_templating) with your Values YAML files and you can include [Harness variable expressions](../../../platform/variables-and-expressions/harness-variables/) in the Values YAML files.

If you are using a Values YAML file and it's in the same repo as your manifests, you can add it when you add your manifests, as described above (**Values YAML** --> **Add File**).

If you are using a Values YAML file and it's in a separate repo from your manifests, or you simply want to add it separately, you can add it as a separate file, described below.

You cannot use Harness variables expressions in your Kubernetes object manifest files. You can only use Harness variables expressions in Values YAML files.Add a Values YAML fileWhere is your Values YAML file located?

* **Same folder as manifests:** If you are using a values.yaml file and it's in the same repo as your manifests, you can add it when you add your manifests, as described above (**Values YAML** --> **Add File**).
* **Separate from manifests:** If your values file is located in a different folder, you can add it separately as a **Values YAML** manifest type, described below.

To add a Values YAML file, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Manifests**, click **Add Manifest**.
7. In **Specify Manifest Type**, select **Values YAML**, and click **Continue.**
8.  In **Specify Values YAML Store**, select the Git repo provider you're using and then create or select a Connector to that repo. The different Connectors are covered in [Connect to a Git Repo](../../../platform/connectors/code-repositories/connect-to-code-repo/).

    If you haven't set up a Harness Delegate, you can add one as part of the Connector setup. This process is described in [Kubernetes CD tutorial](kubernetes-cd-quickstart/), [Helm CD tutorial](../helm/helm-cd-quickstart/) and [Install a Kubernetes delegate](../../../platform/delegates/install-delegates/overview/).
9. Once you've selected a Connector, click **Continue**.
10. In **Manifest Details**, you tell Harness where the values.yaml is located.
11. In **Manifest Identifier**, enter a name that identifies the file, like **values**.
12. If you selected a Connector that uses a Git account instead of a Git repo, enter the name of the repo where your manifests are located in **Repository Name**.
13. In **Git Fetch Type**, select a branch or commit Id for the manifest, and then enter the Id or branch.
    * For **Specific Commit ID**, you can also use a [Git commit tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging).
    * In **File Path**, enter the path to the values.yaml file in the repo.

You can enter multiple values file paths by clicking **Add File**. At runtime, Harness will compile the files into one values file.

If you use multiple files, the highest priority is given from the last file, and the lowest priority to the first file. For example, if you have 3 files and the second and third files contain the same key:value as the first file, the third file's key:value overrides the second and first files.

![](static/kubernetes-services-03.png) 14. Click **Submit**.

The values file(s) are added to the Service.

**Values files in both the Manifests and Values YAML**

If you have Values files in both the K8s Manifest **File/Folder Path** and the Values YAML, the Values YAML will overwrite any matching values in the Values YAML in the Manifest **File/Folder Path**.

<img src="static/kubernetes-services-04.png" alt="" data-size="original">

**Ignore a manifest file during deployment**

You might have manifest files for resources that you do not want to deploy as part of the main deployment.

Instead, you can tell Harness to ignore these files and then apply them separately using the Harness [Apply](cd-k8s-ref/kubernetes-apply-step/) step. Or you can simply ignore them and deploy them later.

See [Ignore a manifest file during deployment](cd-kubernetes-category/ignore-a-manifest-file-during-deployment/) and [Apply](cd-k8s-ref/kubernetes-apply-step/).

**Notes**

* If this is your first time using Harness for a Kubernetes deployment, see [Kubernetes CD tutorial](kubernetes-cd-quickstart/).
* For a task-based walkthroughs of different Kubernetes features in Harness, see [Kubernetes How-tos](../../../category/kubernetes/).
* You can hardcode your artifact in your manifests, our add your artifact source to your **Service Definition** and then reference it in your manifests.

</details>

#### Helm Charts

<details>

<summary>Use Helm Charts</summary>

You can use Helm charts stored in an HTTP Helm Repository, OCI Registry, a Git repo provider, a cloud storage service (Google Cloud Storage, AWS S3, Azure Repo), a custom repo, or the [Harness File Store](../../x-platform-cd-features/services/add-inline-manifests-using-file-store/).

import Tabs1 from '@theme/Tabs'; import TabItem1 from '@theme/TabItem';

Here's a YAML example for a service with manifests hosted in Github and the nginx image hosted in Docker Hub.



Create a service using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.



For the Terraform Provider resource, go to [harness\_platform\_service](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_service).



To add a Helm chart to your service, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Manifests**, click **Add Manifest**.
7. In **Specify Manifest Type**, select **Helm Chart**, and click **Continue**.
8.  In **Specify Helm Chart Store**, select the storage service you're using.

    ![helm storage](static/a49287968d8e99d3368420384bab12d62206d48fa714cd0c61eed12ca14c641f.png)

**Options for connecting to a Helm chart store**

The options avialable to you to specify a Helm chart store depend on whether or not specific feature flags are enabled on your account. Options available without any feature flags or with specific feature flags enabled are described here:

```
* **Feature flag disabled**. Only one option is available: **OCI Helm Registry Connector**. This option enables you to connect to any OCI-based registry.
* **Feature flag enabled**. You can choose between connectors in the following categories:
  - **Direct Connection**. Contains the OCI Helm Registry Connector option (shortened to **OCI Helm**), which you can use with any OCI-based registry.
  - **Via Cloud Provider**. Contains the ECR connector option. This connector is specifically designed for AWS ECR to help you overcome the limitation of having to regenerate the ECR registry authentication token every 12 hours. The ECR connector option uses an AWS connector and regenerates the required authentication token if the token has expired.
```

For the steps and settings of each option, go to [Connectors](../../../category/connectors/) or [Connect to a Git repo](../../../platform/connectors/code-repositories/connect-to-code-repo/).

Once your Helm chart is added, it appears in the **Manifests** section. For example:

<img src="static/kubernetes-services-05.png" alt="" data-size="original">

**Important notes**

* If this is your first time using Harness for a Helm Chart deployment, see [Helm Chart deployment tutorial](../helm/helm-cd-quickstart/).
* For a detailed walkthrough of deploying Helm Charts in Harness, including limitations and binary support, see [Deploy Helm Charts](../helm/deploy-helm-charts/).
* Harness does not support AWS cross-account access for [ChartMuseum](https://chartmuseum.com/) and AWS S3. For example, if the Harness Delegate used to deploy charts is in AWS account A, and the S3 bucket is in AWS account B, the Harness connector that uses this delegate in A cannot assume the role for the B account.
* Harness cannot fetch Helm chart versions with Helm OCI because Helm OCI no longer supports `helm chart list`. See [OCI Feature Deprecation and Behavior Changes with Helm v3.7.0](https://helm.sh/docs/topics/registries/#oci-feature-deprecation-and-behavior-changes-with-v370).
* Currently, you cannot list the OCI image tags in Harness. This is a Helm limitation. For more information, go to [Helm Search Repo Chart issue](https://github.com/helm/helm/issues/11000).

</details>

#### Kustomize

<details>

<summary>Use Kustomize</summary>

Harness supports Kustomize deployments. You can use overlays, multibase, plugins, sealed secrets, patches, etc, just as you would in any native kustomization.

import Tabs2 from '@theme/Tabs'; import TabItem2 from '@theme/TabItem';

Here's a YAML example for a service using a publicly available [helloword kustomization](https://github.com/wings-software/harness-docs/tree/main/kustomize/helloWorld) cloned from Kustomize.



Create a service using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.



For the Terraform Provider resource, go to [harness\_platform\_service](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_service).



To add a kustomization, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Manifests**, click **Add Manifest**.
7. In your CD stage, click **Service**.
8. In **Service Definition**, select **Kubernetes**.
9. In **Manifests**, click **Add Manifest**.
10. In **Specify Manifest Type**, click **Kustomize**, and click **Continue**.
11. In **Specify Manifest Type**, select a Git provider, [Harness File Store](../../x-platform-cd-features/services/add-inline-manifests-using-file-store/), or Azure Repo.
12. In **Manifest Details**, enter the following settings, test the connection, and click **Submit**.

    * **Manifest Identifier:** enter **kustomize**.
    * **Git Fetch Type:** select **Latest from Branch**.
    * **Branch:** enter **main**.
    * **Kustomize Folder Path:** kustomize/helloWorld. This is the path from the repo root.

    The kustomization is now listed.

    ![](static/kubernetes-services-06.png)

You cannot use Harness variables in the base manifest or kustomization.yaml. You can only use Harness variables in kustomize patches you add in **Kustomize Patches Manifest Details**.

**How Harness uses patchesStrategicMerge:**

* Kustomize patches override values in the base manifest. Harness supports the `patchesStrategicMerge` patches type.
* If the `patchesStrategicMerge` label is missing from the kustomization YAML file, but you have added Kustomize Patches to your Harness Service, Harness will add the Kustomize Patches you added in Harness to the `patchesStrategicMerge` in the kustomization file. If you have hardcoded patches in `patchesStrategicMerge`, but not add these patches to Harness as Kustomize Patches, Harness will ignore them.

For a detailed walkthrough of using patches in Harness, go to [Use Kustomize for Kubernetes deployments](../kustomize/use-kustomize-for-kubernetes-deployments/).

To use Kustomize Patches, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Manifests**, select **Add Manifest**.
7. In **Specify Manifest Type**, select **Kustomize Patches**, and select**Continue**.
8.  In **Specify Kustomize Patches Store**, select your Git provider and Connector. See [Connect to a Git Repo](../../../platform/connectors/code-repositories/connect-to-code-repo/).

    The Git Connector should point to the Git account or repo where you Kustomize files are located. In **Kustomize Patches** you will specify the path to the actual patch files.
9. Select **Continue**.
10. In **Manifest Details**, enter the path to your patch file(s):
    * **Manifest Identifier:** enter a name that identifies the patch file(s). You don't have to add the actual filename.
    * **Git Fetch Type:** select whether to use the latest branch or a specific commit Id.
    * **Branch**/**Commit Id**: enter the branch or commit Id.
    * **File/Folder Path:** enter the path to the patch file(s) from the root of the repo.
11. Click **Add File** to add each patch file. The files you add should be the same files listed in `patchesStrategicMerge` of the main kustomize file in your Service.

    The order in which you add file paths for patches in **File/Folder Path** is the same order that Harness applies the patches during the kustomization build.

    Small patches that do one thing are recommended. For example, create one patch for increasing the deployment replica number and another patch for setting the memory limit.
12. Select **Submit**. The patch file(s) is added to **Manifests**.

    When the main kustomization.yaml is deployed, the patch is rendered and its overrides are added to the deployment.yaml that is deployed.

If this is your first time using Harness for a Kustomize deployment, see the [Kustomize Quickstart](../kustomize/kustomize-quickstart/).

For a detailed walkthrough of deploying Kustomize in Harness, including limitations, see [Use Kustomize for Kubernetes Deployments](../kustomize/use-kustomize-for-kubernetes-deployments/).

**Important notes**

* Harness supports Kustomize and Kustomize Patches for Rolling, Blue Green and Delete steps.
* Harness does not use Kustomize for rollback. Harness renders the templates using Kustomize and then passes them onto kubectl. A rollback works exactly as it does for native Kubernetes.
* You cannot use Harness variables in the base manifest or kustomization.yaml. You can only use Harness variables in kustomize patches you add in **Kustomize Patches Manifest Details**.
* **Kustomize binary versions:**
  * Harness includes Kustomize binary versions 3.5.4 and 4.0.0. By default, Harness uses 3.5.4.
  * To use 4.0.0, you must enable the feature flag `NEW_KUSTOMIZE_BINARY` in your account. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
* Harness will not follow symlinks in the Kustomize and Kustomize Patches files it pulls.

</details>

#### OpenShift templates

<details>

<summary>Use OpenShift templates</summary>

Harness supports OpenShift for Kubernetes deployments.

For an overview of OpenShift support, see [Using OpenShift with Harness Kubernetes](cd-k8s-ref/using-open-shift-with-harness-kubernetes/).

import Tabs3 from '@theme/Tabs'; import TabItem3 from '@theme/TabItem';

Here's a YAML example for a service using an OpenShift template that is stored in the [Harness File Store](../../x-platform-cd-features/services/add-inline-manifests-using-file-store/).



Create a service using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.



For the Terraform Provider resource, go to [harness\_platform\_service](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_service).



To add an OpenShift Template to a service, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Manifests**, click **Add Manifest**.
7. In **Specify Manifest Type**, select **OpenShift Template**, and then select **Continue.**
8. In **Specify OpenShift Template Store**, select where your template is located.

You can use a Git provider, the [Harness File Store](../../x-platform-cd-features/services/add-inline-manifests-using-file-store/), a custom repo, or Azure Repos.

1. For example, click **GitHub**, and then select or create a new GitHub Connector. See [Connect to Code Repo](../../../platform/connectors/code-repositories/connect-to-code-repo/).
2. Select **Continue**. **Manifest Details** appears.
3. In **Manifest Identifier**, enter an Id for the manifest. It must be unique. It can be used in Harness expressions to reference this template's settings.
4. In **Git Fetch Type**, select **Latest from Branch** or **Specific Commit Id/Git Tag**, and then enter the branch or commit Id/[tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) for the repo.
5. In **Template** **File Path**, enter the path to the template file. The Connector you selected already has the repo name, so you simply need to add the path from the root of the repo to the file.
6. Select **Submit**. The template is added to **Manifests**.

OpenShift Param Files can be added in the following ways:

1. Attached to the OpenShift Template you added.
2. Added as a separate manifest.

<img src="static/9e15cbd984b566f357edc930d15ff7ce9d186c4d843615f5299710605926f811.png" alt="Params" data-size="original">

For an overview of OpenShift support, see [Using OpenShift with Harness Kubernetes](cd-k8s-ref/using-open-shift-with-harness-kubernetes/).

Let's look at an example where the OpenShift Param is attached to a template already added:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select the service with the OpenShift template.
3. Select **Configuration**.
4. In **Manifests**, select **Attach OpenShift Param**.
5. In **Enter File Path**, select where your params file is located.
6. Select **Submit**. The params file is added to **Manifests**.

You can now see the params file in the OpenShift Template **Manifest Details**.

<img src="static/bbeb75857343eb531ec2025d898bceb40393fa5068529e4ae69970ca3eaa8f4d.png" alt="Manifest Details" data-size="original">

**Deployment strategy support**

In addition to standard workload type support in Harness (see [What can I deploy in Kubernetes?](cd-k8s-ref/what-can-i-deploy-in-kubernetes/)), Harness supports [DeploymentConfig](https://docs.openshift.com/container-platform/4.1/applications/deployments/what-deployments-are.html), [Route](https://docs.openshift.com/enterprise/3.0/architecture/core\_concepts/routes.html), and [ImageStream](https://docs.openshift.com/enterprise/3.2/architecture/core\_concepts/builds\_and\_image\_streams.html#image-streams) across Canary, Blue Green, and Rolling deployment strategies.

Please use `apiVersion: apps.openshift.io/v1` and not `apiVersion: v1`.

**Harness supports list objects**

You can leverage Kubernetes list objects as needed without modifying your YAML for Harness.

When you deploy, Harness will render the lists and show all the templated and rendered values in the log.

Harness supports:

* List
* NamespaceList
* ServiceList
* For Kubernetes deployments, these objects are supported for all deployment strategies (Canary, Rolling, Blue/Green).
* For Native Helm, these objects are supported for Rolling deployments.

If you run `kubectl api-resources` you should see a list of resources, and `kubectl explain` will work with any of these.

**Important notes**

* Make sure that you update your version to `apiVersion: apps.openshift.io/v1` and not `apiVersion: v1`.
* The token does not need to have global read permissions. The token can be scoped to the namespace.
* The Kubernetes containers must be OpenShift-compatible containers. If you are already using OpenShift, then this is already configured. But be aware that OpenShift cannot simply deploy any Kubernetes container. You can get OpenShift images from the following public repos: [https://hub.docker.com/u/openshift](https://hub.docker.com/u/openshift) and [https://access.redhat.com/containers](https://access.redhat.com/containers).
* Useful articles for setting up a local OpenShift cluster for testing: [How To Setup Local OpenShift Origin (OKD) Cluster on CentOS 7](https://computingforgeeks.com/setup-openshift-origin-local-cluster-on-centos/), [OpenShift Console redirects to 127.0.0.1](https://chrisphillips-cminion.github.io/kubernetes/2019/07/08/OpenShift-Redirect.html).

</details>

### Artifacts

You have two options when referencing the artifacts you want to deploy:

* Add an artifact source to the Harness service and reference it using the Harness expression `<+artifacts.primary.image>` in the values YAML file.
* Hardcode the artifact into the manifests or values YAML file.

<details>

<summary>Use the artifact expression</summary>

Add the image location to Harness as an artifact in the **Artifacts** section of the service.

<img src="static/kubernetes-services-07.png" alt="" data-size="original">

This allows you to reference the image in your values YAML files using the Harness expression `<+artifacts.primary.image>`.

```yaml

---
image: <+artifacts.primary.image>
```

You cannot use Harness variables expressions in your Kubernetes object manifest files. You can only use Harness variables expressions in values YAML files, or Kustomize Patch file.

When you select the artifact repo for the artifact, like a Docker Hub repo, you specify the artifact and tag/version to use.

You can select a specific tag/version, use a [runtime input](../../../platform/variables-and-expressions/runtime-inputs/) so that you are prompted for the tag/version when you run the pipeline, or you can use an Harness variable expression to pass in the tag/version at execution.

Here's an example where a runtime input is used and you select which image version/tag to deploy.

<img src="static/kubernetes-services-08.png" alt="" data-size="original">

With a Harness artifact, you can template your manifests, detaching them from a hardcoded location. This makes your manifests reusable and dynamic.

</details>

<details>

<summary>Hardcode the artifact</summary>

If a Docker image location is hardcoded in your Kubernetes manifest (for example, `image: nginx:1.14.2`), then you can simply add the manifest to Harness in **Manifests** and Kubernetes will pull the image during deployment.

When you hardcode the artifact in your manifests, any artifacts added to your Harness service are ignored.

</details>

#### Docker

<details>

<summary>Use artifacts in any Docker registry</summary>

import Tabs5 from '@theme/Tabs'; import TabItem5 from '@theme/TabItem';

To use a Docker artifact, you create or use a Harness connector to connect to your Docker repo and then use that connector in your Harness service and reference the artifact to use.





Create the Docker connector using the [Create a Connector](https://apidocs.harness.io/tag/Connectors#operation/createConnector) API.



Create a service with an artifact source that uses the connector using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.

For the Terraform Provider Docker connector resource, go to [harness\_platform\_connector\_docker](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_connector\_docker).



For the Terraform Provider service resource, go to [harness\_platform\_service](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_service).



To add an artifact from a Docker registry, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Artifacts**, select **Add Artifact Source**.
7. In **Select Artifact Repository Type**, select the registry where your Docker artifact is hosted. For this example, we'll select **Docker Registry**, and then click **Continue**.
8. Select or create a [Docker Registry Connector](../../../platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference/).
9. Select **Continue**.
10. In **Artifact Source Name**, enter a name that identifies your artifact.
11. In **Image path**, enter the name of the artifact you want to deploy, such as `library/nginx` or `jsmtih/privateimage`.

    Official images in public repos often need the label `library`, e.g. `library/tomcat`.

    Wildcards are not supported.
12. In **Tag**, enter or select the [Docker image tag](https://docs.docker.com/engine/reference/commandline/tag/) for the image.

    ![](static/kubernetes-services-09.png)
13. Click **Submit**.
14. The Artifact is added to the Service Definition.

**Important notes**

* For pulling Docker images from Docker repos, Harness is restricted by the limits of the Docker repo. For example, [Docker Hub limits](https://docs.docker.com/docker-hub/download-rate-limit/).
* The maximum number of artifact image tags fetched by Harness that is 10000.

</details>

#### Google Container Registry (GCR)

<details>

<summary>Use GCR artifacts</summary>

You connect to GCR using a Harness GCP Connector. For details on all the GCR requirements for the GCP Connector, see [Google Cloud Platform (GCP) Connector Settings Reference](../../../platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference/).

import Tabs6 from '@theme/Tabs'; import TabItem6 from '@theme/TabItem';

To use a GCR artifact, you create or use a Harness GCP Connector to connect to GCR repo and then use that connector in your Harness service and reference the artifact to use.





Create the GCR connector using the \[Create a Connector]\(https://apidocs.harness.io/tag/Connectors#operation/createConnector) API.



Create a service with an artifact source that uses the connector using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.

For the Terraform Provider GCP connector resource, go to [harness\_platform\_connector\_gcp](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_connector\_gcp).



For the Terraform Provider service resource, go to [harness\_platform\_service](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_service).

You connect to GCR using a Harness GCP Connector. For details on all the GCR requirements for the GCP Connector, see [Google Cloud Platform (GCP) Connector Settings Reference](../../../platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference/).

To add an artifact from GCR, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Artifacts**, select **Add Artifact Source**.
7. In **Select Artifact Repository Type**, click **GCR**, and then click **Continue**.
8. In **GCR Repository**, select or create a [Google Cloud Platform (GCP) Connector](../../../platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference/) that connects to the GCP account where the GCR registry is located.
9. Click **Continue**.
10. In **Artifact Source Name**, enter a name for the artifact.
11. In **GCR Registry URL**, select the GCR registry host name, for example `gcr.io`.
12. In **Image Path**, enter the name of the artifact you want to deploy.

    Images in repos need to reference a path starting with the project Id that the artifact is in, for example: `myproject-id/image-name`.
13. In **Tag**, enter or select the [Docker image tag](https://docs.docker.com/engine/reference/commandline/tag/) for the image or select a [runtime input or expression](../../../platform/variables-and-expressions/runtime-inputs/).

    ![](static/kubernetes-services-10.png)

    If you use runtime input, when you deploy the pipeline, Harness will pull the list of tags from the repo and prompt you to select one.
14. Click **Submit**.

    The Artifact is added to the **Service Definition**.

**Permissions**

For Google Container Registry (GCR), the following roles are required:

* Storage Object Viewer (roles/storage.objectViewer)
* Storage Object Admin (roles/storage.objectAdmin)

For more information, go to the GCP documentation about [Cloud IAM roles for Cloud Storage](https://cloud.google.com/storage/docs/access-control/iam-roles).

Ensure the Harness Delegate you have installed can reach `storage.cloud.google.com` and your GCR registry host name, for example `gcr.io`.

</details>

#### Google Artifact Registry

<details>

<summary>Use Google Artifact Registry artifacts</summary>

You connect to Google Artifact Registry using a Harness GCP Connector.

For details on all the Google Artifact Registry requirements for the GCP Connector, see [Google Cloud Platform (GCP) Connector Settings Reference](../../../platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference/).

import Tabs7 from '@theme/Tabs'; import TabItem7 from '@theme/TabItem';

This example uses a Harness Delegate installed in GCP for credentials.





Create the Google Artifact Registry connector using the [Create a Connector](https://apidocs.harness.io/tag/Connectors#operation/createConnector) API.



Create a service with an artifact source that uses the connector using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.

For the Terraform Provider GCP connector resource, go to [harness\_platform\_connector\_gcp](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_connector\_gcp).



For the Terraform Provider service resource, go to [harness\_platform\_service](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_service).

You connect to Google Artifact Registry using a Harness GCP Connector.

For details on all the Google Artifact Registry requirements for the GCP Connector, see [Google Cloud Platform (GCP) Connector Settings Reference](../../../platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference/).

To add an artifact from Google Artifact Registry, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Artifacts**, select **Add Artifact Source**.
7. In **Artifact Repository Type**, select **Google Artifact Registry**, and then select **Continue**.
8. In **GCP Connector**, select or create a [Google Cloud Platform (GCP) Connector](../../../platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference/) that connects to the GCP account where the Google Artifact Registry is located.
9. Select **Continue**.
10. In **Artifact Details**, you are basically creating the pull command. For example:

    ```
    docker pull us-central1-docker.pkg.dev/docs-play/quickstart-docker-repo/quickstart-image:v1.0
    ```
11. In **Artifact Source Name**, enter a name for the artifact.
12. In **Repository Type**, select the format of the artifact.
13. In **Project**, enter the Id of the GCP project.
14. In **Region**, select the region where the repo is located.
15. In **Repository Name**, enter the name of the repo.
16. In **Package**, enter the artifact name.
17. In **Version Details**, select **Value** or **Regex**.
18. In **Version**, enter or select the [Docker image tag](https://docs.docker.com/engine/reference/commandline/tag/) for the image or select [runtime input or expression](../../../platform/variables-and-expressions/runtime-inputs/).

    ![](static/kubernetes-services-11.png) If you use runtime input, when you deploy the pipeline, Harness will pull the list of tags from the repo and prompt you to select one.

    :::note

    If you used Fixed Value in **Version** and Harness is not able to fetch the image tags, ensure that the GCP service account key used in the GCP connector credentials, or in the service account used to install the Harness Delegate, has the required permissions. See the **Permissions** tab in this documentation.

    :::
19. Click **Submit**. The Artifact is added to the **Service Definition**.

**Permissions**

For Google Artifact Registry, the following roles are required:

* Artifact Registry Reader
* Artifact Registry Writer

For more information, go to the GCP documentation [Configure roles and permissions](https://cloud.google.com/artifact-registry/docs/access-control).

Ensure the Harness Delegate you have installed can reach your Google Artifact Registry region, for example `us-central1`.

</details>

#### Amazon Elastic Container Registry (ECR)

<details>

<summary>Use ECR artifacts</summary>

You connect to ECR using a Harness AWS connector. For details on all the ECR requirements for the AWS connector, see [AWS Connector Settings Reference](../../../platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/).

import Tabs8 from '@theme/Tabs'; import TabItem8 from '@theme/TabItem';

This example uses a Harness Delegate installed in AWS for credentials.





Create the ECR connector using the [Create a Connector](https://apidocs.harness.io/tag/Connectors#operation/createConnector) API.



Create a service with an artifact source that uses the connector using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.

For the Terraform Provider ECR connector resource, go to [harness\_platform\_connector\_aws](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_connector\_aws).



For the Terraform Provider service resource, go to [harness\_platform\_service](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_service).

You connect to ECR using a Harness AWS Connector. For details on all the ECR requirements for the AWS Connector, see [AWS Connector Settings Reference](../../../platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/).

To add an artifact from ECR, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Artifacts**, select **Add Artifact Source**.
7. In **Artifact Repository Type**, click **ECR**, and then select **Continue**.
8. In **ECR Repository**, select or create an [AWS connector](../../../platform/connectors/cloud-providers/add-aws-connector/) that connects to the AWS account where the ECR registry is located.
9. Select **Continue**.
10. In **Artifact Details**, in **Region**, select the region where the artifact source is located.
11. In **Image Path**, enter the name of the artifact you want to deploy.
12. In **Tag**, enter or select the [Docker image tag](https://docs.docker.com/engine/reference/commandline/tag/) for the image.

    ![ECR artifact details](static/74fe6d9189f8f18b2e854598026ab1db27944dab47c3056f4ffaaab93582242a.png)

    If you use runtime input, when you deploy the pipeline, Harness will pull the list of tags from the repo and prompt you to select one.
13. Select **Submit**.

    The Artifact is added to the Service Definition.

    ![ECR artifact source in a service](static/769c54fe91e7497b4aef3733f128361457b933f1d0eccd0d9b3491f1da4ed0c7.png)

**Permissions**

Ensure that the AWS IAM user account you use in the AWS Connector has the following policy.

</details>

#### Azure Container Registry (ACR)

<details>

<summary>Use ACR artifacts</summary>

You connect to ACR using a Harness Azure Connector. For details on all the Azure requirements for the Azure Connector, see [Add a Microsoft Azure cloud connector](../../../platform/connectors/cloud-providers/add-a-microsoft-azure-connector/).

import Tabs9 from '@theme/Tabs'; import TabItem9 from '@theme/TabItem';

This example uses a Harness Delegate installed in Azure for credentials.





Create the ACR connector using the [Create a Connector](https://apidocs.harness.io/tag/Connectors#operation/createConnector) API.



Create a service with an artifact source that uses the connector using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.

For the Terraform Provider ACR connector resource, go to [harness\_platform\_connector\_azure\_cloud\_provider](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_connector\_azure\_cloud\_provider).



For the Terraform Provider service resource, go to [harness\_platform\_service](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_service).

You connect to ACR using a Harness Azure Connector. For details on all the Azure requirements for the Azure Connector, see [Add a Microsoft Azure Cloud Connector](../../../platform/connectors/cloud-providers/add-a-microsoft-azure-connector/).

To add an artifact from ACR, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Artifacts**, select **Add Artifact Source**.
7. In **Artifact Repository Type**, click **ACR**, and then select **Continue**.
8. In **ACR Repository**, select or create an [Azure Connector](../../../platform/connectors/cloud-providers/add-a-microsoft-azure-connector/) that connects to the Azure account where the ACR registry is located.
9. Select **Continue**.
10. In **Artifact Details**, in **Subscription Id**, select the Subscription Id where the artifact source is located.
11. In **Registry**, select the ACR registry to use.
12. In **Repository**, select the repo to use.
13. In **Tag**, enter or select the tag for the image.

    ![](static/kubernetes-services-13.png)

    If you use runtime input, when you deploy the pipeline, Harness will pull the list of tags from the repo and prompt you to select one.
14. Click **Submit**. The artifact is added to the Service Definition.

**Permissions**

The Harness Azure connectors that you'll use to connect Harness to ACR must have the **Reader** role, at minimum. You can also use a custom role that includes the permissions of the Reader role.

**Important notes**

* Harness supports 500 images from an ACR repo. If you don't see some of your images, then you might have exceeded this limit. This is the result of an Azure API limitation.
* If you connect to an ACR repo via the platform-agnostic Docker Connector, the limit is 100.

</details>

#### Nexus

<details>

<summary>Use Nexus artifacts</summary>

You connect to Nexus using a Harness Nexus Connector. For details on all the requirements for the Nexus Connector, see [Nexus Connector Settings Reference](../../../platform/connectors/artifact-repositories/nexus-connector-settings-reference/).

import Tabs10 from '@theme/Tabs'; import TabItem10 from '@theme/TabItem';





Create the Nexus connector using the [Create a Connector](https://apidocs.harness.io/tag/Connectors#operation/createConnector) API.



Create a service with an artifact source that uses the connector using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.

For the Terraform Provider Nexus connector resource, go to [harness\_platform\_connector\_nexus](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_connector\_nexus).



For the Terraform Provider service resource, go to [harness\_platform\_service](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_service).

You connect to Nexus using a Harness Nexus Connector. For details on all the requirements for the Nexus Connector, see [Nexus Connector Settings Reference](../../../platform/connectors/artifact-repositories/nexus-connector-settings-reference/).

To add an artifact from Nexus, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Artifacts**, click **Add Artifact Source**.
7. In **Artifact Repository Type**, click **Nexus**, and then select **Continue**.
8. In **Nexus Repository**, select of create a Nexus Connector that connects to the Nexus account where the repo is located.
9. Select **Continue**.
10. Select **Repository URL** or **Repository Port**.
    * **Repository Port** is more commonly used and can be taken from the repo settings. Each repo uses its own port.
    * **Repository URL** is typically used for a custom infrastructure (for example, when Nexus is hosted behind a reverse proxy).
11. In **Repository**, enter the name of the repo.
12. In **Artifact Path**, enter the path to the artifact you want.
13. In **Tag**, enter or select the [Docker image tag](https://docs.docker.com/engine/reference/commandline/tag/) for the image.

    ![](static/kubernetes-services-14.png)

    If you use runtime input, when you deploy the pipeline, Harness will pull the list of tags from the repo and prompt you to select one.
14. Click **Submit**.

    The Artifact is added to the Service Definition.

**Permissions**

Ensure the connected user account has the following permissions in the Nexus Server.

* Repo: All repositories (Read)
* Nexus UI: Repository Browser

<img src="static/c98a49842e9d8bc5f3d2bef35aeff23c39932602a28d311eec5288cbf0fb22a9.png" alt="Nexus repo perms for Harness" data-size="original">

See [Nexus Managing Security](https://help.sonatype.com/en/managing-security.html).

For Nexus 3, when used as a **Docker** repo, the user needs:

* A role with the `nx-repository-view-*_*_*` privilege.

</details>

#### Artifactory

<details>

<summary>Use Artifactory artifacts</summary>

You connect to Artifactory (JFrog) using a Harness Artifactory Connector. For details on all the requirements for the Artifactory Connector, see [Artifactory Connector Settings Reference](../../../platform/connectors/cloud-providers/ref-cloud-providers/artifactory-connector-settings-reference/).

import Tabs11 from '@theme/Tabs'; import TabItem11 from '@theme/TabItem';





Create the Artifactory connector using the [Create a Connector](https://apidocs.harness.io/tag/Connectors#operation/createConnector) API.



Create a service with an artifact source that uses the connector using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.

For the Terraform Provider Artifactory connector resource, go to [harness\_platform\_connector\_artifactory](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_connector\_artifactory).



For the Terraform Provider service resource, go to [harness\_platform\_service](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_service).

You connect to Artifactory (JFrog) using a Harness Artifactory Connector. For details on all the requirements for the Artifactory Connector, go to [Artifactory Connector Settings Reference](../../../platform/connectors/cloud-providers/ref-cloud-providers/artifactory-connector-settings-reference/).

To add an artifact from Artifactory, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Artifacts**, select **Add Artifact Source**.
7. In **Artifact Repository Type**, select **Artifactory**, and then select **Continue**.
8. In **Artifactory Repository**, select of create an Artifactory Connector that connects to the Artifactory account where the repo is located. Click **Continue**.
9. The **Artifact Details** settings appear.
10. In **Repository URL**, enter the URL from the `docker login` command in Artifactory's **Set Me Up** settings.

    ![](static/kubernetes-services-15.png)
11. In **Repository**, enter the repo name. If the full path is `docker-remote/library/mongo/3.6.2`, you would enter `docker-remote`.
12. In **Artifact Path**, enter the path to the artifact. If the full path is `docker-remote/library/mongo/3.6.2`, you would enter `library/mongo`.
13. In **Tag**, enter or select the [Docker image tag](https://docs.docker.com/engine/reference/commandline/tag/) for the image.

    ![](static/kubernetes-services-16.png)
14. If you use runtime input, when you deploy the pipeline, Harness will pull the list of tags from the repo and prompt you to select one.
15. Select **Submit**. The Artifact is added to the Service Definition.

**Permissions**

Make sure the following permissions are granted to the user:

* Privileged User is required to access API, whether Anonymous or a specific username (username and passwords are not mandatory).
* Read permission to all Repositories.

If used as a Docker Repo, user needs:

* List images and tags
* Pull images

See [Managing Permissions: JFrog Artifactory User Guide](https://www.jfrog.com/confluence/display/RTF/Managing+Permissions).

</details>

#### Github packages

<details>

<summary>Use Github packages as artifacts</summary>

You can use Github Packages as artifacts for deployments.

Currently, Harness supports only the packageType as `docker(container)`. Support for npm, maven, rubygems, and nuget is coming soon.

You connect to Github using a Harness [Github Connector](../../../platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference/), username, and Personal Access Token (PAT).

:::tip

**New to Github Packages?** This [quick video](https://www.youtube.com/watch?v=gqseP\_wTZsk) will get you up to speed in minutes.

:::

import Tabs12 from '@theme/Tabs'; import TabItem12 from '@theme/TabItem';





Create the Github connector using the [Create a Connector](https://apidocs.harness.io/tag/Connectors#operation/createConnector) API.



Create a service with an artifact source that uses the connector using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.

For the Terraform Provider Github connector resource, go to [harness\_platform\_connector\_github](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_connector\_github).



For the Terraform Provider service resource, go to [harness\_platform\_service](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform\_service).

You connect to Github using a Harness Github Connector, username, and Personal Access Token (PAT).

To add an artifact from Github Packages, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Kubernetes**.
6. In **Artifacts**, select **Add Artifact Source**.
7. In **Artifact Repository Type**, select **Github Package Registry**, and then select **Continue**.
8.  In **Github Package Registry Repository**, select or create a Github Connector that connects to the Github account where the package repo is located.

    Ensure that you enable **API Access** in the Github connector, and use a Personal Access Token (PAT) that meets the requirements listed in **Permissions**.
9. Select **Continue**.
10. The **Artifact Details** settings appear.
11. In **Artifact Source Name**, enter a name for this artifact source.
12. In **Package Type**, select the type of package you are using.
13. In **Package Name**, select the name of the package.
14. In **Version**, select the version to use.

If you use [runtime input](../../../platform/variables-and-expressions/runtime-inputs/), when you deploy the pipeline, Harness will pull the list of tags from the repo and prompt you to select one. 15. Select **Submit**. The Artifact is added to the Service Definition.

**Permissions**

The Github Personal Access Token (PAT) must have the `write:packages` and `read:packages` permissions.

Ensure that you enable **API access** in the Harness Github connector. In the Github connector YAML, the setting is `apiAccess`:

You can use the same Harness secret that you used for user authentication.

</details>

#### Custom artifact source

<details>

<summary>Use artifacts from a custom artifact source</summary>

For enterprises that use a custom repository, Harness provides the Custom Artifact Source.

To use this artifact source, you provide a script to query your artifact server via its API (for example, REST) and then Harness stores the output on the Harness Delegate in the Harness-initialized variable `$HARNESS_ARTIFACT_RESULT_PATH`.

The output must be a JSON array, with a mandatory key for a Build Number/Version. You then map a key from your JSON output to the Build Number/Version variable.

For steps on adding a Custom Artifact source, go to [Add a custom artifact source for CD](../../x-platform-cd-features/services/add-a-custom-artifact-source-for-cd/).

</details>

### Go templating

Harness supports [Go templating](https://godoc.org/text/template) for Kubernetes manifests and values YAML files.

You can add one or more values YAML files containing values for different scenarios, and then use Go templating in the manifest files to reference the values in the values YAML files.

Built-in Go templating support enables you to use Kubernetes without the need for Helm.

For more information, see [Example Kubernetes Manifests using Go Templating](cd-k8s-ref/example-kubernetes-manifests-using-go-templating/).

Let's look at a few Kubernetes templating examples.

<details>

<summary>Basic values YAML and manifests for a public image</summary>

Here's the values YAML file:

```yaml
name: <+stage.name>
replicas: 2

image: <+artifacts.primary.image>
# dockercfg: <+artifacts.primary.imagePullSecret>

createNamespace: true
namespace: <+infra.namespace>

serviceType: LoadBalancer

servicePort: 80
serviceTargetPort: 80

env:
  config:
    key1: value10
  secrets:
    key2: value2
```

Here's the manifest containing multiple objects referring to the values in the values YAML file:

```go
{{- if .Values.env.config}}
apiVersion: v1
kind: ConfigMap
metadata:
 name: {{.Values.name}}
data:
{{.Values.env.config | toYaml | indent 2}}
---
{{- end}}

{{- if .Values.env.secrets}}
apiVersion: v1
kind: Secret
metadata:
 name: {{.Values.name}}
stringData:
{{.Values.env.secrets | toYaml | indent 2}}
---
{{- end}}

{{- if .Values.dockercfg}}
apiVersion: v1
kind: Secret
metadata:
 name: {{.Values.name}}-dockercfg
 annotations:
 harness.io/skip-versioning: true
data:
 .dockercfg: {{.Values.dockercfg}}
type: kubernetes.io/dockercfg
---
{{- end}}

apiVersion: apps/v1
kind: Deployment
metadata:
 name: {{.Values.name}}-deployment
spec:
 replicas: {{int .Values.replicas}}
 selector:
 matchLabels:
 app: {{.Values.name}}
 template:
 metadata:
 labels:
 app: {{.Values.name}}
 spec:
 {{- if .Values.dockercfg}}
 imagePullSecrets:
 - name: {{.Values.name}}-dockercfg
 {{- end}}
 containers:
 - name: {{.Values.name}}
 image: {{.Values.image}}
 {{- if or .Values.env.config .Values.env.secrets}}
 envFrom:
 {{- if .Values.env.config}}
 - configMapRef:
 name: {{.Values.name}}
 {{- end}}
 {{- if .Values.env.secrets}}
 - secretRef:
 name: {{.Values.name}}
 {{- end}}
 {{- end}}
```

</details>

### Pull an image from a private registry

Typically, if the Docker image you are deploying is in a private registry, Harness has access to that registry using the credentials set up in the Harness connector you use with your service **Artifacts**.

If some cases, your Kubernetes cluster might not have the permissions needed to access a private Docker registry.

For these cases, the values YAML file in Service Definition **Manifests** section must use the `dockercfg` parameter.

If the Docker image is added in the Service Definition **Artifacts** section, then you reference it like this: `dockercfg: <+artifacts.primary.imagePullSecret>`.

This key will import the credentials from the Docker credentials file in the artifact.

Open the values.yaml file you are using for deployment.

Verify that `dockercfg` key exists, and uses the `<+artifacts.primary.imagePullSecret>` expression to obtain the credentials:

```yaml
name: <+stage.variables.name>
replicas: 2

image: <+artifacts.primary.image>
dockercfg: <+artifacts.primary.imagePullSecret>

createNamespace: true
namespace: <+infra.namespace>
```

#### Reference dockercfg in Kubernetes objects

Next, verify that the Deployment and Secret objects reference `dockercfg: {{.Values.dockercfg}}`.

<details>

<summary>Reference dockercfg in Kubernetes objects</summary>

```yaml
...
{{- if .Values.dockercfg}}
apiVersion: v1
kind: Secret
metadata:
  name: {{.Values.name}}-dockercfg
  annotations:
    harness.io/skip-versioning: true
data:
  .dockercfg: {{.Values.dockercfg}}
type: kubernetes.io/dockercfg
---
{{- end}}

apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{.Values.name}}-deployment
spec:
  replicas: {{int .Values.replicas}}
  selector:
    matchLabels:
      app: {{.Values.name}}
  template:
    metadata:
      labels:
        app: {{.Values.name}}
    spec:
      {{- if .Values.dockercfg}}
      imagePullSecrets:
      - name: {{.Values.name}}-dockercfg
      {{- end}}
      containers:
      - name: {{.Values.name}}
        image: {{.Values.image}}
...
```

With these requirements met, the cluster imports the credentials from the Docker credentials file in the artifact.

</details>

### Sidecar workloads

You can use Harness to deploy both primary and sidecar Kubernetes workloads.

Kubernetes sidecar workloads are a powerful way to modularize and encapsulate application functionality while keeping the overall architecture simple and easy to manage.

Sidecars are commonly used to implement cross-cutting concerns like logging, monitoring, and security. By separating these concerns into separate containers, it's possible to add or modify them without affecting the primary container or the application running inside it.

For example, a logging sidecar can be used to capture and store application logs, metrics, and other data, without requiring the primary container to implement any logging code.

Sidecars can also be used to implement advanced features like load balancing, service discovery, and circuit breaking. By using a sidecar container for these features, it's possible to keep the primary container simple and focused on its core functionality, while still providing advanced capabilities to the application.

For more information, go to [Add a Kubernetes sidecar container](cd-kubernetes-category/add-a-kubernetes-sidecar-container/).

### Variables

In the **Variables** section of the service you can add variables are use them in values YAML and params files, or in other settings in your stage that support expressions.

![Harness service variables section](static/bfa1c1a5cd2c491e40250728317dee1918adfd779e29ef31c8baf9e4f32ad66f.png)

You can use the variable in your values YAML files. For example, here's a service variable used in the `name` key in the values YAML:

<details>

<summary>Service variable in values YAML file</summary>

```yaml
name: <+serviceVariables.appname>
replicas: 2

image: <+artifacts.primary.image>
# dockercfg: <+artifacts.primary.imagePullSecret>

createNamespace: true
namespace: <+infra.namespace>

serviceType: LoadBalancer

servicePort: 80
serviceTargetPort: 80

env:
  config:
    key1: value10
  secrets:
    key2: value2
```

</details>

You can set variable values as runtime inputs and then provide their values when the pipeline is run.

For more information on runtime inputs and expressions, go to [Fixed values runtime inputs and expressions](../../../platform/variables-and-expressions/runtime-inputs/).

#### Harness pipeline, stage, service, and built-in variables

You can use pipeline, stage, service, environment, and Harness built-in variables in your values YAML files and service settings.

See [Built-in Harness variables reference](../../../platform/variables-and-expressions/harness-variables/) or watch this [short video](https://youtu.be/lqbmO6EVGuU).

#### Propagate and override artifacts, manifests, and service variables

You can propagate services between stages and override service settings by using multiple values YAML files and/or **Environment Overrides**.

For more information, go to:

* [Propagating CD services](../../x-platform-cd-features/services/propagate-and-override-cd-services/)
* [Add and override values YAML files](cd-kubernetes-category/add-and-override-values-yaml-files/)

### Next steps

Once you've configured your service, you can move onto the stage's **Environment** settings and define the target Kubernetes cluster and namespace for your deployment.

See [Define your Kubernetes target infrastructure](define-your-kubernetes-target-infrastructure/).
