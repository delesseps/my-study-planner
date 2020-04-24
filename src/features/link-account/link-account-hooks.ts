import { useMemo } from "react";
import { useMutation, queryCache } from "react-query";

import * as linkAccountService from "./link-account-service";
import { message } from "antd";

export function useLinkAccount() {
  const googleAccountLink = useMutation(linkAccountService.googleAccountLink);

  const googleTokenConfirmation = useMutation(
    linkAccountService.googleTokenConfirmation
  );

  return { googleAccountLink, googleTokenConfirmation };
}
