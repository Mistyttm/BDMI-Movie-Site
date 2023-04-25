function UrlEncode(navTitle){
    navTitle = navTitle.replace(/%/g, "%25");
    navTitle = navTitle.replace(/&/g, "%26");
    navTitle = navTitle.replace(/:/g, "%3A");
    navTitle = navTitle.replace(/\//g, "%2F");
    navTitle = navTitle.replace(/#/g, "%23");
    navTitle = navTitle.replace(/\?/g, "%3F");
    navTitle = navTitle.replace(/@/g, "%40");
    navTitle = navTitle.replace(/\+/g, "%2B");
    navTitle = navTitle.replace(/\s/g, "+");

    return(navTitle);
}

export default UrlEncode;