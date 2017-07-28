

var fs = require('fs');
var file = require("./input.json");





  //  for (var i = 0; i < data_array.length; i++) {
   console.log(file.result.fulfillment.messages[0].type);
   console.log( file.result.fulfillment.messages[0].platform);
   console.log("lenght of message"+file.result.fulfillment.messages.length);
   

   for (var i=0;i<file.result.fulfillment.messages.length ;i++)
     {
         console.log(file.result.fulfillment.messages[i].type+"_"+file.result.fulfillment.messages[i].platform);
     
    /*     if (file.result.fulfillment.messages[0].platform =='google')
         {
              var message=JSON.stringify(file.result.fulfillment.speech).replace(/"/g, "");
         //     console.log(" message"+message);
         }
     */
     if ((file.result.fulfillment.messages[i].platform)=="google")
              {
                  console.log("type is "+file.result.fulfillment.messages[i].type);
               //   console.log("speech response"+ file.result.fulfillment.messages[i]);
                 if(file.result.fulfillment.messages[i].type=="simple_response")
                 { 
                     console.log()
                     console.log("-- in simple response "+ file.result.fulfillment.messages[i].textToSpeech);
                 }
                  if(file.result.fulfillment.messages[i].type=="basic_card")
                  {
                   console.log("--in basic card ");
                   console.log(" basic card title: "+ file.result.fulfillment.messages[i].title);
                   console.log(" basic card image url "+ file.result.fulfillment.messages[i].image.url);
                   console.log(" basic card buttons->url ->action "+ file.result.fulfillment.messages[i].buttons[0].title);
                
                   console.log(" basic card buttons->url ->action "+ file.result.fulfillment.messages[i].buttons[0].openUrlAction.url);
                

                  }

                  if(file.result.fulfillment.messages[i].type=="list")
                  {
                     console.log("-- list : "+ file.result.fulfillment.messages[i].title);
                  
                  }

                    if(file.result.fulfillment.messages[i].type=="suggestion_chips")
                  {   
                      var len=file.result.fulfillment.messages[i].suggestions.length;
                //   for(var i=1;i<len+1;i++)
                      console.log("-- suggestion chips : "+ file.result.fulfillment.messages[i].suggestions[1].title);
                      console.log("lenght is "+len);
                }

                     if(file.result.fulfillment.messages[i].type=="link_out_chip")
                  {
                        console.log("-- link_out  chip : destination name"+ file.result.fulfillment.messages[i].destinationName);
                        console.log(" link_out chip :  url "+ file.result.fulfillment.messages[i].url);
              
                  }

                     if(file.result.fulfillment.messages[i].type=="custom_payload")
                  {
                      console.log("-- custom payload : "+ file.result.fulfillment.messages[i].payload.google.messages);
              
                  }

               
   switch(file.result.fulfillment.messages[i].type){
       
        case 0:// text response
 
       /* var message=JSON.stringify(body.result.fulfillment.messages[i].textToSpeech);
        console.log("___message"+message);
          if (!error && response.statusCode === 200) {
             var message=JSON.stringify(body.result.fulfillment.messages[i].textToSpeech);
             console.log("__Message"+message);
          //   return message;
             console.log("message "+  message );
          }
           break;
           */
           if(body.result.fulfillment.messages[i].type=='simple_response')
                {
                 console.log(" type is "+file.result.fulfillment.messages[i].type);
                }
            
          break;
       
         case 1:
            
              if (body.result.fulfillment.messages[i].type== 'basic_card')
               {
                   console.log("type is "+file.result.fulfillment.messages[i].type);
               }
              break;
         case 2:// quec
            if(body.result.fulfillment.messages[i].type=='list')
                {
                  console.log("type is "+file.result.fulfillment.messages[i].type);
                }
            break;

        case 3:
            if (body.result.fulfillment.messages[i].type=='suggestion_chips')
            {
                  console.log("type is "+file.result.fulfillment.messages[i].type);
            }
          break;

      case 4:
          if (body.result.fulfillment.messages[i].type=='custom_payload')
            {
                  console.log("type is "+file.result.fulfillment.messages[i].type);
            }
           break;

      case 5:
          if (body.result.fulfillment.messages[i].type=='link_out_chip')
            {
                  console.log("type is "+file.result.fulfillment.messages[i].type);
            }
           break;
     }
    }
     }
   //for(var i=0;i<file.result.fulfillment.messages.length)
        //console.log( obj[array[i]].body);
  //  }

 //var mesg_obj=body.result.fulfillment.messages.length;
  
 
  
 // console.log("message object "+mesg_obj);
 // console.dir(data);
//});
//console.log("----------------------");
//var googleResp=function(body){
  
 //s var type=[];
 // var obj=(body.result.fulfillment.messages.length);
/*  for(i=0;i<=obj;i++){
   var typeOf = body.result.fulfillment.messages[i].type;
   var platform= body.result.fulfillment.messages[i].platform;  */
 /* if (platform== "google")
  {
   switch(typeOf){
        case 0:// text response
        var message=JSON.stringify(body.result.fulfillment.speech);
          if (!error && response.statusCode === 200) {
             var message=JSON.stringify(body.result.fulfillment.speech).replace(/"/g, "");
             return message;
          }
           break;
        case 1:// quec
            if(body.result.fulfillment.messages.type=='simple_response')
                
                 break;
        case 2:// card

             if(body.result.fulfillment.messages.type=='basic_card' )
            
                 break;
        case 3://suggestion chips 
                 if(body.result.fulfillment.messages.type=='suggestion_chips' )
                 
                 break;
        case 4:// link out chip
            if(body.result.fulfillment.messages.type=='link_out_chip' )
             
                break;

       case 5:// custom
            if(body.result.fulfillment.messages.type=='custom_payload' )
             
                break;
       default:

           break;
     }
  }
*/
 //}

//module.exports.gAResp=googleResp;  