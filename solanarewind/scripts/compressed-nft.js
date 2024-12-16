import { publicKey } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';

const umi = createUmi('https://mainnet.helius-rpc.com/?api-key=fb5ef076-69e7-4d96-82d8-2237c13aef7a').use(dasApi());
const owner = publicKey('4iG4s2F3eSByCkMvfsGhrvzXNoPrDFUJuA7Crtuf3Pvn');

const assets = await umi.rpc.getAssetsByOwner({
    owner,
});
console.log(assets.items.length);
// console.log(assets)
console.log(assets.items[0])
