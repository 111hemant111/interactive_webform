let totalCost = 0;
let focusCheck = false;
let registerClicked = false;

$('#name').focus(); //Set focus to Name field
$('#other-title').hide(); //Hide Other Job Role input field
$('#colors-js-puns').hide(); //Hide color selection

setPlaceHolders(); //Example placeholders for inputs
createDynamicLabels(); //Create labels for validation feedback and dynamic total
changeColorList(); //Change the color options from Non-JS format to JS format.

//Modifying Paypal text
$('fieldset:nth-child(4) > div:nth-child(6)').text("We'll take you to Paypal's site to set up your billing information, when you click “Register” below.");
//Modifying Bitcoin text
$('fieldset:nth-child(4) > div:nth-child(7)').text("We'll take you to the Coinbase site to set up your billing information. Due to the nature of exchanging Bitcoin, all Bitcoin transactions will be final.");

//$('fieldset:nth-child(4) > div p').text("");
                                        
$('#mail').attr("type", "text"); //To prevent HTML5 built-in validation
$('.activities').next().addClass("payment-info"); //Assigning a class name to Payments section
$('#payment').val("credit card"); //Default payment Credit Card
$('#payment option').eq(0).remove(); //Remove 'Select Payment Method' option
const paymentChild = $('.payment-info > div'); //Only direct children of .payment-info
$(paymentChild).eq(1).attr("id", "paypal");
$(paymentChild).eq(2).attr("id", "bitcoin");

hidePaymentOpts(0); //Hide payment ops except CC

/////////////
//FUNCTIONS//
/////////////

//Set placeholders in input elements
function setPlaceHolders()
{
    $('#name').attr("placeholder", "e.g. Hemant Kuruva");
    $('#mail').attr("placeholder", "e.g. hemant_kuruva@example.com");
    $('#cc-num').attr("placeholder", "e.g. 1234567890123456");
    $('#zip').attr("placeholder", "e.g. 12345");
    $('#cvv').attr("placeholder", "e.g. 123");
}

//Create but hide error labels
function createDynamicLabels()
{
    //Dynamic total
    const total = $('<label>Total: </label>');
    $('.activities label').eq(6).after(total);
    $('.activities label').eq(7).hide();
    
    //Name error
    const enterName = $('<label id="enter-name">Please enter a valid name!</label>');
    $('label[for="name"]').after(enterName);
    $('#enter-name').hide();
    $('#enter-name').css("color","red");
    
    //Email error
    const enterEmail = $('<label id="enter-email">Please enter a valid email id!</label>');
    $('label[for="mail"]').after(enterEmail);
    $('#enter-email').hide();
    $('#enter-email').css("color","red");
    
    //Other title error
    const enterOtherTitle = $('<label id="enter-otherTitle">Please enter a job title!</label>');
    $('#title').after(enterOtherTitle);
    $('#enter-otherTitle').hide();
    $('#enter-otherTitle').css("color","red");
    
    //Theme error
    const enterTheme = $('<label id="enter-theme">Please select a design!</label>');
    $('.shirt legend').after(enterTheme);
    $('#enter-theme').hide();
    $('#enter-theme').css("color","red");
    
    //Activities error
    const selectAct = $('<label id="select-act">Please check an activity!</label>');
    $('.activities legend').after(selectAct);
    $('#select-act').hide();
    $('#select-act').css("color","red");
    
    //Credit card error
    const creditCard = $('<label id="error-cc">Please check credit card details!</label>');
    $('#payment').after(creditCard);
    $('#error-cc').hide();
    $('#error-cc').css("color","red");
}

//Show only JS Puns colors
function showJsPuns()
{   
    $('#color').val("cornflowerblue"); //Sets default value to 'Cornflower Blue' color
    $('option[value="cornflowerblue"]').show();
    $('option[value="darkslategrey"]').show();
    $('option[value="gold"]').show();
    $('option[value="tomato"]').hide();
    $('option[value="steelblue"]').hide();
    $('option[value="dimgrey"]').hide();
}

//Show only I love JS colors
function showHeartJs()
{
    $('#color').val("tomato"); //Sets default value to 'Tomato' color
    $('option[value="cornflowerblue"]').hide();
    $('option[value="darkslategrey"]').hide();
    $('option[value="gold"]').hide();
    $('option[value="tomato"]').show();
    $('option[value="steelblue"]').show();
    $('option[value="dimgrey"]').show();
}

