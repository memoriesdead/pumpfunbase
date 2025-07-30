import { NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{ symbol: string }>
}

// Top 50 Popular Crypto Data - same as tokens API
const TOP_50_POPULAR_CRYPTO_DATA = [
  {
    id: 1, rank: 1, name: 'Bitcoin', symbol: 'BTC',
    basePrice: 96500.00, marketCap: 1900000000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png',
    description: 'Bitcoin is the first successful internet money based on peer-to-peer technology.',
    website: 'https://bitcoin.org',
    whitepaper: 'https://bitcoin.org/bitcoin.pdf'
  },
  {
    id: 2, rank: 2, name: 'Ethereum', symbol: 'ETH',
    basePrice: 3750.00, marketCap: 450000000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
    description: 'Ethereum is a decentralized platform for smart contracts and decentralized applications.',
    website: 'https://ethereum.org',
    whitepaper: 'https://ethereum.org/en/whitepaper/'
  },
  {
    id: 3, rank: 3, name: 'XRP', symbol: 'XRP',
    basePrice: 2.45, marketCap: 140000000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    description: 'XRP is a digital currency built for payments, with fast and low-cost transactions.',
    website: 'https://xrpl.org',
    whitepaper: 'https://xrpl.org/docs.html'
  },
  {
    id: 4, rank: 4, name: 'Tether', symbol: 'USDT',
    basePrice: 1.00, marketCap: 125000000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png',
    description: 'Tether is a stablecoin pegged to the US Dollar, providing stability in the crypto market.',
    website: 'https://tether.to',
    whitepaper: 'https://assets.ctfassets.net/vyse88cgwfbl/5UWgHMvz071t2Cq5yTw5vi/c9798ea8db99311bf90ebe96d8bfcd79/TetherWhitePaper.pdf'
  },
  {
    id: 5, rank: 5, name: 'Solana', symbol: 'SOL',
    basePrice: 234.56, marketCap: 113000000000,
    chainId: 101, chainName: 'Solana', chainSymbol: 'SOL',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    description: 'Solana is a high-performance blockchain supporting builders around the world creating crypto apps.',
    website: 'https://solana.com',
    whitepaper: 'https://solana.com/solana-whitepaper.pdf'
  },
  {
    id: 6, rank: 6, name: 'BNB', symbol: 'BNB',
    basePrice: 705.24, marketCap: 103000000000,
    chainId: 56, chainName: 'BNB Chain', chainSymbol: 'BNB',
    logo: 'https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png',
    description: 'BNB is the native token of BNB Chain, used for trading fees and ecosystem participation.',
    website: 'https://www.binance.com',
    whitepaper: 'https://www.binance.com/en/blog/ecosystem/binance-chain-blockchain-for-exchanging-the-world-304219301536473088'
  },
  {
    id: 7, rank: 7, name: 'USD Coin', symbol: 'USDC',
    basePrice: 1.00, marketCap: 85000000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0xa0b86a33e6c1f03ce4d1e0fb93e90b4f4f8ad2f8.png',
    description: 'USD Coin is a fully collateralized US dollar stablecoin.',
    website: 'https://www.centre.io',
    whitepaper: 'https://f.hubspotusercontent30.net/hubfs/9304636/PDF/centre-whitepaper.pdf'
  },
  {
    id: 8, rank: 8, name: 'Dogecoin', symbol: 'DOGE',
    basePrice: 0.385, marketCap: 56000000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    description: 'Dogecoin is a cryptocurrency based on the popular "Doge" Internet meme.',
    website: 'https://dogecoin.com',
    whitepaper: 'https://github.com/dogecoin/dogecoin'
  },
  {
    id: 9, rank: 9, name: 'Cardano', symbol: 'ADA',
    basePrice: 1.14, marketCap: 39000000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    description: 'Cardano is a blockchain platform for changemakers, innovators, and visionaries.',
    website: 'https://cardano.org',
    whitepaper: 'https://docs.cardano.org/learn/cardano-whitepaper'
  },
  {
    id: 10, rank: 10, name: 'Avalanche', symbol: 'AVAX',
    basePrice: 44.94, marketCap: 17000000000,
    chainId: 43114, chainName: 'Avalanche', chainSymbol: 'AVAX',
    logo: 'https://assets.coingecko.com/coins/images/12559/large/avalanche-avax-logo.png',
    description: 'Avalanche is a high-throughput smart contract platform.',
    website: 'https://www.avax.network',
    whitepaper: 'https://assets.website-files.com/5d80307810123f5ffbb34d6e/6008d7bbf8b10d1eb01e7e16_Avalanche%20Platform%20Whitepaper.pdf'
  },
  {
    id: 11, rank: 11, name: 'Chainlink', symbol: 'LINK',
    basePrice: 28.75, marketCap: 17000000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
    description: 'Chainlink is a decentralized oracle network that connects smart contracts with real-world data.',
    website: 'https://chain.link',
    whitepaper: 'https://link.smartcontract.com/whitepaper'
  },
  {
    id: 12, rank: 12, name: 'Stellar', symbol: 'XLM',
    basePrice: 0.44, marketCap: 13000000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/100/large/stellar_lumens.png',
    description: 'Stellar is an open network for storing and moving money.',
    website: 'https://www.stellar.org',
    whitepaper: 'https://www.stellar.org/papers/stellar-consensus-protocol'
  },
  {
    id: 13, rank: 13, name: 'Polkadot', symbol: 'DOT',
    basePrice: 8.51, marketCap: 12000000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
    description: 'Polkadot enables cross-blockchain transfers of any type of data or asset.',
    website: 'https://polkadot.network',
    whitepaper: 'https://polkadot.network/PolkaDotPaper.pdf'
  },
  {
    id: 14, rank: 14, name: 'Uniswap', symbol: 'UNI',
    basePrice: 14.68, marketCap: 10900000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png',
    description: 'Uniswap is a decentralized trading protocol on Ethereum.',
    website: 'https://uniswap.org',
    whitepaper: 'https://hackmd.io/@HaydenAdams/HJ9jLsfTz'
  },
  {
    id: 15, rank: 15, name: 'Litecoin', symbol: 'LTC',
    basePrice: 108.92, marketCap: 8100000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png',
    description: 'Litecoin is a peer-to-peer Internet currency that enables instant payments.',
    website: 'https://litecoin.org',
    whitepaper: 'https://litecoin.org'
  },
  {
    id: 16, rank: 16, name: 'Polygon', symbol: 'MATIC',
    basePrice: 0.53, marketCap: 5300000000,
    chainId: 137, chainName: 'Polygon', chainSymbol: 'MATIC',
    logo: 'https://wallet-asset.matic.network/img/tokens/matic.svg',
    description: 'Polygon is a decentralized platform that provides faster and cheaper transactions on Ethereum.',
    website: 'https://polygon.technology',
    whitepaper: 'https://polygon.technology/papers/'
  },
  {
    id: 17, rank: 17, name: 'Internet Computer', symbol: 'ICP',
    basePrice: 11.05, marketCap: 5100000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/14495/large/internet-computer-icp-logo.png',
    description: 'Internet Computer is a blockchain that runs at web speed with unbounded capacity.',
    website: 'https://dfinity.org',
    whitepaper: 'https://dfinity.org/whitepaper.pdf'
  },
  {
    id: 18, rank: 18, name: 'Aave', symbol: 'AAVE',
    basePrice: 351.84, marketCap: 5300000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png',
    description: 'Aave is an open-source and non-custodial liquidity protocol.',
    website: 'https://aave.com',
    whitepaper: 'https://github.com/aave/aave-protocol/blob/master/docs/Aave_Protocol_Whitepaper_v1_0.pdf'
  },
  {
    id: 19, rank: 19, name: 'Ethereum Classic', symbol: 'ETC',
    basePrice: 32.14, marketCap: 4750000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png',
    description: 'Ethereum Classic is the original Ethereum blockchain.',
    website: 'https://ethereumclassic.org',
    whitepaper: 'https://ethereumclassic.org/blog/2016-12-06-classic/'
  },
  {
    id: 20, rank: 20, name: 'Filecoin', symbol: 'FIL',
    basePrice: 6.7, marketCap: 4150000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/12817/large/filecoin.png',
    description: 'Filecoin is a decentralized storage network designed to store important information.',
    website: 'https://filecoin.io',
    whitepaper: 'https://filecoin.io/filecoin.pdf'
  },
  {
    id: 21, rank: 21, name: 'VeChain', symbol: 'VET',
    basePrice: 0.051, marketCap: 3700000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/1167/large/VET_Token_Icon.png',
    description: 'VeChain is a blockchain platform designed to enhance supply chain management.',
    website: 'https://www.vechain.org',
    whitepaper: 'https://www.vechain.org/whitepaper/'
  },
  {
    id: 22, rank: 22, name: 'Monero', symbol: 'XMR',
    basePrice: 197.66, marketCap: 3580000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/69/large/monero_logo.png',
    description: 'Monero is a private, secure, and untraceable cryptocurrency.',
    website: 'https://www.getmonero.org',
    whitepaper: 'https://cryptonote.org/whitepaper.pdf'
  },
  {
    id: 23, rank: 23, name: 'Cosmos', symbol: 'ATOM',
    basePrice: 7.84, marketCap: 3080000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png',
    description: 'Cosmos is an ecosystem of connected blockchains.',
    website: 'https://cosmos.network',
    whitepaper: 'https://cosmos.network/resources/whitepaper'
  },
  {
    id: 24, rank: 24, name: 'Maker', symbol: 'MKR',
    basePrice: 1660.15, marketCap: 1480000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2.png',
    description: 'Maker is a decentralized autonomous organization on Ethereum.',
    website: 'https://makerdao.com',
    whitepaper: 'https://makerdao.com/en/whitepaper/'
  },
  {
    id: 25, rank: 25, name: 'Marinade Staked SOL', symbol: 'mSOL',
    basePrice: 259.46, marketCap: 1215000000,
    chainId: 101, chainName: 'Solana', chainSymbol: 'SOL',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png',
    description: 'Marinade Staked SOL represents staked SOL tokens on the Marinade protocol.',
    website: 'https://marinade.finance',
    whitepaper: 'https://docs.marinade.finance'
  },
  {
    id: 26, rank: 26, name: 'Decentraland', symbol: 'MANA',
    basePrice: 0.57, marketCap: 1209000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0x0f5d2fb29fb7d3cfee444a200298f468908cc942.png',
    description: 'Decentraland is a virtual reality platform powered by the Ethereum blockchain.',
    website: 'https://decentraland.org',
    whitepaper: 'https://decentraland.org/whitepaper.pdf'
  },
  {
    id: 27, rank: 27, name: 'Synthetix', symbol: 'SNX',
    basePrice: 3.49, marketCap: 1112000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f.png',
    description: 'Synthetix is a decentralized synthetic asset platform.',
    website: 'https://synthetix.io',
    whitepaper: 'https://docs.synthetix.io/litepaper/'
  },
  {
    id: 28, rank: 28, name: 'The Sandbox', symbol: 'SAND',
    basePrice: 0.46, marketCap: 1105000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0x3845badade8e6dff049820680d1f14bd3903a5d0.png',
    description: 'The Sandbox is a virtual gaming world where players can build and monetize experiences.',
    website: 'https://www.sandbox.game',
    whitepaper: 'https://installers.sandbox.game/The_Sandbox_Whitepaper_2020.pdf'
  },
  {
    id: 29, rank: 29, name: 'Raydium', symbol: 'RAY',
    basePrice: 2.3, marketCap: 874000000,
    chainId: 101, chainName: 'Solana', chainSymbol: 'SOL',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png',
    description: 'Raydium is an automated market maker (AMM) built on the Solana blockchain.',
    website: 'https://raydium.io',
    whitepaper: 'https://raydium.gitbook.io/raydium/'
  },
  {
    id: 30, rank: 30, name: 'Compound', symbol: 'COMP',
    basePrice: 91.15, marketCap: 906000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0xc00e94cb662c3520282e6f5717214004a7f26888.png',
    description: 'Compound is an algorithmic, autonomous interest rate protocol.',
    website: 'https://compound.finance',
    whitepaper: 'https://compound.finance/documents/Compound.Whitepaper.pdf'
  },
  {
    id: 31, rank: 31, name: 'Curve DAO Token', symbol: 'CRV',
    basePrice: 0.79, marketCap: 902000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0xd533a949740bb3306d119cc777fa900ba034cd52.png',
    description: 'Curve is a decentralized exchange optimized for stablecoin trading.',
    website: 'https://curve.fi',
    whitepaper: 'https://curve.fi/whitepaper'
  },
  {
    id: 32, rank: 32, name: 'PancakeSwap', symbol: 'CAKE',
    basePrice: 2.39, marketCap: 804000000,
    chainId: 56, chainName: 'BNB Chain', chainSymbol: 'BNB',
    logo: 'https://tokens.1inch.io/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82.png',
    description: 'PancakeSwap is a decentralized exchange native to BNB Chain.',
    website: 'https://pancakeswap.finance',
    whitepaper: 'https://docs.pancakeswap.finance/'
  },
  {
    id: 33, rank: 33, name: '0x', symbol: 'ZRX',
    basePrice: 0.57, marketCap: 567000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0xe41d2489571d322189246dafa5ebde1f4699f498.png',
    description: '0x is an open protocol that enables the peer-to-peer exchange of assets on Ethereum.',
    website: 'https://0x.org',
    whitepaper: 'https://0x.org/pdfs/0x_white_paper.pdf'
  },
  {
    id: 34, rank: 34, name: 'Basic Attention Token', symbol: 'BAT',
    basePrice: 0.28, marketCap: 425000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0x0d8775f648430679a709e98d2b0cb6250d2887ef.png',
    description: 'Basic Attention Token radically improves the efficiency of digital advertising.',
    website: 'https://basicattentiontoken.org',
    whitepaper: 'https://basicattentiontoken.org/BasicAttentionTokenWhitePaper-4.pdf'
  },
  {
    id: 35, rank: 35, name: 'Orca', symbol: 'ORCA',
    basePrice: 3.8, marketCap: 380000000,
    chainId: 101, chainName: 'Solana', chainSymbol: 'SOL',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png',
    description: 'Orca is a user-friendly DEX built on Solana blockchain.',
    website: 'https://www.orca.so',
    whitepaper: 'https://orcaprotocol.gitbook.io/orca/'
  },
  {
    id: 36, rank: 36, name: 'Enjin Coin', symbol: 'ENJ',
    basePrice: 0.35, marketCap: 349000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c.png',
    description: 'Enjin Coin is a cryptocurrency for virtual goods created by Enjin.',
    website: 'https://enjin.io',
    whitepaper: 'https://cdn.enjin.io/downloads/whitepapers/enjin-coin/en.pdf'
  },
  {
    id: 37, rank: 37, name: 'Yearn Finance', symbol: 'YFI',
    basePrice: 8957.85, marketCap: 327000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e.png',
    description: 'Yearn Finance is a suite of products in DeFi that provides yield generation.',
    website: 'https://yearn.finance',
    whitepaper: 'https://docs.yearn.finance'
  },
  {
    id: 38, rank: 38, name: 'Loopring', symbol: 'LRC',
    basePrice: 0.23, marketCap: 310000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0xbbbbca6a901c926f240b89eacb641d8aec7aeafd.png',
    description: 'Loopring is a zkRollup DEX & payment protocol.',
    website: 'https://loopring.org',
    whitepaper: 'https://loopring.org/resources/en_whitepaper.pdf'
  },
  {
    id: 39, rank: 39, name: 'Balancer', symbol: 'BAL',
    basePrice: 2.74, marketCap: 274000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0xba100000625a3754423978a60c9317c58a424e3d.png',
    description: 'Balancer is a protocol for programmable liquidity.',
    website: 'https://balancer.fi',
    whitepaper: 'https://balancer.fi/whitepaper.pdf'
  },
  {
    id: 40, rank: 40, name: 'Audius', symbol: 'AUDIO',
    basePrice: 0.24, marketCap: 237000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0x18aaa7115705e8be94bffebde57af9bfc265b998.png',
    description: 'Audius is a decentralized music streaming platform.',
    website: 'https://audius.co',
    whitepaper: 'https://whitepaper.audius.co/AudiusWhitepaper.pdf'
  },
  {
    id: 41, rank: 41, name: 'SushiSwap', symbol: 'SUSHI',
    basePrice: 1.21, marketCap: 153000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0x6b3595068778dd592e39a122f4f5a5cf09c90fe2.png',
    description: 'SushiSwap is a decentralized exchange platform.',
    website: 'https://sushi.com',
    whitepaper: 'https://docs.sushi.com'
  },
  {
    id: 42, rank: 42, name: 'Serum', symbol: 'SRM',
    basePrice: 0.45, marketCap: 135000000,
    chainId: 101, chainName: 'Solana', chainSymbol: 'SOL',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt/logo.png',
    description: 'Serum is a decentralized exchange built on Solana.',
    website: 'https://projectserum.com',
    whitepaper: 'https://docs.projectserum.com'
  },
  {
    id: 43, rank: 43, name: 'Kyber Network', symbol: 'KNC',
    basePrice: 0.67, marketCap: 133000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202.png',
    description: 'Kyber Network is a multi-chain crypto trading and DeFi platform.',
    website: 'https://kyber.network',
    whitepaper: 'https://files.kyber.network/Kyber_Protocol_22_April_v0.1.pdf'
  },
  {
    id: 44, rank: 44, name: 'Mango', symbol: 'MNGO',
    basePrice: 0.031, marketCap: 94000000,
    chainId: 101, chainName: 'Solana', chainSymbol: 'SOL',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac/logo.svg',
    description: 'Mango Markets is a decentralized trading platform built on Solana.',
    website: 'https://mango.markets',
    whitepaper: 'https://docs.mango.markets'
  },
  {
    id: 45, rank: 45, name: 'Bancor', symbol: 'BNT',
    basePrice: 0.57, marketCap: 89000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c.png',
    description: 'Bancor is a decentralized liquidity network.',
    website: 'https://bancor.network',
    whitepaper: 'https://storage.googleapis.com/website-bancor/2018/04/01ba8253-bancor_protocol_whitepaper_en.pdf'
  },
  {
    id: 46, rank: 46, name: 'Alpha Homora', symbol: 'ALPHA',
    basePrice: 0.087, marketCap: 87000000,
    chainId: 1, chainName: 'Ethereum', chainSymbol: 'ETH',
    logo: 'https://tokens.1inch.io/0xa1faa113cbe53436df28ff0aee54275c13b40975.png',
    description: 'Alpha Homora is a leveraged yield farming protocol.',
    website: 'https://alphaventuredao.io',
    whitepaper: 'https://blog.alphaventuredao.io/fair-launch-alpha-homora-v2/'
  },
  {
    id: 47, rank: 47, name: 'Bonfida', symbol: 'FIDA',
    basePrice: 0.76, marketCap: 75000000,
    chainId: 101, chainName: 'Solana', chainSymbol: 'SOL',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp/logo.png',
    description: 'Bonfida is the flagship Solana wallet and full product suite.',
    website: 'https://bonfida.org',
    whitepaper: 'https://docs.bonfida.org'
  },
  {
    id: 48, rank: 48, name: 'Samoyedcoin', symbol: 'SAMO',
    basePrice: 0.0088, marketCap: 57000000,
    chainId: 101, chainName: 'Solana', chainSymbol: 'SOL',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU/logo.png',
    description: 'Samoyedcoin is a memecoin inspired by the Samoyed dog breed.',
    website: 'https://samoyedcoin.com',
    whitepaper: 'https://samoyedcoin.com'
  },
  {
    id: 49, rank: 49, name: 'Star Atlas', symbol: 'ATLAS',
    basePrice: 0.0035, marketCap: 46000000,
    chainId: 101, chainName: 'Solana', chainSymbol: 'SOL',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx/logo.png',
    description: 'Star Atlas is a next-gen gaming metaverse emerging on Solana.',
    website: 'https://staratlas.com',
    whitepaper: 'https://staratlas.com/files/star-atlas-white-paper.pdf'
  },
  {
    id: 50, rank: 50, name: 'Step Finance', symbol: 'STEP',
    basePrice: 0.088, marketCap: 26000000,
    chainId: 101, chainName: 'Solana', chainSymbol: 'SOL',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT/logo.png',
    description: 'Step Finance is a portfolio management dashboard for Solana.',
    website: 'https://step.finance',
    whitepaper: 'https://docs.step.finance'
  }
]

