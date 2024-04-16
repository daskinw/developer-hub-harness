---
title: Metasploit scanner reference for STO
sidebar_label: Metasploit scanner reference
sidebar_position: 230
description: Scan application instances with Metasploit.
---

# Metasploit scanner reference for STO

You can scan your application instances and ingest results from Metasploit.

### For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/\_more-information.md';

### Security step settings for Metasploit scans in STO

#### Target and variant

import StoLegacyTargetAndVariant from './shared/legacy/\_sto-ref-legacy-target-and-variant.md';

#### Metasploit scan settings

* `product_name` = `metasploit`
* [`scan_type`](security-step-settings-reference/#scanner-categories) = `instance`
* [`policy_type`](security-step-settings-reference/#data-ingestion-methods) = `orchestratedScan` or `ingestionOnly`
* `product_config_name`
  * `metasploit-weak-ssh`     Brute-force test a host for SSH weak ssh/pass
  * `metasploit-openssl-heartbleed`     Check HTTPS (443) for Heartbleed vulnerability
  * `dynamic-by-cve`     Finds and applies Metaspoit module by CVE
* `fail_on_severity` - See [Fail on Severity](metasploit-scanner-reference.md#fail-on-severity).

#### Instance scan settings

import StoLegacyInstance from './shared/legacy/\_sto-ref-legacy-instance.md';

#### Ingestion file

import StoLegacyIngest from './shared/legacy/\_sto-ref-legacy-ingest.md';

#### Fail on Severity

import StoSettingFailOnSeverity from './shared/step\_palette/all/\_fail-on-severity.md';
