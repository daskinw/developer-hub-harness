---
title: Cloud Asset Governance Architecture
sidebar_label: Cloud Asset Governance Architecture
description: Cloud Asset Governance Architecture
---

# Cloud Asset Governance Architecture

\<DocImage path={require('./static/Cloud\_Asset\_Governance\_Architecture.png')} width="90%" height="90%" title="Click to view full size image" />

Let's take a simple look at how the Cloud Asset Governance feature works. This feature helps keep things organized in the cloud.

**How It Works:**

* **Worker Microservice**:

&#x20; \- This is like the main worker. It does the main job of making sure rules are followed.

&#x20; \- It uses a tool called Cloud Custodian to do different tasks in the cloud.

* **Logging and Storage**:

&#x20; \- Logs from doing things like enforcing rules are kept safe in a place called Google Cloud Storage (GCS).

&#x20; \- Important data that helps us understand what's happening is stored in BigQuery.

* **Job Queue**:

&#x20; \- Tasks to do are put in a line to keep things organized.

&#x20; \- The worker microservice takes tasks from this line and does them.

**Other Important Services:**

* **CCM Manager**:

&#x20; \- Helps organize and manage different parts of the Cloud Asset Governance feature.

* **Scheduler Service**:

&#x20; \- Makes sure tasks are done on time according to a schedule. This helps keep things running smoothly.

* **MongoDB**:

&#x20; \- Keeps track of important information about rules and what happened when they were enforced.

**How It All Works Together:**

* **Getting Tasks**:

&#x20; \- Tasks related to following rules are put in the line to be done.

* **Doing Tasks**:

&#x20; \- The worker microservice, with the help of Cloud Custodian, does tasks from the line.

* **Following Rules**:

&#x20; \- Cloud Custodian makes sure rules are followed in the cloud.

* **Keeping Track**:

&#x20; \- Logs from doing tasks are kept safe in GCS.

&#x20; \- Important data about what happened is stored in BigQuery for later checking.

* **Managing Information**:

&#x20; \- MongoDB keeps track of important information about rules and what happened when they were enforced.

* **Watching Everything**:

&#x20; \- The CCM Manager makes sure everything works well together.
