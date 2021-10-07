import React, { Component,useRef } from 'react';

 const Header=({ id, data, columnData, setPrinting })=> {

    const componentRef = useRef();
    
    let exportIconStyle = {
        float:'right',
        marginLeft:'3px',
        backgroundColor:'transparent',
        color:'#000000',
        border:'none'
      };

    let textMail = "";
    columnData.map(item => {
        textMail = textMail + "%20," + item.text;
    });

    data.map((item) => {
        textMail = textMail + "%0D%0A";
        columnData.map(key => {
            if (key.formatter) {
                textMail = textMail + "%20," + key.formatter(item);
            } else {
                textMail = textMail + "%20," + item[key.dataField];
            }
        })
    })

   
    


    return (<div className="d-flex justify-content-between" style={{background:"#F8A316"}}>
        <span></span>
        <div className="d-flex" >
        </div>
    </div >
    );
};

export default Header;