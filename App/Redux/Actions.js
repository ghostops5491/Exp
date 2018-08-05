import AddressActions from './AddressRedux'
import AuthActions from './AuthRedux'
import ContractorActions from './ContractorRedux'
import InvoiceActions from './InvoiceRedux'
import JobActions from './JobRedux'
import NotificationActions from './NotificationRedux'
import PaymentsActions from './PaymentsRedux'
import ProblemActions from './ProblemRedux'
import ProblemCategoryActions from './ProblemCategoryRedux'
import ServiceRequestActions from './ServiceRequestRedux'
import StartupActions from './StartupRedux'
// ADD_IMPORT

export default {
  ...AddressActions,
  ...AuthActions,
  ...ContractorActions,
  ...InvoiceActions,
  ...JobActions,
  ...NotificationActions,
  ...PaymentsActions,
  ...ProblemActions,
  ...ProblemCategoryActions,
  ...ServiceRequestActions,
  ...StartupActions,
  // ADD_ACTIONS
}
