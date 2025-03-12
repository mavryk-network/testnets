---
layout: page
title: Basenet
permalink: /basenet-about
---

Basenet is the long-running testnet for Mavryk.

| | |
|-------|---------------------|
| Public RPC endpoints | [https://atlasnet.rpc.mavryk.network](https://atlasnet.rpc.mavryk.network/chains/main/chain_id)<br/> |
| Faucet | [Basenet faucet](https://atlasnet.faucet.mavryk.network) |
| Full network name | `MAVRYK_ATLASNET_2024-02-23T10:39:51Z` |
| Mavryk docker build | mavrykdynamics/mavryk:mavkit-v20.3-rc1 |
| Activated on | 2024-02-23T10:39:51Z |
| Block Explorers | [Nexus](https://nexus.mavryk.org) |




### Install the software

⚠️  If you already have an existing Mavryk installation, do not forget to backup and delete your `~/.mavryk-node` and `~/.mavryk-client`.



#### Alternative: Use docker

To join Basenet with docker, open a shell in the container:

```
docker run -it --entrypoint=/bin/sh mavrykdynamics/mavryk:mavkit-v20.3-rc1
```

#### Alternative: Build the software

⚠️  If this is your first time installing Mavryk, you may need to [install a few dependencies](https://mavryk.gitlab.io/introduction/howtoget.html#setting-up-the-development-environment-from-scratch).

```
cd
git clone git@gitlab.com:mavryk-network/mavryk-protocol.git
cd mavryk-protocol
git checkout b1e1def27039b8cede461b6614af1addefbd69da
opam init # if this is your first time using OPAM
make build-deps
eval $(opam env)
make
export PATH=$HOME/mavryk-protocol:$PATH
```

### Join the Basenet network

Run the following commands:

```
mavkit-node config init --network https://testnets.mavryk.network/basenet

mavkit-node run --rpc-addr 127.0.0.1:8732
```






### Bake on the Basenet network

To improve reliability of the chain, you can take part in the consensus by becoming a baker. In that case, you will need some test tokens from the [faucet](https://atlasnet.faucet.mavryk.network).

If you are not a bootstrap baker, you need to register your key as a delegate using your alias or `pkh`. For instance:
```bash=2
mavkit-client register key mykey as delegate
```

You may now launch the baker process.
```bash=3
mavkit-baker-PtAtLas run with local node ~/.mavryk-node mykey --liquidity-baking-toggle-vote pass
```

You may run the accuser as well:
```bash=3
mavkit-accuser-PtAtLas run
```

Note that you need a minimum amount of tez to get baking rights. If you are not a bootstrap baker, it will take you several cycles to start baking.

> 💡 Now that you are baking, you are responsible for the network health. Please ensure that the baking processes will keep running in the background. You may want to use screen, tmux, nohup or systemd. Also make sure that the baking processes will restart when your machine restarts.