// Fetch detailed data for a specific token with timeout protection
async function fetchTokenDetails(symbol: string) {
  try {
    // Find token in our comprehensive dataset
    const token = TOP_50_POPULAR_CRYPTO_DATA.find(t => t.symbol.toLowerCase() === symbol.toLowerCase())
    
    if (!token) {
      console.log(`Token ${symbol} not found in dataset`)
      return null
    }

    // Generate realistic price fluctuations
    const priceFluctuation = 1 + (Math.sin(Date.now() / 100000) * 0.05) + (Math.random() - 0.5) * 0.02
    const currentPrice = token.basePrice * priceFluctuation
    
    // Generate realistic market data
    const change24h = (Math.random() - 0.5) * 20 // -10% to +10%
    const change7d = (Math.random() - 0.5) * 30 // -15% to +15%
    const change1h = (Math.random() - 0.5) * 6  // -3% to +3%
    const change30d = (Math.random() - 0.5) * 60 // -30% to +30%
    const change1y = (Math.random() - 0.5) * 400 // -200% to +200%
    
    const currentMarketCap = token.marketCap * priceFluctuation
    const volume24h = currentMarketCap * (0.05 + Math.random() * 0.15) // 5-20% of market cap
    const supply = Math.floor(currentMarketCap / currentPrice)
    const maxSupply = supply * (1.1 + Math.random() * 0.4) // 10-50% more than current supply
    
    // Generate sparkline data (7 days of hourly prices)
    const sparklineData = []
    for (let i = 0; i < 168; i++) { // 7 days * 24 hours
      const basePrice = currentPrice * (1 + change7d / 100)
      const variation = (Math.random() - 0.5) * 0.1 // ±5% variation
      sparklineData.push(basePrice * (1 + variation))
    }
    
    // Calculate high/low values
    const allTimeHigh = currentPrice * (1.2 + Math.random() * 2) // 20-320% higher
    const allTimeLow = currentPrice * (0.1 + Math.random() * 0.3) // 10-40% of current
    
    // Generate dates for ATH/ATL
    const now = new Date()
    const athDate = new Date(now.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const atlDate = new Date(now.getTime() - Math.random() * 1095 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    
    // Transform to our crypto format with extended detail data
    return {
      id: token.id,
      rank: token.rank,
      name: token.name,
      symbol: token.symbol,
      logo: token.logo,
      price: currentPrice,
      priceChange24h: change24h,
      change24h: change24h,
      change7d: change7d,
      marketCap: currentMarketCap,
      volume24h: volume24h,
      supply: supply,
      sparkline: sparklineData,
      
      // Extended detail page data
      description: token.description,
      website: token.website,
      whitepaper: token.whitepaper,
      github: `https://github.com/${token.symbol.toLowerCase()}`,
      twitter: `https://twitter.com/${token.symbol.toLowerCase()}`,
      reddit: `https://reddit.com/r/${token.symbol.toLowerCase()}`,
      
      allTimeHigh: allTimeHigh,
      allTimeLow: allTimeLow,
      athDate: athDate,
      atlDate: atlDate,
      
      tags: ['cryptocurrency', token.chainName.toLowerCase(), 'defi'],
      categories: ['Cryptocurrency', 'DeFi', token.chainName],
      
      maxSupply: maxSupply,
      totalSupply: supply * 1.05, // Slightly more than circulating
      volumeChange24h: (Math.random() - 0.5) * 50, // -25% to +25%
      volumeRank: token.rank,
      marketCapChange24h: change24h * 0.8, // Similar to price change
      marketCapRank: token.rank,
      priceChange1h: change1h,
      priceChange30d: change30d,
      priceChange1y: change1y,
      fullyDilutedMarketCap: maxSupply * currentPrice,
      
      // Chain information
      chainId: token.chainId,
      chainName: token.chainName,
      chainSymbol: token.chainSymbol
    }
  } catch (error) {
    console.error(`Error generating data for ${symbol}:`, error)
    return null
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  const { symbol } = await params;
  try {
    console.log(`API: Fetching details for ${symbol}...`)
    
    // Add timeout protection for the token data fetch
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), 5000) // 5 second timeout
    )
    
    const tokenDataPromise = fetchTokenDetails(symbol)
    
    const tokenData = await Promise.race([tokenDataPromise, timeoutPromise]) as any
    
    if (!tokenData) {
      console.log(`Token ${symbol} not found`)
      return NextResponse.json({ error: 'Token not found' }, { status: 404 })
    }

    console.log(`API: Successfully returning details for ${symbol}`)
    return NextResponse.json(tokenData)
  } catch (error) {
    console.error(`API error for token ${symbol}:`, error)
    
    // Return a fallback response with basic token info if available
    const fallbackToken = TOP_50_POPULAR_CRYPTO_DATA.find(t => 
      t.symbol.toLowerCase() === symbol.toLowerCase()
    )
    
    if (fallbackToken) {
      console.log(`Returning fallback data for ${symbol}`)
      return NextResponse.json({
        id: fallbackToken.id,
        rank: fallbackToken.rank,
        name: fallbackToken.name,
        symbol: fallbackToken.symbol,
        logo: fallbackToken.logo,
        price: fallbackToken.basePrice,
        priceChange24h: 0,
        change24h: 0,
        change7d: 0,
        marketCap: fallbackToken.marketCap,
        volume24h: 0,
        supply: Math.floor(fallbackToken.marketCap / fallbackToken.basePrice),
        sparkline: Array(168).fill(fallbackToken.basePrice),
        description: fallbackToken.description,
        website: fallbackToken.website,
        chainId: fallbackToken.chainId,
        chainName: fallbackToken.chainName
      })
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch token details', 
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
