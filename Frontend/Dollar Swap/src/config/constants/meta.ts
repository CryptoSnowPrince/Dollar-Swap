import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Dollar Swap',
  description:
    'The most popular AMM on TetherMoon by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by Dollar Swap), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('Dollar Swap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('Dollar Swap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('Dollar Swap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('Dollar Swap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('Dollar Swap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('Dollar Swap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('Dollar Swap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('Dollar Swap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('Dollar Swap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Dollar Swap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('Dollar Swap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('Dollar Swap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('Dollar Swap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('Dollar Swap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('Dollar Swap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('Dollar Swap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('Dollar Swap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('Dollar Swap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('Dollar Swap Info & Analytics')}`,
        description: 'View statistics for Dollar Swap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('Dollar Swap Info & Analytics')}`,
        description: 'View statistics for Dollar Swap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('Dollar Swap Info & Analytics')}`,
        description: 'View statistics for Dollar Swap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('Dollar Swap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('Dollar Swap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('Dollar Swap')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('Dollar Swap')}`,
      }
    default:
      return null
  }
}
