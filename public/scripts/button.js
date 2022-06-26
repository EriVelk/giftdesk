$(document).ready(function(){
    $("span").click(function(){
      alert("The paragraph was clicked.");
    });

    $("a").click(function(event){
      var id = event.target.id;
      if(id === 'cart-user'){
        alert(id);
      }else if(id === 'finalize-purchase'){
        alert(id);
        localStorage.removeItem('myCart')
      } 
    });
  
});