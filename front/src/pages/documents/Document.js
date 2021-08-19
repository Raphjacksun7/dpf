import React from 'react';
import { DocumentDetails } from "../../components"
import {models} from "../../data/model"
import  {documents}  from "../../data/document"
import "./styles/document.scss";

const Document = () => {

  return (
    <DocumentDetails title={"NOM_DU_DOSSIER"} actes={documents} models={models}/>
  )
}

export default Document





