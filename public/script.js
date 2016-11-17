var $myModal = $("#myModal");
var $modalContent = $(".modal-content");
var $button = $("button");
var $exit = $("span");

$button.on('click', function(){
  $myModal.addClass('display');
});

$exit.on('click', function(){
  $myModal.removeClass('display');
});
