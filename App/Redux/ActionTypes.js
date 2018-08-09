import { StartupTypes } from './StartupRedux'
import { GithubTypes } from './GithubRedux'
import { AuthTypes } from './AuthRedux'
import { AddressTypes } from './AddressRedux'
import { JobTypes } from './JobRedux'
import { ProblemTypes } from './ProblemRedux'
import { ProblemCategoryTypes } from './ProblemCategoryRedux'
import { ServiceRequestTypes } from './ServiceRequestRedux'
import { NotificationTypes } from './NotificationRedux'
import { ContractorTypes } from './ContractorRedux'
import { PaymentsTypes } from './PaymentsRedux'
// ADD_IMPORT

export default {
  ...StartupTypes,
  ...GithubTypes,
  ...AuthTypes,
  ...AddressTypes,
  ...JobTypes,
  ...ProblemTypes,
  ...ProblemCategoryTypes,
  ...ServiceRequestTypes,
  ...NotificationTypes,
  ...ContractorTypes,
  ...PaymentsTypes,
  // ADD_ACTION_TYPE
}
