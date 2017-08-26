function ToggleHidden(object){
  $(object).children()[0];
  if($(object).next().css('display')=='none'){
    $(object).next().css('display', 'inherit');
    $($(object).children()[0]).removeClass('fa-chevron-down');
    $($(object).children()[0]).addClass('fa-chevron-up');
    $(object).addClass('selected');
  }
  else{
    $(object).next().css('display', 'none');
    $($(object).children()[0]).removeClass('fa-chevron-up');
    $($(object).children()[0]).addClass('fa-chevron-down');
    $(object).removeClass('selected');
  }
}

function PopulateSidebar(items){
  for(var i=0; i<items.length; i++){
    $('#contents-list').html($('#contents-list').html() + items[i]);
  }
  $('.section-title').click(function(){
    ToggleHidden(this);
  });
}

function LoadSidebar(){
  $.getJSON('pages.json', function(data){
    var items = [];
    $.each(data, function(key, val){
      if(typeof(val)=='string'){
        items.push('<a href="'+val+'"><li class="sidebar-brand">'+key+'</li></a>');
      }
      else if(typeof(val)=='object'){
        var item = '<li class="sidebar-brand section-title">'+key+'&nbsp;<i class="fa fa-chevron-down" aria-hidden="true"></i></li>';
        item += '<ul class="sidebar-collapse">';
        $.each(val, function(key, val){
          item += '<a href="'+val+'"><li class="sidebar-brand">'+key+'</li></a>';
        });
        items.push(item);
      }
    });
    PopulateSidebar(items);
  });
}

$(document).ready(function(){
  console.log("Hello!");
  LoadSidebar();
});
