---
title: Add a prerequisite to a flag
tags:
  - feature flag
  - prerequisites
sidebar_position: 70
helpdocs_topic_id: iijdahygdm
helpdocs_category_id: jqfkw27d3u
helpdocs_is_private: false
helpdocs_is_published: true
description: >-
  This topic describes how to use feature flag prerequisites to enable or
  disable features based on different flag states.
---

# Add a prerequisite to a flag

import pre\_req\_1 from './static/3-add-prerequisites-to-feature-flag-02.png' import pre\_req\_2 from './static/3-add-prerequisites-to-feature-flag-03.png'

A Prerequisite is a Feature Flag that you add as a dependency to another Feature Flag. That dependency must be met before that second Feature Flag can be toggled `ON` or `OFF`. For example, if you have a flag that allows users to write Java, the user must be able to read the Java first. Therefore, you add a Prerequisite to the `Write_Java` flag that says the `Read_Java` flag must be enabled before the `Write_Java` flag can be toggled on.&#x20;

:::info At present, Harness currently _does not_ support nested prerequities as this functionality is not currently supported. :::

#### Add a Prerequisite

1. Go to the Feature Flag you want to add the Prerequisite to.
2.  Select **+ New Prerequisite**.

    ![A screenshot of the Write\_Java Flag with the Prerequisites button highlighted.](static/3-add-prerequisites-to-feature-flag-02.png)
3. In **Add Prerequisites**, click **+ Prerequisites**.
4. In the first drop-down menu, select the flag you want to use as a Prerequisite.
5.  In the second drop-down, select which Variation of the Prerequisite flag must be served before the Feature Flag can be turned on.

    For the example below, the `Read_Java` flag must be set to `True` before this flag can be enabled.
6.  Select **Save**. The Prerequisite flag is listed on the Feature Flag page and must be met before you can turn on the Feature Flag.

    !["A screenshot of the Prerequisite flag added to the Write\_Java flag.](static/3-add-prerequisites-to-feature-flag-03.png)
