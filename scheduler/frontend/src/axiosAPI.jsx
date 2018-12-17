var axios = require('axios');


module.exports = {
    postForm:function(currentState,URL){
        var encodedLocation = encodeURIComponent(URL);
        var requestUrl = encodedLocation;
        return axios({
            headers:{"X-CSRFToken":csrftoken},
            method: 'post',
            contentType: 'multipart/form-data',
            url: requestUrl,
            data: currentState
        }).then(function(response){
            return response.status;

        },function(err){

        });

    },
    get:function(URL){

        var requestUrl = URL;
        return axios({
            headers:{"X-CSRFToken":csrftoken},
            method: 'get',
            contentType: 'application/json; charset=utf-8',
            url: requestUrl
        }).then(function(response){
            return response.data;

        },function(err){
            console.log(err);
        });

    },
    postFormData:function(currentState,URL){
        var encodedLocation = encodeURIComponent(URL);
        var requestUrl = encodedLocation;
        var data = new FormData();
        data.append('file', currentState.custom_sql_file);
        data.append('currentState', JSON.stringify(currentState))

        var config =  {
            headers:{
            "X-CSRFToken":csrftoken,
            'mimeType': 'multipart/form-data'
        }
        }
        return axios.post(requestUrl, data, config);


    }
}
