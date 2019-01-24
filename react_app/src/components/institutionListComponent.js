import React, { Component } from 'react'


   const InstitutionListComponent = (props) => {
       var InstitutionList = props.institutions.map((institution)=> {
       console.log("intitucijos is props ", props.institutions)
    return (
        <div className="container" key={institution.title}>
        <bookComponent 
        title={institution.title}
        city={institution.city}
        category={institution.category}
        type={institution.type}
        subType={institution.subType}
        image = {institution.image}
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
