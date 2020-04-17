let countDisplay=document.getElementById("count");
$(function() {
    //mask
    // $('.amount').mask('#,####.##',{reverse :true});
    //function that will get the total amount by each calss
        let count=0;
        let sum=0;
        $('.amount').each(function(){
            let num=$(this).val().replace(',','');
            if(num!=0)
            {
                sum+=parseFloat(num);
                count+=1;
            }
        });

        $('#total_amount').val(sum.toFixed(2));
        countDisplay.textContent=count;

    
});
