import { Token } from '@pancakeswap/sdk'
import tokens from 'config/constants/tokens'

const { warningtoken, warningtoken1 } = tokens

interface WarningTokenList {
  [key: string]: Token
}

const SwapWarningTokens = <WarningTokenList>{
  warningtoken,
  warningtoken1,
}

export default SwapWarningTokens
