var iC4Pro_Session_Storage = (function() {
    var full_name = "";
  

    var transactionId = "";
    var getName = function() {
      return full_name;    // Or pull this from cookie/localStorage
    };
    var getTransactionId =function (){
      return transactionId;
    }
    var setTransactionId = function(name) {
      transactionId = name;     
      // Also set this in cookie/localStorage
    };
    var setName = function(name) {
      full_name = name;     
      // Also set this in cookie/localStorage
    };
    

    
    return {
      getName: getName,
      getTransactionId:getTransactionId,
      setName: setName,
      setTransactionId:setTransactionId
    }
  
  })();
  
  export default iC4Pro_Session_Storage;