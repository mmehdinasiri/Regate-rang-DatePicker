function rangDatePicker(target ,firstDate, secondDate) {
    
                //type data-attr name
                var name = target;
                var firstDate=firstDate;
                var secondDate=secondDate;
                //init check
                if( $('[data-check01=' + name +']').val() != ''){
                    init();
                }else{
                    checker();
                }
    
               //update checker 
                $('[data-year='+name+']').on("change" ,function(){
                    checker();
                })
                $('[data-month='+name+']').on("change" ,function(){
                    checker();
                })
            
    
                // function run if we have init value 
                function init(){
                    var jalaliDate = convertor(name)
                    jalaliDate = jalaliDate.split(' ');
                    jalaliDate = jalaliDate[0].split('/');
    
                    $('[data-year='+name+']').val(jalaliDate[0]);
                    $('[data-month='+name+']').val(jalaliDate[1]);
    
                    var strLength = $('[data-Check01='+name+']').val();
                    if( !(strLength.length == 0) ){
                        checker();
                    }
                }
    
    
                // convert miladi date to jalali
                function convertor(){
                    var initDat =  $('[data-check01=' + name +']').val();
                    if( initDat != ''){
                        var JDate = require('jdate');
                        var jdate = new JDate;  
                        var initDat = initDat.split(" ");
                        var initTime = initDat[1];
                        initDat = initDat[0].split('-');
                        jdate.setFullYear(initDat[0]);
                        jdate.setMonth(initDat[1]);
                        jdate.setDate(initDat[2]);
                        initDat = JDate.to_jalali(jdate);
    
                        if( initDat[1] < 10 ){
                            initDat[1] = "0" + initDat[1] ;
                        }
                        if( initDat[2] < 10 ){
                            initDat[2] = "0" + initDat[2] ;
                        }
    
                        initDat = initDat.join('/');
                        if (initTime == null){
                            initTime = '00'+':'+'00'+':'+'00';
                        }
                        var finalDat = initDat+" "+initTime;
                            return finalDat;
                    }
                }
    
                //update checker function
                function checker(){
                    var JDate = require('jdate');
                    var persianYear = $('[data-year='+name+']').val() * 1;
                    var persianMonth = $('[data-month='+name+']').val() * 1;
                    jalaliDat_01 = JDate.to_gregorian(persianYear,persianMonth,firstDate);
                    jalaliDat_10 = JDate.to_gregorian(persianYear,persianMonth,secondDate);
    
                    //return date from day(01)
                    var year = (jalaliDat_01).getFullYear();
                    var month = (jalaliDat_01).getMonth() + 1 ;
                    var day = (jalaliDat_01).getDate();
                     if( month < 10 ){
                         month = "0" + month ;
                     }
                     if( day < 10 ){
                         day = "0" + day 
                     }
                    $('[data-Check01='+name+']').val(year+ '-' +month+ '-'+day+ " " + '00' + ':'+ '00' + ':'+ '00');
    
    
                    //return date from day(10)
                    var year = (jalaliDat_10).getFullYear();
                    var month = (jalaliDat_10).getMonth() + 1 ;
                    var day = (jalaliDat_10).getDate();
                     if( month < 10 ){
                         month = "0" + month ;
                     }
                     if( day < 10 ){
                         day = "0" + day ;
                     }
                    $('[data-Check10='+name+']').val(year+ '-' +month+ '-'+day+ " " + '00' + ':'+ '00' + ':'+ '00');
                }
    
                
            }; 