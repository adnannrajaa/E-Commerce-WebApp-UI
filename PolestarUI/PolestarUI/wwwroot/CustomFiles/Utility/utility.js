//............................................................................Send AjaxRequest Without Object/parameter
//...................................................Recommanded for Get Request
SendAjaxRequest = (ApiUrl, RequestType) =>
{
    let ajaxConfig = {
        url: ApiBaseUrl(ApiUrl),
        type: RequestType,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("UserToken"));
        },
        success: (response) => {
            return response;
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            return errorThrown;
        }
    }

    $.ajax(ajaxConfig)

}

//............................................................................Send AjaxRequest With Object/parameter
//...................................................Recommanded for all other requests excepts Get Request


SendAjaxRequestWithObject = (ApiUrl, RequestType , Object) => {
    let ajaxConfig = {
        url: ApiBaseUrl(ApiUrl),
        type: RequestType,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(Object),
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("UserToken"));
        },
        success: (response) => {
            return response;
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            return errorThrown;
        }
    }

    $.ajax(ajaxConfig)

}

//............................................................................Section Textbox/Labels/div handling

//..................return Textbox Value
let getTextboxValue = (selector) => {
    return $.trim($(selector).val())
}

//..................Put Value into Textbox
let putValueIntoTextbox = (selector, value) => {
    $(selector).val(value)
}

//..................Reset Textbox value
let resetTextbox = (selector) => {
    $(selector).val('')
}

//..................Reset Textbox value with value assign by user
let resetTextboxWithCustomValue = (selector, value) => {
    $(selector).val(value)
}

//...........................................select Value From dropdown
let selectValueFromDropdown = (selector) => {
    return $(`${selector} option:selected`).val()
}

//..................Change Main Page Title
let CurrentPageTitle = (title, openPage) => {
    $("#currentPage").text(title)
    if (openPage != null) {
        $("#slash").removeAttr("hidden")
        $("#openPage").text(openPage)
    }
}


//..................Put Value into Label
let putValueIntoLabels = (selector, value) => {
    $(selector).text(value)
}

//..................Get Value From Label
let getValueFromLabel = (selector) => {
    return $(selector).text()
}


//............................................................................Section Notifications
//..................Show Error Message
let showErrorMessage = (selector, message) => {
    $(selector).removeAttr('hidden')
    $(selector).text(message)
    setTimeout(() => {
        $(selector).text('');
        $(selector).attr('hidden', 'hidden');
    }, 2000);
}

//..................Show error of Ajax Response Message
let RedirectAccordingToError = (errorThrown) => {
    if (errorThrown == "Unauthorized") {
        window.location = "/Account/Accounts/UnAuthorized"
    } else if (errorThrown == "Not Found") {
        window.location = "/Account/Accounts/Login"
    } else if (errorThrown == "Forbidden") {
        window.location = "/Account/Accounts/UnAuthorized"
    }
    else {
        console.log(errorThrown);
    }
}



//............................................................................Section Date Time 

//................. Datepicker format like Dec 17 2019
$('.datepickerDEC')[0] && $('.datepickerDEC').each(function () {
    $('.datepickerDEC').datepicker({
        disableTouchKeyboard: true,
        autoclose: true,
        format: "M dd yyyy"

    });
});

//................. Datepicker format like Dec 2019
$('.datepicker1')[1] && $('.datepicker1').each(function () {
    $('.datepicker1').datepicker({
        disableTouchKeyboard: true,
        autoclose: true,
        minViewMode: 'months',
        viewMode: 'months',
        pickTime: false,
        format: "M yyyy"
    });
});

//................. Datepicker format like Dec 2019
$('.datepickerGetMonth')[1] && $('.datepickerGetMonth').each(function () {
    $('.datepickerGetMonth').datepicker({
        disableTouchKeyboard: true,
        autoclose: true,
        minViewMode: 'months',
        viewMode: 'months',
        pickTime: false,
        format: "M yyyy"

    });
});

//.............Get Time Using Moment
let momentTime = (value) => {
    return moment(value).format("LT")
}

//.............Get date Using MomentFormat
let momentDate = (value) => {
    return moment(value).format("MMM DD YYYY")
}
//.............moment human readable Date
let momentHumanDate = (value) => {
    return moment(value).fromNow();
}

//.............Get date Using MomentFormat like Dec
let momentMonth = (value) => {
    return moment(value).format("MMM")
}

//..............................Get Comming month with year
let commingMonth = () => {
    var now = new Date();
    if (now.getMonth() == 11) {
        var current = new Date(now.getFullYear() + 1, 0, 1);
        return current;
    } else {
        var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        return current;
    }
}

//............................................................................Section Custom validtions(Email/Mobile)

