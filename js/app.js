$( newGame );
 
function newGame() {
  $('.movies').draggable({
  	revert:true
  });
  $('.image-drop').droppable({
  	drop: dropEvent,
  	accept: '.movies'
  });
}

function dropEvent( event, ui){
	var draggable = ui.draggable;
	//alert("The book with the ID"+ draggable.attr('id') + "was dropped onto the book slot");
}