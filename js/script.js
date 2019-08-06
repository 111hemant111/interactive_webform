function showJsPuns()
{   
    $('#color').val("cornflowerblue");
    $('option[value="cornflowerblue"]').show();
    $('option[value="darkslategrey"]').show();
    $('option[value="gold"]').show();
    $('option[value="tomato"]').hide();
    $('option[value="steelblue"]').hide();
    $('option[value="dimgrey"]').hide();
}

function showHeartJs()
{
    $('#color').val("tomato");
    $('option[value="cornflowerblue"]').hide();
    $('option[value="darkslategrey"]').hide();
    $('option[value="gold"]').hide();
    $('option[value="tomato"]').show();
    $('option[value="steelblue"]').show();
    $('option[value="dimgrey"]').show();
}

function changeColorList ()
{
    $('option[value="cornflowerblue"]').text("Cornflower Blue");
    $('option[value="darkslategrey"]').text("Dark Slate Grey");
    $('option[value="gold"]').text("Gold");
    $('option[value="tomato"]').text("Tomato");
    $('option[value="steelblue"]').text("Steel Blue");
    $('option[value="dimgrey"]').text("Dim Grey");
}

$('#name').focus(); //Set focus to Name field
$('#other-title').hide(); //Hide Other Job Role input field
$('#colors-js-puns').hide(); //Hide color selection
changeColorList(); //Change the color options from Non-JS format to JS format.

$('#design').on('change', (e) => {
    if ($('#design').val() === "js puns")
        {
            $('#colors-js-puns').show();
            showJsPuns();
        }
        
    else if ($('#design').val() === "heart js")
        {
            $('#colors-js-puns').show();
            showHeartJs();
        }
    else
        $('#colors-js-puns').hide();
})