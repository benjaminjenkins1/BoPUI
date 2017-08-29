function AdjustViewerHeight(){
  var height = $(window).height() - 6;
  var height_in_px = height + 'px';
  $('#viewer').css('height', height_in_px);
}

function AdjustFooterPos(){
  var dist = $('#contents-list').outerHeight() + 20;
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
  var nav_items = '';
  for(var i=0; i<items.length; i++){
    nav_items += items[i];
  }
  $('#contents-list').html(nav_items);
  $('.section-title').click(function(){
    ToggleHidden(this);
  });
  AdjustFooterPos();
}

function View(val){
  $('#viewer').replaceWith('<iframe id="viewer" src="'+val+'"></iframe>');
  AdjustViewerHeight();
}

function CreateNavChild(key, val){
  var child_items = [];
  child_items.push('<li class="sidebar-brand section-title">'+key+'&nbsp;<i class="fa fa-chevron-down" aria-hidden="true"></i></li>');
  child_items.push('<ul class="sidebar-collapse hidden">');
  $.each(val, function(key, val){
    if(typeof(val) == 'string'){
      child_items.push('<li class="sidebar-brand" onclick="View(\''+val+'\')"><i class="fa fa-file-text-o" aria-hidden="true">'+key+'</li>');
    }
    else if(typeof(val) == 'object'){
      child_items.push(CreateNavChild(key, val));
    }
  });
  child_items.push('</ul>');
  var child = '';
  for(var i=0; i<child_items.length; i++){
    child += child_items[i];
  }
  return child;
}

function LoadSidebar(){
  $.getJSON('pages.json', function(data){
    var items = [];
    $.each(data, function(key, val){
      if(typeof(val) == 'string'){
        items.push('<li class="sidebar-brand" onclick="View(\''+val+'\')"><i class="fa fa-file-text-o" aria-hidden="true"></i>'+key+'</li>');
      }
      else if(typeof(val) == 'object'){
        items.push(CreateNavChild(key, val));
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
