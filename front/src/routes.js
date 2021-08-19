import React from "react";

const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
const UserDocuments = React.lazy(() =>
  import("./pages/documents/UserDocuments")
);
const Document = React.lazy(() => import("./pages/documents/Document"));
const GenerateModel = React.lazy(() =>
  import("./components/document/GenerateModel")
);
const ViewDocument = React.lazy(() => import("./pages/documents/ViewDocument"));
const EditDocument = React.lazy(() => import("./pages/documents/EditDocument"));
const Action = React.lazy(() => import("./pages/actions/Action"));
const ViewAction = React.lazy(() => import("./pages/actions/ViewAction"));
const Login = React.lazy(() => import("./pages/login/Login"));
const Administration = React.lazy(() =>
  import("./pages/administration/Administration")
);
const Clients = React.lazy(() => import("./pages/client/Clients"));
const Activities = React.lazy(() => import("./pages/activities/Activities"));
const Statistics = React.lazy(() => import("./pages/statistics/Statistics"));
const Page404 = React.lazy(() => import("./pages/page404/Page404"));
const Page500 = React.lazy(() => import("./pages/page500/Page500"));

const routes = [
  { path: "/", exact: true, name: "Dashboard" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/my-documents", name: "UserDocuments", component: UserDocuments },
  { path: "/document/:id", name: "Document", component: Document },
  {
    path: "/generate-model/:id",
    name: "GenerateModel",
    component: GenerateModel,
  },
  { path: "/actions", name: "Action", component: Action },
  { path: "/view/:id", name: "ViewAction", component: ViewAction },
  {
    path: "/editor/new/:id",
    name: "ViewDocument",
    component: ViewDocument,
  },
  {
    path: "/editor/edit/:id",
    name: "EditDocument",
    component: EditDocument,
  },
  {
    path: "/administration",
    name: "Administration",
    component: Administration,
  },
  { path: "/customers", name: "Clients", component: Clients },
  { path: "/login", name: "Login", component: Login },
  { path: "/activities", name: "Activities", component: Activities },
  { path: "/statistics", name: "Statistics", component: Statistics },
  { path: "/no-found", name: "Page404", component: Page404 },
  { path: "/error", name: "Page500", component: Page500 },
];

export default routes;
