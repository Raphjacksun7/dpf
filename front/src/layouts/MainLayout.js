import React from "react";
import { Content, Sidebar, Footer, Header } from "./index";
import moment from "moment";
import "moment/locale/fr";

const MainLayout = () => {
  moment.locale("fr");

  return (
    <div className="c-app c-default-layout">
      <Sidebar />
      <div className="c-wrapper">
        <Header />
        <div className="c-body">
          <Content />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
