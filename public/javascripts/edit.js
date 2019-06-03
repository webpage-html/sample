$(document).ready(function() {
	$('.remove').click(function(){
		var id=$(this).val();
		alert(id);
		$.post("/remove",{no:id},function(data){
			location.reload('/');
		});//jquery  no is variable
	});
	$('.edit').click(function(){
		var id=$(this).val();
		//alert(id);
		$.post("/edit",{no1:id},function(data){
			//alert(data);
			var a=JSON.stringify(data);
			var parseddata=JSON.parse(a);
			$("#id").val(parseddata[0]._id);
			//alert(parseddata[0].name);
			$("#name").val(parseddata[0].name);
			//alert(parseddata[0].number);
			$("#password").val(parseddata[0].number);
			
			//alert(parseddata[1].name);
			//alert(parseddata[1].number);
		});
		$(".dontshow").show();
	});
});