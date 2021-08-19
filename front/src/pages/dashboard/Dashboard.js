import React from 'react';
import {DocumentsList} from "../../components"
import {documents} from "../../data/document"
import "./styles.scss";

const Documents = () => {

  return (
    <DocumentsList title={"Vue Globale"} data={documents} role="admin"/>
  )
}

export default Documents





