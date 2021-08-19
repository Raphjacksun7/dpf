import React from 'react';
import { UsersList } from "../../components"
import {documents} from "../../data/document"
import "./styles.scss";

const Documents = () => {

  return (
    <UsersList title={"Administration"} data={documents} role="admin"/>
  )
}

export default Documents





