//------------ until all function in document.ready are fully loaded and render



//------------ BEFORE DOM LOADS
var select2Class = '.select2';
var phoneNumberClass = '.PhoneNumber';
var mobileNumberClass = '.MobileNumber';
var emailAddressClass = '.EmailAddress';
var cnicNumberClass = '.CNICNumber';
var ntnNumberClass = '.NTNNumber';

// Initialize Select2 and Input Masks
initializeSelect2(select2Class);
initializeInputMask(phoneNumberClass, AppliedMasking.Phone_Number);
initializeInputMask(mobileNumberClass, AppliedMasking.Mobile_Number);
initializeInputMask(emailAddressClass, AppliedMasking.Email_Address);
initializeInputMask(cnicNumberClass, AppliedMasking.CNIC_Number);
initializeInputMask(ntnNumberClass, AppliedMasking.NTN_Number);

// Initialize Select2 for a given class selector
function initializeSelect2(selector) {
    $(selector).select2();
}

// Initialize InputMask for a given class selector and mask pattern

function initializeInputMask(selector, maskPattern) {
    $(selector).inputmask(maskPattern);
}

//------------ VALIDATION METHOD :: WITH MESSAGE
$.fn.RequiredTextBoxInputGroup = function () {
    $(this).removeClass('is-invalid is-valid');
    $(this).css('border', ''); // Reset the border

    var labelText = '';
    var inputId = $(this).attr('id');
    var labelForInput = $('label[for="' + inputId + '"]');

    if (labelForInput.length) {
        labelText = labelForInput.text();
    }

    var $existingError = $(this).parent().next('.error'); // Check for existing error

    if ($(this).val() == null || $(this).val() == '' || $(this).val() == undefined) {
        var errorMessage = labelText + ' is required.';

        // Add the error only if it doesn't already exist
        if ($existingError.length === 0) {
            var $errorDiv = $('<div class="col-sm-12 error text-danger">' + errorMessage + '</div>');
            $(this).parent().after($errorDiv);

            // Scroll to the input field
            $(this)[0].scrollIntoView({ behavior: 'smooth', block: 'center' });

            setTimeout(function () {
                $errorDiv.remove();
            }, 5000);
        }

        $(this).addClass('is-invalid');
        return false;
    } else {
        // Remove the error if input is valid
        if ($existingError.length) {
            $existingError.remove();
        }
        $(this).addClass('is-valid');
        return true;
    }
};

$.fn.RequiredDropdown = function () {
    // Remove any existing validation messages and icons
    $(this).removeClass('is-invalid is-valid');
    $(this).css('border', ''); // Reset the border

    var labelText = '';
    // Find the label associated with this dropdown
    var inputId = $(this).attr('id');
    var labelForInput = $('label[for="' + inputId + '"]');
    if (labelForInput.length) {
        labelText = labelForInput.text();
    }

    if (!$(this).val() || $(this).val() == '-1') {
        // Create and display an error message dynamically
        var errorMessage = 'Please select a ' + labelText;
        var $errorDiv = $('<div class="col-sm-12 error text-danger">' + errorMessage + '</div>');

        // Insert the error message after the parent div of the dropdown
        $(this).closest('.form-group').after($errorDiv);

        $(this).addClass('is-invalid');

        // Scroll to the dropdown field
        $(this)[0].scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Remove the error message after 5 seconds
        setTimeout(function () {
            $errorDiv.remove();
        }, 5000);

        return false;
    } else {
        // Add success class
        $(this).addClass('is-valid');

        // Remove any existing error messages after success
        $(this).closest('.form-group').next('.error').remove();

        return true;
    }
};
function AjaxDropDownListFormat_PLAIN(item, fields = []) {
    if (!item.id) return item.text;

    let template = '<div style="padding: 5px; border-bottom: 0px solid #ddd;">';
    fields.forEach(field => {
        if (item[field]) {
            template += `<div><strong>${field.replace(/([A-Z])/g, ' $1')}: </strong> ${item[field]}</div>`;
        }
    });
    template += '</div>';

    return $(template);
}





