import React, { Component } from 'react'


   const InstitutionListComponent = (props) => {
       var InstitutionList = props.documents.map((document)=> {
       console.log("dokumentai is props ", props.documents)
    return (
        <div className="container" key={document.title}>
        <bookComponent 
        title={document.title}
        // title={institution.title}
        // city={institution.city}
        // category={institution.category}
        // type={institution.type}
        // subType={institution.subType}
        // image = {institution.image}
        /> 
   </div>
    )
    
    });

    return( 
        <div className="container">
        {InstitutionList}
        </div>
      
    )
}

export default InstitutionListComponent
