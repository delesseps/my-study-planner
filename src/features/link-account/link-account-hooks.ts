import {useMutation} from 'react-query'

import * as linkAccountService from './link-account-service'

export function useLinkAccount() {
  const googleAccountLink = useMutation(linkAccountService.googleAccountLink)

  const googleTokenConfirmation = useMutation(
    linkAccountService.googleTokenConfirmation,
  )

  return {googleAccountLink, googleTokenConfirmation}
}
