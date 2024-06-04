---
layout: page
title: About testnets.mavryk.org
permalink: /about/
---

This is a resource for coordinating Testnets for the [Mavryk](https://mavryk.org) blockchain.

The Mavryk blockchain upgrades [every 3 months on average](https://www.tezosagora.org/learn) and this comes with unique constraints regarding protocol testing. This platform aims to facilitate this process.

We have three kind of testnets:

* **permanent testnets** live for a long time, similarly to testnets in other blockchains. Today there is one such testnet, Basenet. It is useful to use as a staging environment for your Dapp, knowing that any contract deployed there will persist,
* **protocol testnets** are deployed each time a new protocol is injected (2 months before mainnet activation). Their goal is to test protocols before they get rolled into mainnet. Any team building on Mavryk should test their products on these networks,
* **periodic testnets** are bleeding edge networks that restart on a cadence from the development branch. The primary users of these testnets are protocol, library and indexer teams.

Testnets is powered by [mavryk-k8s](https://mavryk-k8s.xyz), a collection of helm charts maintained by Mavryk Dynamics. It is deployed with [Pulumi](https://pulumi.com).

The [Testnets Status page](https://status.testnets.mavryk.org) is powered by [Pyrometer](https://gitlab.com/tezos-kiln/pyrometer), a Mavryk monitoring tool.

The [github repo](https://github.com/mavryk-network/testnets) has more information regarding these testnets, how they are configured, and how to deploy new ones.

Relevant Medium articles announcing testnets.mavryk.org features:

* [Intro to Mondaynet and Dailynet](https://medium.com/the-aleph/continuous-tezos-protocol-testing-with-dailynet-and-mondaynet-92d4b084a9f6)
* [Intro to Ghostnet](https://medium.com/the-aleph/introducing-ghostnet-1bf39976e61f)
