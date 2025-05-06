/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: TABLE BM_BRANCH **-----------------------------------------------*/

var table = "";

/*----------------------------------** FUNCTION FOR::PAGE LOADER **------------------------------------------------------------------------------*/

$(document).ready(function () {
    InitDataTable();
    ChangeCase();
});

/*----------------------------------** FUNCTION FOR::DATA TABLE & OPERATION **------------------------------------------------------------------------------*/

function InitDataTable() {
    var ParentGroupColumn = 1;

    table = $('#MainTableUM_User').DataTable({
        dom: '<"row"<"col-md-12"<"row"<"col-md-6"B><"col-md-6"f> > ><"col-md-12"rt> <"col-md-12"<"row"<"col-md-5"i><"col-md-7"p>>> >',
        buttons: {
            buttons: [
                { extend: 'copy', className: 'btn' },
                { extend: 'csv', className: 'btn' },
                { extend: 'excel', className: 'btn' },
                { extend: 'print', className: 'btn' },
            ]
        },
        "oLanguage": {
            "oPaginate": {
                "sPrevious": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
                "sNext": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
            },
            "sInfo": "Showing page _PAGE_ of _PAGES_",
            "sSearch": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
            "sSearchPlaceholder": "Search...",
            "sLengthMenu": "Results :  _MENU_"
        },
        "responsive": true,
        "ordering": true,
        "processing": true,
        "lengthMenu": [5,10, 25, 50, 75, 100],
        "columns": [
            {
                "title": "", "data": null, "defaultContent": '',
                "render": function (data, type, row) {
                    return GetDetailControlBtn("Detail_UserRight");
                }
            },
            { "data": null, "title": "#" },
            { "data": "Branch", "title": "Branch" },
            { "data": "Company", "title": "Company" },
            { "data": "Name", "title": "Name" },
            { "data": "UserName", "title": "User Name" },
            { "data": "EmailAddress", "title": "Email" },
            { "data": "MobileNumber", "title": "Mobile" },
            {
                "data": null, "title": "Status", "defaultContent": "",
                "render": function (data, type, full, meta) {
                    return GetStatus(data["DocumentStatus"]);
                }
            }, 
            { "data": "GuID", "title": "GuID" },

        ],
        columnDefs: [
            //{ visible: false, targets: [6,5,4] },
            { "orderable": false, targets: [0, 1, 2, 3, 4, 5, 6,7,8] },
        ],
        "createdRow": function (row, data, index) {
        },
        order: [[ParentGroupColumn, 'asc']],
        drawCallback: function (settings) {
            DT_GroupBy_ForTableWithSubDetail(this, settings, '#MainTableURM_UserRight', ['Company', 'Branch',]);
        }

    });
    table.on('order.dt search.dt', function () {
        table.column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();

    $('#MainTableUM_User tbody').on('click', '.Detail_UserRight', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            $('div.slider', row.child()).slideUp(300, function () {
                row.child.hide();
                tr.removeClass('shown');
            });
        } else {
            if (!row.child.isShown()) {
                row.child('<div class="slider" style="display: none;"></div>', 'no-padding').show();
                tr.addClass('shown');
                Init_DetailDataTable(row.data(), row.child().find('.slider'));
            }

            $('div.slider', row.child()).slideDown(300);
        }
    });
}
function Init_DetailDataTable(Data, container) {
    $.ajax({
        type: "POST",
        url: BasePath + "/AUser/CUserRightManagmentUI/GET_MT_URM_USERRIGHT_LIST_BY_USERID_SEARCHQUERY_FORDATATABLE",
        data: { 'PostedData': Data },
        beforeSend: function () {
            startLoading();
        },
        success: function (response) {
            let tableRows = '';
            if (response.length > 0) {
                response.forEach((item, index) => {
                    tableRows += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.DisplayName}</td>
                            <td>${item.FormName}</td>
                            <td>${GetStatus(item.DocumentStatus)}</td>
                        </tr>`;
                });
            } else {
                tableRows = `<tr><td colspan="4" class="text-center">No rights assigned.</td></tr>`;
            }

            const tableHtml = `
                <table width="100%" class="table  table-sm ">
                    <thead>
                        <tr class="info">
                            <th>#</th>
                            <th>Right Name</th>
                            <th>Server Side Form</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>`;

            container.html(tableHtml);
        },
        complete: function () {
            stopLoading();
        },
        error: function () {
            container.html('<p class="text-danger">Failed to load user rights.</p>');
            stopLoading();
        }
    });
}



/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER **-----------------------------------------------------------------------*/

function ChangeCase() {
    $('#DropDownListSearchBy').change(function (event) {
        event.preventDefault();
        var SearchBy = $('#DropDownListSearchBy :selected').val();
        if (SearchBy == 1) {
            $('#TextBoxQueryString').prop('disabled', true);
        }
        else {
            $('#TextBoxQueryString').prop('disabled', false);
        }
    });
}


/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,LOAD) **----------------------------------------------*/
$('#ButtonSearch').click(function (event) {
    event.preventDefault();
    var IsValid = true;
    if (IsValid) {
        try {
            DrawDataTable();

        }
        catch {
            GetMessageBox(err, 500);
        }
    }
});
function DrawDataTable() {
    var SearchById = $('#DropDownListSearchBy :selected').val();
    var InputText = $('#TextBoxQueryString').val();
    var JsonArg = {
        SearchById: SearchById,
        InputText: InputText,
    };
    var queryString = $.param(JsonArg);
    table.ajax.url((BasePath + "/AUser/CUserRightManagmentUI/GET_MT_UM_USER_LIST_BY_SEARCHQUERY_FORDATATABLE?" + queryString)).load();
}