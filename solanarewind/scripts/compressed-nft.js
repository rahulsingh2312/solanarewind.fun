import { publicKey } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';

const umi = createUmi(process.env.NEXT_PUBLIC_HELIUS).use(dasApi());
const owner = publicKey('4iG4s2F3eSByCkMvfsGhrvzXNoPrDFUJuA7Crtuf3Pvn');

const assets = await umi.rpc.getAssetsByOwner({
    owner,
});
console.log(assets.items.length);
// console.log(assets)
console.log(assets.items[0])
