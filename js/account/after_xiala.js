$(function(){
	$('.after_select p').click(function(){
		
		var ab =$(this).siblings('.after_option');
		if(ab.is(":visible")){
			ab.slideUp(300);
		}else{
			$(this).siblings('.after_option').slideDown(300);
		}
	})
	$('.after_option span').click(function(){
		var a = $(this).html();
		$(this).parent().siblings().html(a);
		$(this).parent().slideUp(300);
	})
	$(".after_sa_01 dt").click(function(){
		var hid =$(this).hasClass('after_sales_on');
		if(hid){
			$(this).removeClass("after_sales_on");
		}else{
			
			$(this).addClass("after_sales_on");
		}
	})
	
	

	 changeLength($('.after_text'),$('.word'));   
	
	
})
	function changeLength(obj,num){   
    obj.on('keyup',function(){   
    var txtval = $(this).val().length;   
        //console.log(txtval);   
        var str = parseInt(0+txtval);   
        //console.log(str);   
        if(str > 0 ){   
            $(this).siblings().find('var').html(str);   
        }else {   
            $(this).siblings().find('var').html('0');   
            $(this).val($(this).val().substring(0, 600));   
        }   
        //console.log($('#num_txt').html(str));   
    });   
}  