import React from 'react';

 const Header=({ id, data, columnData, setprinting })=> {

   
    let textMail = "";
    columnData.forEach(item => {
        textMail = textMail + "%20," + item.text;
    });

    data.forEach((item) => {
        textMail = textMail + "%0D%0A";
        columnData.forEach(key => {
            if (key.formatter) {
                textMail = textMail + "%20," + key.formatter(item);
            } else {
                textMail = textMail + "%20," + item[key.dataField];
            }
        })
    })

   
    


     return (<div className="d-flex justify-content-between" style={{ background: "#F8A316" }}>
         <span></span>
         <div className="d-flex" >

         </div>
     </div >
    );
};

export default Header;