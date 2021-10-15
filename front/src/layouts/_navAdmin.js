import React from "react";
import { Icon } from "@iconify/react";
import twotoneAdminPanelSettings from "@iconify/icons-ic/twotone-admin-panel-settings";
import statsDownAlt from "@iconify/icons-gridicons/stats-down-alt";
import reportAnalytics from "@iconify/icons-tabler/report-analytics";
import twotonePeopleOutline from "@iconify/icons-ic/twotone-people-outline";
import documentIcon from "@iconify/icons-et/document";
import bxsDashboard from "@iconify/icons-bx/bxs-dashboard";
import todoIcon from "@iconify/icons-system-uicons/todo";
import archiveIcon from "@iconify/icons-entypo/archive";

const _navAdmin = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["MENU PRINCIPAL"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Vue Globale",
    to: "/dashboard",
    icon: <Icon icon={bxsDashboard} />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Vos Dossiers",
    to: "/my-documents",
    icon: <Icon icon={documentIcon} />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Mes Actions",
    to: "/actions",
    icon: <Icon icon={todoIcon} />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Clients",
    to: "/customers",
    icon: <Icon icon={twotonePeopleOutline} />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Administration",
    to: "/users",
    icon: <Icon icon={twotoneAdminPanelSettings} />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Archives",
    to: "/archives",
    icon: <Icon icon={archiveIcon} />,
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Statistiques",
  //   to: "/statistics",
  //   icon: <Icon icon={statsDownAlt} />,
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "CRA",
  //   to: "/activities",
  //   icon: <Icon icon={reportAnalytics} />,
  // },
];

export default _navAdmin;
