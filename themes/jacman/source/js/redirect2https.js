window.onload = function() {
    if (window.location.protocol != 'https:' && window.location.hostname.indexOf("localhost") < 0) {
        location.href = location.href.replace("http://", "https://");
    }
};