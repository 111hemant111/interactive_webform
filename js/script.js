let totalCost = 0;
$('#name').focus(); //Set focus to Name field
$('#other-title').hide(); //Hide Other Job Role input field
$('#colors-js-puns select').hide(); //Hide color selection
const noColorLabel = $('<label for="color">Please select a T-shirt theme!</label>');
$('#colors-js-puns label').after(noColorLabel);
$('#colors-js-puns label').eq(1).css({"font-size":"0.80em", "padding-top":"0.25em", "color":"red"});

const total = $('<label>Total: </label>');
$('.activities label').eq(6).after(total);
$('.activities label').eq(7).hide();


changeColorList(); //Change the color options from Non-JS format to JS format.

$('.activities').next().addClass("payment-info");
$('#payment').val("credit card");
const paymentChild = $('.payment-info > div'); //Only direct children of .payment-info
$(paymentChild).eq(1).attr("id", "paypal");
$(paymentChild).eq(2).attr("id", "bitcoin");
$('#paypal').hide();
$('#bitcoin').hide();
$('#payment option').eq(0).remove(); //Remove 'Select Payment Method' option


//FUNCTIONS

function showJsPuns() //Show only JS Puns colors
{   
    $('#color').val("cornflowerblue"); //Sets default value to 'Cornflower Blue' color
    $('option[value="cornflowerblue"]').show();
    $('option[value="darkslategrey"]').show();
    $('option[value="gold"]').show();
    $('option[value="tomato"]').hide();
    $('option[value="steelblue"]').hide();
    $('option[value="dimgrey"]').hide();
}

function showHeartJs()  //Show only I love JS colors
{
    $('#color').val("tomato"); //Sets default value to 'Tomato' color
    $('option[value="cornflowerblue"]').hide();
    $('option[value="darkslategrey"]').hide();
    $('option[value="gold"]').hide();
    $('option[value="tomato"]').show();
    $('option[value="steelblue"]').show();
    $('option[value="dimgrey"]').show();
}

function changeColorList () //Remove the redundant color information
{
    $('option[value="cornflowerblue"]').text("Cornflower Blue");
    $('option[value="darkslategrey"]').text("Dark Slate Grey");
    $('option[value="gold"]').text("Gold");
    $('option[value="tomato"]').text("Tomato");
    $('option[value="steelblue"]').text("Steel Blue");
    $('option[value="dimgrey"]').text("Dim Grey");
}

function disableConflicting (selectedEvent, selection) //Disable conflicting events
{
    const $actList = $('.activities label'); //List of all the labels in the activities class
    
    let i;
    for (i = 0; i < 7; i++)
        {
            if ($actList.eq(i).children().eq(0).attr("name") !== selectedEvent.name && 
                $actList.eq(i).children().eq(0).attr("data-day-and-time") === $(selectedEvent).attr("data-day-and-time") && 
                selection) //When names are not same, but day and time are same, and selection is true
                {
                    $actList.eq(i).children().eq(0).attr("disabled", true);
                    $actList.eq(i).addClass("disabled");
                }
            
            if ($actList.eq(i).children().eq(0).attr("name") !== selectedEvent.name && 
                $actList.eq(i).children().eq(0).attr("data-day-and-time") === $(selectedEvent).attr("data-day-and-time") && 
                !selection) //When names are not same, but day and time are same, and selection is false
                {
                    $actList.eq(i).children().eq(0).attr("disabled", false);
                    $actList.eq(i).removeAttr("class");
                }
        }
}

function updateTotal ()
{
    totalCost = 0;
    $('.activities label').eq(7).css({"font-size":"1em", "padding-left":"1.7em"});
    for (i = 0; i < 7; i++)
        {
            if ($('.activities input')[i].checked === true)
                totalCost = totalCost + parseInt($('.activities input').eq(i).attr("data-cost").slice(1));
//            console.log($('.activities input').eq(i).prop("data-cost").slice(1).parseInt());
        }
    $('.activities label').eq(7).text(`Total: ${totalCost}`);
    
    if (totalCost !== 0)
        $('.activities label').eq(7).slideDown();
    else
        $('.activities label').eq(7).slideUp();
}

function hidePaymentOpts(selected)
{
    let i;
    for (i = 0; i < paymentChild.length; i++)
        {
            if (i !== selected)
                paymentChild.eq(i).slideUp();
            if (i === selected)
                paymentChild.eq(selected).slideDown();
        }
}

function isValidName (name)
{
    const nameRegEx = /[a-zA-Z ]/;
    return nameRegEx.test(name);
}

function isValidEmail (email)
{
    const emailRegEx = /^\w+@\w+\.com$/;
    return emailRegEx.test(email);
}

function isValidActivities ()
{
//    let check = 0;
//    let noOfAct = $('.activities input').length;
//    let i;
//    for (i = 0; i < noOfAct; i++)
//        {
//            if ($('.activities input')[i].checked)
//                check++;
//        }
    if (totalCost !== 0)
        return true;
    else
        return false;
}

function isValidCredit (ccNum, cvv, zip)
{
    return isValidCcNum(ccNum) && isValidCvv(cvv) && isValidZip(zip);
}

function isValidCcNum (ccNum)
{
    const numRegEx = /^\d{13,16}$/;
    return numRegEx.test(ccNum);
}

function isValidCvv (cvv)
{
    const cvvRegEx = /^\d{3}$/;
    return cvvRegEx.test(cvv);
}

function isValidZip (zip)
{
    const zipRegEx = /^\d{5}$/;
    return zipRegEx.test(zip);
}

/*
//////EVENTS//////
*/

//To show/hide Other Job Profile
$('#title').on('change', (e) => { 
    if ($('#title').val() === "other")
            $('#other-title').slideDown();
    else
        $('#other-title').slideUp();
});

//To update color field
$('#design').on('change', (e) => { 
$('#colors-js-puns label').eq(1).hide();
    if ($('#design').val() === "js puns")
        {
            $('#colors-js-puns select').slideDown();
            showJsPuns();
        }
        
    else if ($('#design').val() === "heart js")
        {
            $('#colors-js-puns select').slideDown();
            showHeartJs();
        }
    else
        {
            $('#colors-js-puns select').hide();
            $('#colors-js-puns label').eq(1).slideDown();
        }
        
});

// Clicking checkboxes
$('.activities').click((e) => { 
    const selectedEvent = e.target;
    const selection = event.target.checked;
    updateTotal();
    if (selectedEvent.name !== undefined)
        disableConflicting(selectedEvent, selection);
});

//To show/hide payment options based on payment selection menu
$('.payment-info').on('change', (e) => {
    const indexOfPayment = $('#payment option:selected').index();
    hidePaymentOpts(indexOfPayment);
});

$('form').submit((e) => {
    e.preventDefault();
    
    const name = $('#name').val();
    const email = $('#mail').val();
    const ccNum = $('#cc-num').val();
    const cvv = $('#cvv').val();
    const zip = $('#zip').val();
    
    console.log(isValidName(name));
    console.log(isValidEmail(email));
    console.log(isValidActivities());
    console.log(isValidCredit(ccNum, cvv, zip));
    
});