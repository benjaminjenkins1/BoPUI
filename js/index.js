function AdjustViewerHeight(){
  var height = $(window).height() - 6;
  var height_in_px = height + 'px';
  $('#viewer').css('height', height_in_px);
}

function AdjustFooterPos(){
  var dist = $('#contents-list').outerHeight() + 20;
  console.log(dist);
  $('#sidebar-footer').css('top', dist);
}

function ToggleHidden(object){
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
  AdjustFooterPos();
}

function PopulateSidebar(items){
  for(var i=0; i<items.length; i++){
    $('#contents-list').html($('#contents-list').html() + items[i]);
  }
  $('.section-title').click(function(){
    ToggleHidden(this);
  });
  AdjustFooterPos();
}

function View(val){
  $('#viewer').attr('src', val);
}

function LoadSidebar(){
  $.getJSON('pages.json', function(data){
    var items = [];
    $.each(data, function(key, val){
      if(typeof(val)=='string'){
        items.push('<li class="sidebar-brand" onclick="View(\''+val+'\')">'+key+'</li>');
      }
      else if(typeof(val)=='object'){
        var item = '<li class="sidebar-brand section-title">'+key+'&nbsp;<i class="fa fa-chevron-down" aria-hidden="true"></i></li>';
        item += '<ul class="sidebar-collapse hidden">';
        $.each(val, function(key, val){
          item += '<li class="sidebar-brand" onclick="View(\''+val+'\')">'+key+'</li>';
        });
        items.push(item);
      }
    });
    PopulateSidebar(items);
  });
}

$(document).ready(function(){
  LoadSidebar();
  AdjustViewerHeight();
});

$(window).resize(function() {
  AdjustViewerHeight();
  AdjustFooterPos();
});
