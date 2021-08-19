import React from "react";
import { Result, Button } from "antd";

const Page404 = () => {
  return (
    <div className="flex-row align-items-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Revenir à l'acceuil</Button>}
      />
      ,
    </div>
  );
};

export default Page404;
