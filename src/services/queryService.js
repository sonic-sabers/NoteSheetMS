
var queryService = {
    preareQueryParams: function(params){
        const searchParams = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');

        return searchParams;

    }

}

export default queryService;