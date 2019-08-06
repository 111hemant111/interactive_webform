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

function hideConflicting (selectedEvent, selection)
{
    const $actList = $('.activities label');
    
    let i;
    for (i = 0; i < 7; i++)
        {
            if ($actList.eq(i).children().eq(0).attr("name") !== selectedEvent.name && 
                $actList.eq(i).children().eq(0).attr("data-day-and-time") === $(selectedEvent).attr("data-day-and-time") && 
                selection)
                {
                    $actList.eq(i).children().eq(0).attr("disabled", true);
                    $actList.eq(i).addClass("disabled");
                }
            
            if ($actList.eq(i).children().eq(0).attr("name") !== selectedEvent.name && 
                $actList.eq(i).children().eq(0).attr("data-day-and-time") === $(selectedEvent).attr("data-day-and-time") && 
                !selection)
                {
                    $actList.eq(i).children().eq(0).attr("disabled", false);
                    $actList.eq(i).removeAttr("class");
                }
        }
    
}

$('#name').focus(); //Set focus to Name field
$('#other-title').hide(); //Hide Other Job Role input field
$('#colors-js-puns').hide(); //Hide color selection
changeColorList(); //Change the color options from Non-JS format to JS format.


//EVENTS
$('#title').on('change', (e) => { //To show/hide Other Job Profile
    if ($('#title').val() === "other")
            $('#other-title').slideDown();
    else
        $('#other-title').slideUp();
});

$('#design').on('change', (e) => { //To update color field
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
});

$('.activities').click((e) => {
    const selectedEvent = e.target;
    const selection = event.target.checked;
    if (selectedEvent.name !== undefined)
        hideConflicting(selectedEvent, selection);
});

