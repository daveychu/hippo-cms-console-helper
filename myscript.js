var currentPage = window.location.href;
var container = $('#yui-gen11 > div > div');

setInterval(function () {
    if (currentPage != window.location.href) {
        currentPage = window.location.href;
        var stringsToFind = getParameterByName('path', currentPage).split('/');

        var divs = container.find("span:contains('" + stringsToFind[1] + "')").parent().parent().parent().nextAll();
        for (var i = 2, len = stringsToFind.length; i < len; i++) {
            console.log(divs);
            divs = divs.filter(function (index) {
                return divs.eq(index).find("span:contains('" + stringsToFind[i] + "')").length > 0;
            }).first().nextAll();
        }

        var scrollTo = divs.first();

        //scroll element to center
        var offset = scrollTo.offset().top - container.offset().top + container.scrollTop() - (container.height() / 2);
        container.animate({scrollTop: offset});
    }
}, 250);

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
