---
title: Connect to Azure for VMSS Deployments
helpdocs_topic_id: d5hob1zuip
helpdocs_category_id: 4o8zim2tfr
helpdocs_is_private: false
helpdocs_is_published: true
description: >-
  Currently, this feature is behind the Feature Flag AZURE_VMSS. Contact Harness
  Support to enable the feature.. You connect Harness to your Azure account to
  deploy virtual machine scale sets using a H…
---

# Connect to Azure for VMSS Deployments

Currently, this feature is behind the Feature Flag `AZURE_VMSS`. Contact [Harness Support](https://mail.google.com/mail/?view=cm\&fs=1\&tf=1\&to=support@harness.io) to enable the feature. You connect Harness to your Azure account to deploy [virtual machine scale sets](https://docs.microsoft.com/en-us/azure/virtual-machine-scale-sets/overview) using a Harness Azure Cloud Provider.

In this topic:

* [Before You Begin](connect-to-your-azure-vmss.md#before\_you\_begin)
* [Supported Platforms and Technologies](connect-to-your-azure-vmss.md#undefined)
* [Review: Azure Connection Options](connect-to-your-azure-vmss.md#review\_azure\_connection\_options)
* [Step 1: Install a Harness Delegate](connect-to-your-azure-vmss.md#step\_1\_install\_a\_harness\_delegate)
* [Step 2: Set Up the Azure Cloud Provider](connect-to-your-azure-vmss.md#step\_2\_set\_up\_the\_azure\_cloud\_provider)
* [Next Steps](connect-to-your-azure-vmss.md#next\_steps)

#### Before You Begin

* [Azure Virtual Machine Scale Set Deployments Overview](azure-virtual-machine-scale-set-deployments.md)
* [Harness Delegate Overview](../../../firstgen-platform/account/manage-delegates/delegate-installation.md)
* [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md)

#### Supported Platforms and Technologies

See  [Supported Platforms and Technologies](../../../starthere-firstgen/supported-platforms.md).

#### Review: Azure Connection Options

As covered in [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md), you need to install a Harness Delegate in your target infrastructure before setting up your Harness deployment.

There are several types of Delegates you can use for a virtual machine scale set deployment, described in [Delegate Installation Overview](../../../firstgen-platform/account/manage-delegates/delegate-installation-overview.md).

Shell Script, Docker, Kubernetes, and Helm Delegates are all options.

The simplest option for most users is to install the Harness Shell Script Delegate on a VM in the same resource group, virtual network, and subnet where your virtual machine scale set will be deployed.

#### Step 1: Install a Harness Delegate

Follow the installation steps for the Harness Delegate you want to install. See [Delegate Installation Overview](../../../firstgen-platform/account/manage-delegates/delegate-installation-overview.md) for the available options.

Ensure this Delegate is in or can connect to the resource group, virtual network, and subnet where your virtual machine scale set will be deployed.

#### Step 2: Set Up the Azure Cloud Provider

A Harness Azure Cloud Provider connects to your Azure using your Client ID and Tenant ID.

Follow the steps in [Add Microsoft Azure Cloud Provider](../../../firstgen-platform/account/manage-connectors/add-microsoft-azure-cloud-provider.md) to connect Harness to Azure.

That's all the setup you need to connect Harness to your account and start your virtual machine scale set deployment.

A virtual machine scale set deployment uses an Azure Shared Image Gallery and image. Access to those resources use the same Azure Cloud Provider.

#### Next Steps

* [Add Your Azure VM Image for Deployment](add-your-azure-vm-image-for-deployment.md)

#### See Also

See the following docs from Azure:

* [Troubleshooting shared image galleries in Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/troubleshooting-shared-images)
* [Shared Image Gallery overview](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/shared-image-galleries)
* [Azure virtual machine scale sets FAQs](https://docs.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-faq)