//------------ UTTILITY BUTTON :: DATA TABLE
function GetStatus(Status) {
    var Badge = ""; // Initialize Badge variable to an empty string
    switch (Status) {
        case 1:
            BadgeColor = "primary"; // Bootstrap badge color
            Display = "Active Company";
            break;
        case 2:
            BadgeColor = "secondary"; // Bootstrap badge color
            Display = "Inactive Company";
            break;
        case 3:
            BadgeColor = "danger"; // Bootstrap badge color
            Display = "Deleted Company";
            break;
        case 4:
            BadgeColor = "primary"; // Bootstrap badge color
            Display = "Active User";
            break;
        case 5:
            BadgeColor = "secondary"; // Bootstrap badge color
            Display = "Inactive User";
            break;
        case 6:
            BadgeColor = "danger"; // Bootstrap badge color
            Display = "Deleted User";
            break;
        case 7:
            BadgeColor = "primary"; // Bootstrap badge color
            Display = "Active Right Setting";
            break;
        case 8:
            BadgeColor = "secondary"; // Bootstrap badge color
            Display = "Inactive Right Setting";
            break;
        case 9:
            BadgeColor = "primary"; // Bootstrap badge color
            Display = "Active User Right";
            break;
        case 10:
            BadgeColor = "secondary"; // Bootstrap badge color
            Display = "Inactive User Right";
            break;
        case 11:
            BadgeColor = "primary"; // Bootstrap badge color
            Display = "Active Branch";
            break;
        case 12:
            BadgeColor = "secondary"; // Bootstrap badge color
            Display = "Inactive Branch";
            break;
        case 13:
            BadgeColor = "danger"; // Bootstrap badge color
            Display = "Deleted Branch";
            break;
        case 14:
            BadgeColor = "primary"; // Bootstrap badge color
            Display = "Active Branch Setting";
            break;
        case 15:
            BadgeColor = "secondary"; // Bootstrap badge color
            Display = "Inactive Branch Setting";
            break;
        case 16:
            BadgeColor = "warning"; // Bootstrap badge color
            Display = "Expired Branch Setting";
            break;
        default:
            BadgeColor = "light"; // Default badge color
            Display = "Unknown Status";
            break;
    }
    var Label = '<td> <span class="badge badge-' + BadgeColor + '">' + Display + '</span></td>';
    return Label;
}
function GetViewbtn(url, title, text) {
    return "<td class='center'><a onclick=" + url + "  title='Click here to View " + title + "' class='btn btn-sm view'><i class='far fa-eye'></i> " + '' + "</a></td>";
}
function GetEditbtn(url, title, text) {
    return "<td class='center'><a onclick=" + url + "  title='Click here to Edit " + title + "' class='btn btn-sm edit'><i class='far fa-edit'></i> " + '' + "</a></td>";
}
function GetDeletebtn(url, title, text) {
    return "<td class='center'><a onclick=" + url + "  title='Click here to Delete " + title + "' class='btn btn-sm delete'><i class='far fa-trash-alt'></i> " + '' + "</a></td>";
}
function GetCheckBox_row(Id) {
    return '<td><div class="form-group"><div class="checkbox checbox-switch switch-success"><label><input type="checkbox" Id="IsChecked' + Id + '" /><span></span></label></div></div></td>';
}
function GetTextBox(Id) {
    debugger
    var inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.className = 'form-control date_masking';
    inputElement.placeholder = 'Please Enter End Date Here!';
    inputElement.id = Id;

    return inputElement; // Return the inputElement, not DatePicker
}
function DT_CaculateColumn(TableId, ColumnIndex) {
    var TotalSum = 0;
    $('#' + TableId + ' tbody tr').each(function () {
        var value = $(this).find('td').eq(ColumnIndex).find('input').val();
        TotalSum += parseFloat(value) || 0;
    });
    return TotalSum;
}

function DT_DropDownList(DataTableId, ListCondition, HTMLAttribute) {
    var Table = $('#' + DataTableId).DataTable();
    var DATA = [];

    Table.columns().every(function () {
        var column = this;
        var header = $(column.header());

        if (header.hasClass(ListCondition)) {
            DATA.push({
                Description: header.text().trim(),
                Id: column.index()
            });
        }
    });
    if (HTMLAttribute) {
        var dropdown = $('#' + HTMLAttribute);
        dropdown.empty();
        dropdown.append('<option value="-1">Select an option</option>');

        DATA.forEach(function (header) {
            dropdown.append('<option value="' + header.Id + '">' + header.Description + '</option>');
        });
    }
}
function DT_CalculationFooter(TableId, ColumnSpan, TableDivId, Header) {
    return new Promise((resolve) => {
        $('#' + TableId).append(
            '<tfoot disabled="disabled">' +
            '<tr>' +
            '<th>' + Header + '</th>' +
            '<td class="Headings" colspan="' + ColumnSpan + '"></td>' +
            '<td id="' + TableDivId + '"></td>' +
            '<td colspan="6"></td>' +
            '</tr>' +
            '</tfoot>'
        );
        resolve();
    });
}
function DT_CalculationFooter_New(table, columnSpan, footerId, headerText, orderId) {
    return new Promise((resolve) => {
        let footer = $('#' + table.table().container().id + ' tfoot');

        // Ensure footer section exists
        if (footer.length === 0) {
            $('#' + table.table().container().id).append('<tfoot></tfoot>');
            footer = $('#' + table.table().container().id + ' tfoot');
        }

        // Append row in the order defined by orderId
        footer.append(
            '<tr data-order-id="' + orderId + '">' +
            '<th>' + headerText + '</th>' +
            '<td colspan="' + columnSpan + '" class="Headings"></td>' +
            '<td id="' + footerId + '"></td>' +
            '<td colspan="6"></td>' +
            '</tr>'
        );

        // Sort footer rows by order ID for consistent ordering
        footer.find('tr').sort(function (a, b) {
            return $(a).data('order-id') - $(b).data('order-id');
        }).appendTo(footer);

        resolve(); // Resolve to proceed with the next footer
    });
}



