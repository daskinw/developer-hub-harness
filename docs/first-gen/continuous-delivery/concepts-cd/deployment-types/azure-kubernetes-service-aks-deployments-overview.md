---
title: Azure Kubernetes Service (AKS) Deployments Overview
helpdocs_topic_id: brwfq82umt
helpdocs_category_id: vbcmo6ltg7
helpdocs_is_private: false
helpdocs_is_published: true
description: A summary of Harness AKS implementation.
---

# Azure Kubernetes Service (AKS) Deployments Overview

This content is for [Harness FirstGen](../../../../continuous-delivery/get-started/upgrading/upgrade-nextgen-cd.md). Switch to [NextGen](../../../../continuous-delivery/deploy-srv-diff-platforms/azure/azure-cd-quickstart.md).

This topic describes the concept of a Harness Azure Kubernetes Service (AKS) deployment by describing the high-level steps involved.

For a vendor-agnostic, Harness Kubernetes deployment, see our [Kubernetes Deployments Overview](kubernetes-overview.md) doc.For a quick tutorial, see the [Kubernetes Quickstart](../../../first-gen-quickstarts/kubernetes-quickstart.md).

For detailed instructions on using AKS in Harness, see the [Azure How-tos](../../../../category/azure-deployments-and-provisioning/).

This guide covers new the **Version 2** features of Harness' Kubernetes implementation for AKS. For Helm deployment features, see [Helm Quickstart](../../../first-gen-quickstarts/helm-quickstart.md).

#### Before You Begin

Before learning about Harness Azure Kubernetes Service (AKS) deployments, you should have an understanding of [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md).

#### What Does Harness Need Before You Start?

A Harness AKS deployment requires the following:

1. Artifact: For example, a Docker image on Azure ACR.
2. Kubernetes cluster: You will need a target cluster for the Harness Delegate, your application, and your Kubernetes workloads. A Kubernetes Delegate requires at least 8GB RAM, and so your cluster should have enough RAM to host the Delegate and your applications and workloads.

#### What Does Harness Deploy?

Harness takes the artifacts and Kubernetes manifests you provide and deploys them to the target AKS cluster. You can simply deploy Kubernetes objects via manifests and you can provide manifests using remote sources and Helm charts.

|                                     |                                             |
| ----------------------------------- | ------------------------------------------- |
| Azure deployment in Harness Manager | The same deployment in Kubernetes Dashboard |
|                                     |                                             |

See [What Can I Deploy in Kubernetes?](../../../firstgen-platform/techref-category/cd-ref/platforms-ref/what-can-i-deploy-in-kubernetes.md).

#### What Does a Harness AKS Deployment Involve?

The following list describes the major steps of a Harness AKS deployment:

|          |                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Step** | **Name**                                                                                                         | **Description and Links**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1        | Install the Harness Kubernetes **Delegate** in your AKS cluster.                                                 | Typically, the Kubernetes Delegate is installed in the target AKS cluster where you will deploy your application(s).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 2        | Add a Harness **Artifact Server** or Harness **Azure Cloud Provider**.                                           | The Harness **Artifact Server** is for artifact servers such as a Docker Registry Artifact Server. Harness connects to the Docker registry where your Docker images are located, or the public Docker Hub.If you want to obtain your artifacts from an ACR container, use an **Azure Cloud Provider**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 3        | Add a **Kubernetes Cluster** **Cloud Provider**.                                                                 | A Cloud Provider is a connection to your Kubernetes cluster.You can add a Kubernetes Cluster Cloud Provider (recommended) or a Cloud Provider for the cloud platform where the cluster is hosted, such as an Azure Cloud Provider. A Kubernetes Cluster Cloud Provider will connect to any cluster on any platform.In you use a Kubernetes Cluster Cloud Provider, you can use the Delegate installed in your cluster for authentication.                                                                                                                                                                                                                                                                                                                                               |
| 4        | Create the Harness **Application** for your AKS CD Pipeline.                                                     | The Harness Application represents a group of microservices/containers, their deployment pipelines, and all the building blocks for those pipelines. Harness represents your release process using a logical group of one or more entities: Services, Environments, Workflows, Pipelines, Triggers, and Infrastructure Provisioners. Applications organize all of the entities and configurations in Harness CD.                                                                                                                                                                                                                                                                                                                                                                        |
| 5        | Create the Harness **Service** using the **Kubernetes** Deployment Type.                                         | Add your Kubernetes manifests and any config variables and files.You can use remote manifests stored in a source repo or Helm charts in a Helm repo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 6        | Create the Harness **Environment** and Infrastructure Definition for your target AKS cluster, and any overrides. | Using the Harness Cloud Provider you set up, you can select the target AKS cluster and namespace for your deployment.You can also override any Service settings, such as manifest values. This enables you to use a single Service with multiple Harness Environments.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 7        | Create the Canary, Blue/Green, or Rollout deployment Harness **Workflow**.                                       | <p>The Workflow deploys the artifact(s) and Kubernetes workloads defined in the Harness Service to the cluster and namespace in the Harness Infrastructure Definition.See <a href="../../azure-deployments/aks-howtos/4-azure-workflows-and-deployments.md">Azure Workflows and Deployments</a>.For additional Workflows, see the vendor-agnostic steps in the following:<br>•  <a href="../../kubernetes-deployments/create-a-kubernetes-canary-deployment.md">Create a Kubernetes Canary Deployment</a><br>•  <a href="../../kubernetes-deployments/create-a-kubernetes-blue-green-deployment.md">Create a Kubernetes Blue/Green Deployment</a><br>•  <a href="../../kubernetes-deployments/create-a-kubernetes-rolling-deployment.md">Create a Kubernetes Rolling Deployment</a></p> |
| 8        | Deploy the Workflow.                                                                                             | <p>Once you've deployed a Workflow, learn how to improve your AKS CD:<br>•  <a href="../../model-cd-pipeline/workflows/workflow-configuration.md">Workflows</a><br>•  <a href="../../model-cd-pipeline/triggers/add-a-trigger-2.md">Triggers</a><br>•  <a href="../../model-cd-pipeline/infrastructure-provisioner/add-an-infra-provisioner.md">Infrastructure Provisioners Overview</a></p>                                                                                                                                                                                                                                                                                                                                                                                            |

#### Next Steps

Read the following topics to build on what you've learned:

* [Azure (AKS) How-tos](../../../../category/azure-deployments-and-provisioning/)
* [Kubernetes Quickstart](../../../first-gen-quickstarts/kubernetes-quickstart.md)