//Remove the redundant color information
function changeColorList ()
{
    $('option[value="cornflowerblue"]').text("Cornflower Blue");
    $('option[value="darkslategrey"]').text("Dark Slate Grey");
    $('option[value="gold"]').text("Gold");
    $('option[value="tomato"]').text("Tomato");
    $('option[value="steelblue"]').text("Steel Blue");
    $('option[value="dimgrey"]').text("Dim Grey");
}

//Disable conflicting events
function disableConflicting (selectedEvent, selection)
{
    const $actList = $('.activities label'); //List of all the labels in the activities class
    
    let i;
    for (i = 0; i < 7; i++)
        {
            if ($actList.eq(i).children().eq(0).attr("name") !== selectedEvent.name && 
                $actList.eq(i).children().eq(0).attr("data-day-and-time") === $(selectedEvent).attr("data-day-and-time") && 
                selection) //If names are not same, but day and time are same, and selection is true
                {
                    $actList.eq(i).children().eq(0).attr("disabled", true);
                    $actList.eq(i).addClass("disabled");
                }
            
            if ($actList.eq(i).children().eq(0).attr("name") !== selectedEvent.name && 
                $actList.eq(i).children().eq(0).attr("data-day-and-time") === $(selectedEvent).attr("data-day-and-time") && 
                !selection) //If names are not same, but day and time are same, and selection is false
                {
                    $actList.eq(i).children().eq(0).attr("disabled", false);
                    $actList.eq(i).removeAttr("class");
                }
        }
}

//Update Total cost label
function updateTotal ()
{
    totalCost = 0;
    $('.activities label').eq(8).css({"font-size":"1em", "padding-left":"1.7em"});
    for (i = 0; i < 7; i++)
        {
            if ($('.activities input')[i].checked === true)
                totalCost = totalCost + parseInt($('.activities input').eq(i).attr("data-cost").slice(1));
        }
    $('.activities label').eq(8).text(`Total: \$${totalCost}`);
    
    if (totalCost !== 0)
        $('.activities label').eq(8).slideDown();
    else
        $('.activities label').eq(8).slideUp();
}

//Hide non-selected payment options
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

//Check validity of the name
function isValidName (name)
{
    const nameRegEx = /[a-zA-Z ]/;
    return nameRegEx.test(name);
}

//Check validity of email
function isValidEmail (email)
{
    const emailRegEx = /^\w+@\w+\.com$/;
    return emailRegEx.test(email);
}

//Check validity of activities
function isValidActivities ()
{
    if (totalCost !== 0)
        return true;
    else
        return false;
}

//Check validity of Credit Card
function isValidCredit (ccNum, cvv, zip)
{
    return (isValidCcNum(ccNum) && isValidCvv(cvv) && isValidZip(zip));
}

//Check validity of Credit Card Number
function isValidCcNum (ccNum)
{
    const numRegEx = /^\d{13,16}$/;
    return numRegEx.test(ccNum);
}

//Check validity of CVV
function isValidCvv (cvv)
{
    const cvvRegEx = /^\d{3}$/;
    return cvvRegEx.test(cvv);
}

//Check validity of Zip Code
function isValidZip (zip)
{
    const zipRegEx = /^\d{5}$/;
    return zipRegEx.test(zip);
}

//Check validity of Other Job Title
function isValidOtherTitle ()
{
    const otherRegEx = /[a-zA-Z ]/;
    const otherTitle = $('#other-title').text();
    return (otherRegEx.test(otherTitle) && $('#other-title').text() !== '');
}

//Check validity of theme
function isValidTheme()
{
    return !($('#design option').eq(0).text() === 'Select Theme');
}

//Dynamically slideDown name error label if empty or invalid
function displayNameError (name)
{
    if (registerClicked)
        location.hash = 'alpha'; location.hash = '#top';
    //For no name entered
    if (name.length === 0)
    {
        $('#name').addClass("error");
        $('#enter-name').text('Please enter a name!');
        $('#enter-name').slideDown();
    } 
    //For incorrect name entered
    else if (!isValidName(name))
    {
        $('#name').addClass("error");
        $('#enter-name').text('Please enter a valid name!');
        $('#enter-name').slideDown();
    }
    registerClicked = false;
}

//Dynamically slideDown email error label if empty or invalid
function displayEmailError (email)
{
    if (registerClicked)
        location.hash = 'alpha'; location.hash = '#top';
    //For no email entered
    if (email.length === 0)
    {
        $('#mail').addClass("error");
        $('#enter-email').text('Please enter an email id!');
        $('#enter-email').slideDown();
    }
    //For incorrect email entered
    else if (!isValidEmail(email))
    {
        $('#mail').addClass("error");
        $('#enter-email').text('Please enter a valid email id!');
        $('#enter-email').slideDown();
    }
    registerClicked = false;
}