//...............Email Format Verification
let email_validate = (value) => {
    let email = value
    var regexPattern = new RegExp(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/);    // regular expression pattern
    let isValid = regexPattern.test(email);
    if (!isValid) {
        return false;
    }
    return true;
}

//..........................Contact validation 
let contact_validate = (value) => {
    let contact = value
    var regexPattern = new RegExp(/^\d{4}[- ]?\d{7}$/);    // regular expression pattern
    let isValid = regexPattern.test(contact);
    if (!isValid) {
        return false;
    }
    return true;
}

//............................................................................Section Table Pagenation

// .................... pager
function Pager(tableName, itemsPerPage) {

    this.tableName = tableName;

    this.itemsPerPage = itemsPerPage;

    this.currentPage = 1;

    this.pages = 0;

    this.inited = false;

    this.showRecords = function (from, to) {

        var rows = document.getElementById(tableName).rows;

        // i starts from 1 to skip table header row

        for (var i = 1; i <= rows.length - 1; i++) {

            if (i < from || i > to)

                rows[i].style.display = 'none';

            else

                rows[i].style.display = '';

        }

    }

    this.showPage = function (pageNumber) {

        if (!this.inited) {

            alert("not inited");

            return;

        }

        var oldPageAnchor = document.getElementById(`pg${tableName}` + this.currentPage);

        oldPageAnchor.className = 'page-item';

        this.currentPage = pageNumber;

        var newPageAnchor = document.getElementById(`pg${tableName}` + this.currentPage);

        newPageAnchor.className = 'page-item active';

        var from = (pageNumber - 1) * itemsPerPage + 1;

        var to = from + itemsPerPage - 1;

        this.showRecords(from, to);

    }

    this.prev = function () {

        if (this.currentPage > 1)

            this.showPage(this.currentPage - 1);

    }

    this.next = function () {

        if (this.currentPage < this.pages) {

            this.showPage(this.currentPage + 1);

        }

    }

    this.init = function () {

        var rows = document.getElementById(tableName).rows;

        var records = (rows.length - 1);

        this.pages = Math.ceil(records / itemsPerPage);

        this.inited = true;

    }

    this.showPageNav = function (pagerName, positionId) {

        if (!this.inited) {

            alert("not inited");

            return;

        }

        var element = document.getElementById(positionId);
        var pagerHtml = `<li class="page-pre" title="Previous" style="cursor:pointer" onclick="${pagerName}.prev();">
          <a class="page-link">‹</a>
</li>
`

        for (var page = 1; page <= this.pages; page++)
            pagerHtml += `<li style="cursor:pointer"  class="page-number" id="pg${tableName}${page}" onclick="${pagerName}.showPage(${page});"><a class="page-link">${page}</a></li>`

        pagerHtml += `<li style="cursor:pointer" title="Next" class="page-next"  onclick="${pagerName}.next();">
                    <a class="page-link">›</a>
        </li >`
        element.innerHTML = pagerHtml;

    }

}

//...........................................................................Section Days Name With Id's

//.................get today by using day id
let getToday = (day) => {
    switch (day) {
        case 1:
            return "Monday"
            break;
        case 2:
            return "Tuesday"
            break;
        case 3:
            return "Wednesday"
            break;
        case 4:
            return "Thursday"
            break;
        case 5:
            return "Friday"
            break;
        case 6:
            return "Saturday";
            break;
        case 7:
            return "Sunday"
            break;
    }
}

//................................ReturnDayId by Using Day Name
let getDayID = (dayName) => {
    switch (dayName) {
        case "monday":
            return 1
            break;
        case "tuesday":
            return 2
            break;
        case "wednesday":
            return 3
            break;
        case "thursday":
            return 4
            break;
        case "friday":
            return 5
            break;
        case "saturday":
            return 6;
            break;
        case "sunday":
            return 7
            break;
    }
}



//............................................................................Section General

//..................show Modal
let showModal = (selector) => {
    $(selector).modal("show")
}
//..................Hide Modal
let hideModal = (selector) => {
    $(selector).modal("hide")
}

//.............add class active
let addClassActive = (selector) => {
    $(selector).addClass("active")
}

//.............Api Base Url
let ApiBaseUrl = (url) => {
    return `https://localhost:44376/${url}`
    // return `https://localhost:44346/${url}`
}


//$(`#TimeInInputHours option[value='${timeinhours}']`).attr("selected", "selected");
//$(`#TimeInInputMinutes option[value='${timeinmin}']`).attr("selected", "selected");

//$("#TimeInInputHours").prop('selectedIndex', timeinhours);
//$("#TimeInInputMinutes").prop('selectedIndex', timeinmin);