function DT_GroupBy(TableAPI, Rows, TableId, ColumnNames, options = {}) {
    var LastGroupValues = new Array(ColumnNames.length).fill(null);
    var api = TableAPI.api();
    var rows = api.rows({ page: 'current' }).nodes();
    var columnCount = $(TableId).find('thead th').length;

    rows.each(function (row, index) {
        var data = api.row(row).data();
        var groupKey = ColumnNames.map(function (col) {
            return data[col];
        });

        var groupChanged = groupKey.some(function (value, idx) {
            return value !== LastGroupValues[idx];
        });

        if (groupChanged) {
            var groupRows = '';
            ColumnNames.forEach(function (col, idx) {
                var groupStyles = getColorForSequence(idx);
                var indent = idx === 0 ? '' : 'padding-left: 20px;';
                groupRows += `<tr class="${idx === 0 ? 'group' : 'subgroup'}">
                    <td colspan="${columnCount}" style="background-color: ${groupStyles.backgroundColor}; color: ${groupStyles.color}; border-color: ${groupStyles.borderColor}; ${indent}">
                        <b>${col}: </b>${groupKey[idx]}
                    </td>
                </tr>`;
            });

            $(row).before(groupRows);
            LastGroupValues = groupKey;
        }
    });
    function getColorForSequence(index) {
        const colors = [
            { backgroundColor: '#003366', color: '#FFFFFF', borderColor: '#F7DC6F' }, // Soft Yellow
            { backgroundColor: '#ADD8E6', color: '#000000', borderColor: '#48C9B0' }, // Soft Teal
            { backgroundColor: '#FAD7A0', color: '#000000', borderColor: '#F39C12' }, // Soft Peach

            // Add more color sets here for additional columns
        ];

        return colors[index] || { backgroundColor: '#BDC3C7', color: '#2C3E50', borderColor: '#95A5A6' }; // Default color
    }
}






//------------ BLOB OBJECT RESPONSER
function OpenReport(response, status, xhr) {
    var filename = "";
    var disposition = xhr.getResponseHeader('Content-Disposition');
    if (disposition && disposition.indexOf('attachment') !== -1) {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
    }
    var type = xhr.getResponseHeader('Content-Type');
    var blob = new Blob([response], { type: type });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        /*IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."*/
        window.navigator.msSaveBlob(blob, filename);
    } else {
        var URL = window.URL || window.webkitURL;
        var downloadUrl = URL.createObjectURL(blob);
        if (filename) {
            /*use HTML5 a[download] attribute to specify filename*/
            var a = document.createElement("a");
            /*safari doesn't support this yet*/
            if (typeof a.download === 'undefined') {
                window.location = downloadUrl;
            } else {
                a.href = downloadUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
            }
        } else {
            var windowVal = window.open(downloadUrl);/*openNewTabOrNewWindow(downloadUrl);*/
            //windowVal.document.write('<html><head><title>EXP-220601-0001</title></head><body height="100%" width="100%"><iframe src="' + downloadUrl + '" height="100%" width="100%"></iframe></body></html>');
            //if (windowVal.document) { }
            windowVal.opener = null;
            if (!windowVal) {
                mesgboxshow("error", "Please allow pop-ups for view report. <strong>How to allow pop-ups : <a target='_blank' href='https://support.mozilla.org/en-US/kb/pop-blocker-settings-exceptions-troubleshooting'><span>Click here<span></a></strong>");
            }
        }
        setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); /*cleanup*/
    }
}

//------------ UI ELEMENTS
function stopLoading() {
    setTimeout(function () {
        $.unblockUI();
    }, 1000);
}
function startLoading() {
    $.blockUI({
        message: 'Loading Please Wait',
        overlayCSS: {
            backgroundColor: '#1b2024',
            opacity: 0.8,
            zIndex: 1200,
            cursor: 'wait'
        },
        css: {
            border: 0,
            color: '#fff',
            zIndex: 1201,
            padding: 0,
            backgroundColor: 'transparent'
        }
    });
}
let messageBoxActive = false;