//Dynamically slideDown other title error label if empty or invalid
function displayOtherTitleError (otherTitle)
{
    if (registerClicked)
        location.hash = 'alpha'; location.hash = '#top';
    //For no other title entered
    if ($('#title').val() === 'other' &&  otherTitle.length === 0)
    {
        $('#other-title').addClass("error");
        $('#enter-otherTitle').text("Please enter a job title!");
        $('#enter-otherTitle').slideDown();
    }
    //For incorrect other-title entered
    else if ($('#title').val() === 'other' && !isValidOtherTitle())
    {
        $('#other-title').addClass("error");
        $('#enter-otherTitle').text('Please enter a valid job title!');
        $('#enter-otherTitle').slideDown();
    }
    registerClicked = false;
}

function displayThemeError ()
{
    if (!isValidTheme())
        $('#enter-theme').slideDown();
}

function displayActError()
{
    if (!isValidActivities())
        $('#select-act').slideDown();
}

function displayCreditError()
{
    if(!isValidCredit())
        $('#error-cc').slideDown();
}

//////////////////
//////EVENTS//////
//////////////////

//To show/hide Other Job Profile
$('#title').on('change', (e) => 
{ 
    if ($('#title').val() === "other")
        $('#other-title').slideDown();
    
    else
        $('#other-title').slideUp();
});

//To update color field
$('#design').on('change', (e) => 
{ 
    $('#colors-js-puns').slideDown();
    if ($('#design').val() === "js puns")
        showJsPuns();
    
    else if ($('#design').val() === "heart js")
        showHeartJs();
    
    else
        $('#colors-js-puns').slideUp();
});

// Checking checkboxes
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

///////////////////
//Form submission//
///////////////////

$('form').submit((e) => 
{    
    e.preventDefault();
    registerClicked = true; //Flag to scroll up only when Register is clicked
    const name = $('#name').val();
    const email = $('#mail').val();
    const otherTitle = $('#other-title')
    const ccNum = $('#cc-num').val();
    const cvv = $('#cvv').val();
    const zip = $('#zip').val();
    
    //Conditional error messages
    displayNameError(name);
    displayEmailError(email);
    displayOtherTitleError(otherTitle);
    displayThemeError();
    displayActError();
    displayCreditError();
    
    //No error labels for these, only styling
    if (!isValidCcNum())
        $('#cc-num').addClass("error");
    if (!isValidZip())
        $('#zip').addClass("error");
    if (!isValidCvv())
        $('#cvv').addClass("error");
});

//Hide error label and styling on click
$('#name').click((e) => {
    if ($('#name').attr("class") === "error")
        {
            $('#name').removeClass("error");
            $('#enter-name').slideUp();
        }
});

//Hide error label and styling on click
$('#mail').click((e) => {
    if ($('#mail').attr("class") === "error")
        {
            $('#mail').removeClass("error");
            $('#enter-email').slideUp();
        }
});

//Hide error label and styling on click
$('#other-title').click((e) => {
    if ($('#other-title').attr("class") === "error")
        {
            $('#other-title').removeClass("error");
            $('#enter-otherTitle').slideUp();
        }
});

//Hide error label and styling on click
$('#design').click((e) => {
                $('#enter-theme').slideUp();
});

//Hide error label and styling on click
$('.activities label').click((e) => {
                $('#select-act').slideUp();
});

//Hide error label and styling on click
$('.credit-card').click((e) => {
                $('#error-cc').slideUp();
});

//Hide error label and styling on click
$('#cc-num').click((e) => {
    if ($('#cc-num').attr("class") === "error")
        {
            $('#cc-num').removeClass("error");
            $('#cc-num').val('');
        }
});

//Hide error label and styling on click
$('#zip').click((e) => {
    if ($('#zip').attr("class") === "error")
        {
            $('#zip').removeClass("error");
            $('#zip').val('');
        }
});

//Hide error label and styling on click
$('#cvv').click((e) => {
    if ($('#cvv').attr("class") === "error")
        {
            $('#cvv').removeClass("error");
            $('#cvv').val('');
        }
});

//////////////
//FOCUS OUTS//
//////////////

$('#name').focusout((e) => {
    setTimeout(function() { 
        const name = $('#name').val();
        displayNameError(name);}, 200);
});

$('#mail').focusout((e) => {
    setTimeout(function() { 
        const email = $('#mail').val();
        displayEmailError(email);}, 200);
});

$('#other-title').focusout((e) => {
    setTimeout(function() { 
        const otherTitle = $('#other-title').val();
        displayOtherTitleError(otherTitle);}, 200);
});