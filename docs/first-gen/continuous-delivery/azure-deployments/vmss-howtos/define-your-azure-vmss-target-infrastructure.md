---
title: Define Your Azure VMSS Target Infrastructure
helpdocs_topic_id: 2976rmk4kd
helpdocs_category_id: 4o8zim2tfr
helpdocs_is_private: false
helpdocs_is_published: true
description: >-
  Currently, this feature is behind the Feature Flag AZURE_VMSS. Contact Harness
  Support to enable the feature.. The target infrastructure for an Azure virtual
  machine scale set (VMSS) deployment is a…
---

# Define Your Azure VMSS Target Infrastructure

Currently, this feature is behind the Feature Flag `AZURE_VMSS`. Contact [Harness Support](https://mail.google.com/mail/?view=cm\&fs=1\&tf=1\&to=support@harness.io) to enable the feature. The target infrastructure for an Azure virtual machine scale set (VMSS) deployment is a base VMSS template you select in the Harness Infrastructure Definition.

During deployment, this template is used along with the image definition you selected in [Add Your Azure VM Image for Deployment](add-your-azure-vm-image-for-deployment.md) to create a new VMSS.

You select the VMSS to use as a template and provide the username and password/key to connect to the new VMs.

Once you have set up the target infrastructure, you select it when you set up your Harness Workflow, described in [Create an Azure VMSS Basic Deployment](create-an-azure-vmss-basic-deployment.md), [Create an Azure VMSS Canary Deployment](create-an-azure-vmss-canary-deployment.md), and [Create an Azure VMSS Blue/Green Deployment](create-an-azure-vmss-blue-green-deployment.md).

.

In this topic:

* [Before You Begin](define-your-azure-vmss-target-infrastructure.md#before\_you\_begin)
* [Supported Platforms and Technologies](define-your-azure-vmss-target-infrastructure.md#undefined)
* [Step 1: Create an Environment](define-your-azure-vmss-target-infrastructure.md#undefined)
* [Step 2: Create an Infrastructure Definition](define-your-azure-vmss-target-infrastructure.md#step\_2\_create\_an\_infrastructure\_definition)
* [Option 1: Scope to Specific Services](define-your-azure-vmss-target-infrastructure.md#option\_1\_scope\_to\_specific\_services)
* [Next Steps](define-your-azure-vmss-target-infrastructure.md#next\_steps)
* [Configure As Code](define-your-azure-vmss-target-infrastructure.md#configure\_as\_code)

#### Before You Begin

* [Azure Virtual Machine Scale Set Deployments Overview](azure-virtual-machine-scale-set-deployments.md)
* [Add Your Azure VM Image for Deployment](add-your-azure-vm-image-for-deployment.md)
* [Connect to Azure for VMSS Deployments](connect-to-your-azure-vmss.md)
* [Harness Delegate Overview](../../../firstgen-platform/account/manage-delegates/delegate-installation.md)
* [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md)

#### Supported Platforms and Technologies

See [Supported Platforms and Technologies](../../../starthere-firstgen/supported-platforms.md).

#### Step 1: Create an Environment

Environments represent one or more of your deployment infrastructures, such as Dev, QA, Stage, Production, etc. Use Environments to organize your target cluster Infrastructure Definitions.

1. In your Harness Application, click **Environments**. The **Environments** page appears.
2. Click Add Environment. The **Environment** settings appear.
3. In **Name**, enter a name that describes this group of target clusters, such as QA, Stage, Prod, etc.
4. In **Environment Type**, select **Non-Production** or **Production**.
5. Click **SUBMIT**. The new **Environment** page appears.
6. Click  **Add Infrastructure Definition**. The following section provide information on setting up different Add Infrastructure Definitions for different target clusters.

#### Step 2: Create an Infrastructure Definition

1. In your Environment, click Add Infrastructure Definition.
2. Enter the following settings.

**Name**

Enter a name for the Infrastructure Definition. You will select this name when you set up the Infrastructure Definition in your Workflow.

**Cloud Provider Type**

Select **Microsoft Azure**.

**Deployment Type**

Select **Azure Virtual Machine Scale Set**.

**Cloud Provider**

Select the Azure Cloud Provider you set up in [Connect to Your Azure VMSS](connect-to-your-azure-vmss.md). The Cloud Provider is used to pull the Azure information you need to define the VMSS Harness will create.

**Subscription**

Select the subscription to use for the new VMSS.

**Resource Group**

Select the resource group to use for the new VMSS.

**Virtual Machine Scale Sets**

Select the base VMSS to use as a template when the Harness Workflow creates a new VMSS using the image definition you selected in [Add Your Azure VM Image for Deployment](add-your-azure-vm-image-for-deployment.md).

**Username**

This is the username for connecting to the new VMs Harness will create. For example, connections over SSH or RDP. The **Username** setting is populated using the username taken from the base VMSS you selected. You can use the same username or replace it.

The username may contain letters, numbers, hyphens, and underscores. It may not start with a hyphen or number. Usernames must not include [reserved words](https://docs.microsoft.com/en-us/rest/api/compute/virtualmachines/createorupdate#osprofile). The value must be between 1 and 64 characters long (Linux) or 20 characters (Windows).

**Authentication Type**

Select **Password** or **SSH Public Key**.

For **Password**, enter the password for the new VMs Harness will create.

For **SSH Public Key**, select an SSH key that you have added to Harness. See [Add SSH Keys](../../../firstgen-platform/security/secrets-management/add-ssh-keys.md).

Creating the SSH key in Azure is covered in [Quick steps: Create and use an SSH public-private key pair for Linux VMs in Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys) from Azure.

#### Option 1: Scope to Specific Services

The **Scope to specific Services** setting in the Infrastructure Definition enables you to scope this Infrastructure Definition to specific Harness Services.

See [Add an Infrastructure Definition](../../model-cd-pipeline/environments/infrastructure-definitions.md).

#### Next Steps

* [Create an Azure VMSS Basic Deployment](create-an-azure-vmss-basic-deployment.md)
* [Create an Azure VMSS Canary Deployment](create-an-azure-vmss-canary-deployment.md)
* [Create an Azure VMSS Blue/Green Deployment](create-an-azure-vmss-blue-green-deployment.md)

#### Configure As Code

To see how to configure the settings in this topic using YAML, configure the settings in the UI first, and then click the **YAML** editor button.
