---
title: Connect to Azure and Artifact Repo for Your Web App Deployments
helpdocs_topic_id: e9k7ngaqiu
helpdocs_category_id: mfdyp6tf0v
helpdocs_is_private: false
helpdocs_is_published: true
description: >-
  Currently, this feature is behind the Feature Flag AZURE_WEBAPP. Contact
  Harness Support to enable the feature. You connect Harness to your Azure
  account to deploy Azure Web Apps. You make the connec…
---

# Connect to Azure and Artifact Repo for Your Web App Deployments

Currently, this feature is behind the Feature Flag `AZURE_WEBAPP`. Contact [Harness Support](https://mail.google.com/mail/?view=cm\&fs=1\&tf=1\&to=support@harness.io) to enable the feature.You connect Harness to your Azure account to deploy Azure Web Apps. You make the connection using a Harness Cloud Provider.

You deploy your Web App using a Docker image or non-containerized artifact. You connect to your image or artifact's repo using a Harness Artifact Server or Cloud Provider (for AWS S3 or Azure ACR).

In this topic:

* [Before You Begin](connect-to-azure-for-web-app-deployments.md#before\_you\_begin)
* [Supported Platforms and Technologies](connect-to-azure-for-web-app-deployments.md#supported\_platforms\_and\_technologies)
* [Review: Azure Connection Options](connect-to-azure-for-web-app-deployments.md#review\_azure\_connection\_options)
* [Step 1: Install a Harness Delegate](connect-to-azure-for-web-app-deployments.md#step\_1\_install\_a\_harness\_delegate)
* [Step 2: Set Up the Azure Cloud Provider](connect-to-azure-for-web-app-deployments.md#step\_2\_set\_up\_the\_azure\_cloud\_provider)
* [Step 3: Set Up the Harness Artifact Server](connect-to-azure-for-web-app-deployments.md#step\_3\_set\_up\_the\_harness\_artifact\_server)
* [Next Steps](connect-to-azure-for-web-app-deployments.md#next\_steps)
* [See Also](connect-to-azure-for-web-app-deployments.md#see\_also)

#### Before You Begin

* [Azure Web App Deployments Overview](azure-web-app-deployments-overview.md)
* [Harness Delegate Overview](../../../firstgen-platform/account/manage-delegates/delegate-installation.md)
* [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md)

#### Supported Platforms and Technologies

See  [Supported Platforms and Technologies](../../../starthere-firstgen/supported-platforms.md).

#### Review: Azure Connection Options

As covered in [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md), you need to install a Harness Delegate in your infrastructure before setting up your Harness deployment.

There are several types of Delegates you can use for an Azure App Service deployment, described in [Delegate Installation Overview](../../../firstgen-platform/account/manage-delegates/delegate-installation-overview.md).

Shell Script, Docker, Kubernetes, and Helm Delegates are all options.

#### Step 1: Install a Harness Delegate

Follow the installation steps for the Harness Delegate you want to install. See [Delegate Installation Overview](../../../firstgen-platform/account/manage-delegates/delegate-installation-overview.md) for the available options.

Make sure this Delegate is in, or can connect to, the resource group for your Azure Web App.

#### Step 2: Set Up the Azure Cloud Provider

A Harness Azure Cloud Provider connects to your Azure subscription using your Client ID and Tenant ID.

Follow the steps in [Add Microsoft Azure Cloud Provider](../../../firstgen-platform/account/manage-connectors/add-microsoft-azure-cloud-provider.md) to connect Harness to Azure.

That's all the setup you need to connect Harness to your account and start your deployment.

If you store the Docker image in Azure Container Registry, then you can use this Azure Cloud Provider you set up and skip the next step.

#### Step 3: Set Up the Harness Artifact Server

If you store the Docker image in Azure Container Registry, then you can use the Azure Cloud Provider you set up and skip the Artifact Server setup.A Harness Azure Web App deployment uses a Docker image or non-containerized artifact. You connect Harness to the same repo you use in your Web App in Azure. You made this connection using a Harness Artifact Server or Cloud Provider.

The Harness Azure Web Application Service type supports the following repos:

* **Docker Registry:** see [Add Docker Registry Artifact Servers](../../../firstgen-platform/account/manage-connectors/add-docker-registry-artifact-servers.md).
* **Artifactory:** see [Add Artifactory Servers](../../../firstgen-platform/account/manage-connectors/add-artifactory-servers.md).
* **Azure Container Registry:** see [Add Microsoft Azure Cloud Provider](../../../firstgen-platform/account/manage-connectors/add-microsoft-azure-cloud-provider.md). You can use the Azure Cloud Provider you set up in the previous step.
* **Amazon S3:** see [Add Amazon Web Services (AWS) Cloud Provider](../../../firstgen-platform/account/manage-connectors/add-amazon-web-services-cloud-provider.md).
* **Jenkins:** see [Add Jenkins Artifact Servers](../../../firstgen-platform/account/manage-connectors/add-jenkins-artifact-servers.md).

For example, here are the Docker Hub settings in an Azure Web App:

Here's the Harness [Docker Registry Artifact Server](../../../firstgen-platform/account/manage-connectors/add-docker-registry-artifact-servers.md):

![](static/connect-to-azure-for-web-app-deployments-22.png)

The above example uses a public repo, and it requires no username or password.

Later, in the Harness Service, you'll add an Artifact Source that uses this Artifact Server and points to the Docker Image Name:

![](static/connect-to-azure-for-web-app-deployments-23.png)

The above example uses a [publicly available Docker image from Harness](https://hub.docker.com/r/harness/todolist-sample/tags?page=1\&ordering=last\_updated). You might want to use that the first time you set up an Azure Web App deployment.### Next Steps

* [Add Your Docker Image for Azure Web App Deployment](add-your-docker-image-for-azure-web-app-deployment.md)
* [Add Non-Containerized Artifacts for Azure Web App Deployment](add-a-non-containerized-artifacts-for-azure-web-app-deployment.md)

#### See Also

* [Run a custom container in Azure](https://docs.microsoft.com/en-us/azure/app-service/quickstart-custom-container?pivots=container-linux) from Azure.
