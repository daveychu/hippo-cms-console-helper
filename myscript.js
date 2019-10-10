var currentPage = window.location.href;
var container = $('#yui-gen11 > div > div');
var enabled = false;

addButtons();

function syncTreeWithDetailView () {
  currentPage = window.location.href;
  var stringsToFind = getParameterByName('path', currentPage).split('/');

  var divs = container.find("span:contains('" + stringsToFind[1] + "')").parent().parent().parent().nextAll();
  for (var i = 2, len = stringsToFind.length; i < len; i++) {
    divs = divs.filter(function (index) {
      return divs.eq(index).find("span:contains('" + stringsToFind[i] + "')").length > 0;
    }).first().nextAll();
  }

  var scrollTo = divs.first();

  //scroll element to center
  var offset = scrollTo.offset().top - container.offset().top + container.scrollTop() - (container.height() / 2);
  container.animate({scrollTop: offset});
}

setInterval(function () {
  if (enabled && currentPage != window.location.href) {
    syncTreeWithDetailView();
  }
}, 250);

syncTreeWithDetailView();

function getParameterByName (name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function updateAutoScroll (autoScroll) {
  let border = '1px solid ' + (enabled ? '#90EE90' : 'red');
  autoScroll.css('border', border);
}

function addButtons () {
  var menu = $('.hippo-console-tree-add-property').parent();
  let scroll = $('<li><a href="javascript:;"><span>Scroll from Source</span></a></li>');
  scroll.appendTo(menu);
  scroll.click(syncTreeWithDetailView);
  let autoScroll = $('<li><a href="javascript:;"><span>Autoscroll from Source</span></a></li>');
  autoScroll.appendTo(menu);
  autoScroll.click(function () {
    enabled = !enabled;
    updateAutoScroll(autoScroll.find('a'));
  });
  updateAutoScroll(autoScroll.find('a'));
}
