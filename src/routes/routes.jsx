// src/routes.jsx
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import ProposalPage from '../pages/Proposal';
import OperatingModel from '../components/OperatingModel'
const appRoutes = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/proposal',
    element: <ProposalPage />,
  },
  {
    path: '/proposal/operating-model',
    element: <OperatingModel />,
  },
];

export default appRoutes;
