var apiResponsePOJO=require('../config/apiResponsePOJO.js');

var lookupResp=function(error,response,body){
    console.log("INSIDE SLACK FILE");
    var respObjArr=[];
    var obj=(body.result.fulfillment.messages.length);
    console.log("INSIDE SLACK FILE--MESSAGE LENGTH::"+obj);

    for(i=0;i<=obj;i++){
        console.log("INSIDE SLACK FILE--MESSAGE::"+JSON.stringify(body.result.fulfillment.messages[i]));
        var platform_msg = body.result.fulfillment.messages[i];
        if(platform_msg) {
            var platform_compare=platform_msg.platform;
            console.log("PLATFORM:::"+platform_compare);
            if(platform_compare){
                if (platform_compare=="slack")
                {
                    var typeOf = body.result.fulfillment.messages[i].type;
                    console.log("INSIDE SLACK FILE--TYPE::"+typeOf);
                    var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                    switch(typeOf){
                        case 0:// text response
                            if (!error && response.statusCode === 200) {
                                var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                                apiRespObj.speech=JSON.stringify(platform_msg.speech);
                                console.log("SPEECH:::"+apiRespObj.speech);
                                respObjArr.push(apiRespObj);
                            }
                        break;
                        case 1:// card
                            if ( !error &&response.statusCode === 200) {
                                var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                                apiRespObj.title = platform_msg.title;
                                apiRespObj.subtitle = platform_msg.subtitle;
                                apiRespObj.imageUrl = platform_msg.imageUrl;
                                respObjArr.push(apiRespObj);
                                console.log("TITLE:::"+apiRespObj.title);
                            }
                        break;
                        case 2:// quickreply
                            if (!error && response.statusCode === 200) {

                                var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                                apiRespObj.title=JSON.stringify(platform_msg.title);
                                console.log("TITLEwwww:::"+apiRespObj.title);
                                respObjArr.push(apiRespObj);
                            }
                        break;
                        case 3://imageUrl
                            if (!error &&response.statusCode === 200) {
                                var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                                apiRespObj.imageUrl=JSON.stringify(platform_msg.imageUrl);
                                respObjArr.push(apiRespObj);
                            }
                        break;
                        case 4:// custome payload
                                if (!error && response.statusCode === 200) {
                                    apiRespObj.payload=JSON.stringify(platform_msg.payload);
                                    respObjArr.push(apiRespObj);
                          z      }
                        break;
                        default:
                        break;
                    }

            }
        }
    }

}
  return respObjArr;
}
module.exports.lookupResp=lookupResp;