function GetMessageBox(message, status) {
    // Prevent showing a new message box if one is already shown
    if (messageBoxActive) {
        return;
    }

    messageBoxActive = true; // Set flag to true when a message box is displayed

    const messageContainer = $('#messageContainer');
    let alertClass, iconClass;

    // Determine the alert class and icon class based on the status
    switch (status) {
        case 200:
            alertClass = 'alert-primary';
            iconClass = 'success';
            break;
        case 404:
            alertClass = 'alert-info';
            iconClass = 'error';
            break;
        case 505:
            alertClass = 'alert-danger';
            iconClass = 'info';
            break;
        default:
            alertClass = 'alert-secondary';
            iconClass = 'info';
            break;
    }

    // Show the SweetAlert box
    Swal.fire({
        text: message,
        icon: iconClass
    }).then(() => {
        messageBoxActive = false; // Reset the flag when the message box is closed
    });

    // Optional: To show a custom HTML alert, you can enable the below code
    // const alertHtml = '<div class="alert border-0 ' + alertClass + ' bg-gradient m-b-30 alert-dismissible fade show border-radius-none" role="alert"><strong style="color:white">' + message + '</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><i class="' + iconClass + '"></i></button></div>';
    // messageContainer.html(alertHtml).fadeIn('slow').delay(7000).fadeOut();
}
function ErrorMessage(Message) {
    $.blockUI({
        message: Message,
        fadeIn: 800,
        timeout: 8000,
        overlayCSS: {
            backgroundColor: '#1b2024',
            opacity: 0.8,
            zIndex: 1200,
            cursor: 'wait'
        },
        css: {
            border: 0,
            color: '#fff',
            zIndex: 1201,
            padding: 0,
            backgroundColor: 'transparent'
        }
    });
}


//function NetDateToDTFormat(dotNetDate) {
//    if (!NetDateToDTFormat) {
//        return '';
//    }
//    var timestamp = parseInt(NetDateToDTFormat.substr(6));
//    var date = new Date(timestamp);
//    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//    var day = ("0" + date.getDate()).slice(-2);
//    var month = months[date.getMonth()]; 
//    var year = date.getFullYear();
//    return day + '-' + month + '-' + year;
//}
function GetDecimalValue(number) {
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//------------ DATE PICKER
const INITIALIZE_DATE_PICKER = (selector, options = {}) => {
    flatpickr(selector, options);
};

// Date pickers with custom options
INITIALIZE_DATE_PICKER('.DatePickerRange', { mode: "range", dateFormat: "Y-m-d" });
INITIALIZE_DATE_PICKER('.DatePickerSimple', { dateFormat: "Y-m-d", enableTime: false, noCalendar: false });
INITIALIZE_DATE_PICKER('.DatePickerSimple_Range', { dateFormat: "Y-m-d", enableTime: false, noCalendar: false });
INITIALIZE_DATE_PICKER('.DatePickerMonthYear', { dateFormat: "Y-m", enableTime: false, noCalendar: false });
INITIALIZE_DATE_PICKER('.DatePickerYear', { dateFormat: "Y", enableTime: false, noCalendar: false });
INITIALIZE_DATE_PICKER('.DatePickerTimer', { enableTime: true, noCalendar: true, dateFormat: "H:i", defaultDate: "13:45" });

function GET_DATEPICKER_FORUPDATE_INPUTFIELD(ServerDate, DateFormat, InputFieldId) {
    const ParseDate = new Date(parseInt(ServerDate.replace('/Date(', '').replace(')/', '')));
    const picker = flatpickr('#' + InputFieldId, {
        dateFormat: DateFormat,     // Set the display date format
        enableTime: false,       // Disable time selection
        noCalendar: false,
        defaultDate: ParseDate
    });
}
function GET_DATEPICKER_FORUPDATE_INTOLIST(ServerDate, DateFormat, InputFieldId, CSSClass) {
    const ParseDate = new Date(parseInt(ServerDate.replace('/Date(', '').replace(')/', '')));
    const FormattedDate = GET_FORMATED_DATE(ParseDate, DateFormat);
    const INPUT_ELEMENT = `<input id="${InputFieldId}" type="text" class="form-control form-control-sm ${CSSClass}" placeholder="${DateFormat}" value="${FormattedDate}" />`;
    const observer = new MutationObserver(() => {
        const inputField = document.getElementById(InputFieldId);

        if (inputField) {
            flatpickr(`#${InputFieldId}`, {
                dateFormat: DateFormat,
                enableTime: false,
                noCalendar: false,
                defaultDate: ParseDate
            });
            observer.disconnect(); 
        }
    });
    observer.observe(document.body, {
        childList: true, 
        subtree: true   
    });

    return INPUT_ELEMENT;
}

function GET_FORMATED_DATE(date, format) {
    return flatpickr.formatDate(date, format);
}

