import React from "react";
import { Result, Button } from "antd";

const Page500 = () => {
  return (
    <div className="flex-row align-items-center">
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary">Back Home</Button>}
      />
    </div>
  );
};

export default Page500;
