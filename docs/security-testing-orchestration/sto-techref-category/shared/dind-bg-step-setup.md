# dind-bg-step-setup

<details>

<summary>Set up a Docker-in-Docker background step</summary>

1. Go to the stage where you want to run the scan.
2. In **Overview**, add the shared path `/var/run`.
3. In **Execution**, do the following:
   1. Click **Add Step** and then choose **Background**.
   2.  Configure the Background step as follows:

       1. Dependency Name = `dind`
       2. Container Registry = The Docker connector to download the DinD image. If you don't have one defined, go to [Docker connector settings reference](../../../platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference/).
       3. Image = `docker:dind`
       4.  Under **Entry Point**, add the following: `dockerd`

           In most cases, using `dockerd` is a faster and more secure way to set up the background step. For more information, go to the **TLS** section in the [Docker quick reference](https://hub.docker.com/\_/docker).

       If the DinD service doesn't start with `dockerd`, clear the **Entry Point** field and then run the pipeline again. This starts the service with the default [entry point](https://docs.docker.com/engine/reference/run/#entrypoint-default-command-to-execute-at-runtime).

       5. Under **Optional Configuration**, select the **Privileged** checkbox.

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

import set\_up\_harness\_25 from '/docs/security-testing-orchestration/get-started/static/set-up-harness-for-sto-25.png'

![Configure the background step](%7Bset\_up\_harness\_25%7D)

Add a Background step to your pipeline and set it up as follows:

```yaml
- step:
   type: Background
   name: background-dind-service
   identifier: Background_1
   spec:
      connectorRef: CONTAINER_IMAGE_REGISTRY_CONNECTOR
      image: docker:dind
      shell: Sh
      entrypoint:
         - dockerd
      privileged: true
```

</details>
