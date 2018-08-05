import { AddressTypes } from './AddressRedux'
import { AuthTypes } from './AuthRedux'
import { ContractorTypes } from './ContractorRedux'
import { InvoiceTypes } from './InvoiceRedux'
import { JobTypes } from './JobRedux'
import { NotificationTypes } from './NotificationRedux'
import { PaymentsTypes } from './PaymentsRedux'
import { ProblemCategoryTypes } from './ProblemCategoryRedux'
import { ProblemTypes } from './ProblemRedux'
import { ServiceRequestTypes } from './ServiceRequestRedux'
import { StartupTypes } from './StartupRedux'
// ADD_IMPORT

export default {
  ...AddressTypes,
  ...AuthTypes,
  ...ContractorTypes,
  ...InvoiceTypes,
  ...JobTypes,
  ...NotificationTypes,
  ...PaymentsTypes,
  ...ProblemCategoryTypes,
  ...ProblemTypes,
  ...ServiceRequestTypes,
  ...StartupTypes,
  // ADD_ACTION_TYPE
}
