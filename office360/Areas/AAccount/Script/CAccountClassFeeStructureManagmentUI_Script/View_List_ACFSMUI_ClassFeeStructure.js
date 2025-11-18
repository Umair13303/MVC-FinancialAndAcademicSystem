/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: TABLE BM_BRANCH                  **----------------------------------------------*/
var table = "";

/*----------------------------------** FUNCTION FOR::PAGE LOADER                                    **----------------------------------------------*/
$(document).ready(function () {
    InitDataTable();
    ChangeCase();
});

/*----------------------------------** FUNCTION FOR::DATA TABLE & OPERATION                         **----------------------------------------------*/
function InitDataTable() {
    var ParentGroupColumn = 4;
    table = $('#MainTableACFSM_ClassFeeStructure').DataTable({
        dom: '<"row"<"col-md-12"<"row"<"col-md-4"l><"col-md-4"B><"col-md-4"f>>>>' +
            '<"row"<"col-md-12"rt>>' +
            '<"row"<"col-md-5"i><"col-md-7"p>>',
        buttons: {
            buttons: [
                { extend: 'copy', className: 'btn' },
                { extend: 'csv', className: 'btn' },
                { extend: 'excel', className: 'btn' },
                { extend: 'print', className: 'btn' }
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
        "lengthChange": true,
        "columns": [
            { "data": null, "title": "#" },
            { "data": "GuID", "title": "GuID" },
            { "data": "Campus", "title": "Campus" },
            { "data": "Class", "title": "Class" },
            { "data": "Code", "title": "Code" },
            { "data": "Description", "title": "Description" },
            { "data": "ChallanMethod", "title": "Challan Method" },
            { "data": "WHTaxPolicy", "title": "WHTax Policy" },
            { "data": "NetFee", "title": "Net Fee" },
            { "data": "WithHoldingTax", "title": "WHTax" },
            { "data": "GrossFee", "title": "Gross Fee" },       
            {
                "data": null, "title": "Status", "defaultContent": "",
                "render": function (data, type, full, meta) {
                    return GetStatus(data["DocumentStatus"]);
                }
            },
        ],
        columnDefs: [
            { visible: false, targets: [0, 1, 2, 3,] },
            { "orderable": false, targets: [0, 1, 2, 3, 4, 5, 6] },
        ],
        order: [[ParentGroupColumn, 'asc']],
        drawCallback: function (settings) {
            DataTableGroupBy_Column_Detail(this, 'MainTableAFTM_FeeType', ['Campus','Class']);
        }
    });
    table.on('order.dt search.dt', function () {
        table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });

    }).draw();
}
/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER                             **----------------------------------------------*/
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

/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,LOAD)            **----------------------------------------------*/
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
    table.ajax.url((BasePath + "/AAccount/CAccountClassFeeStructureManagmentUI/GET_MT_ACFSM_CLASSFEESTRUCTURE_LIST_BY_SEARCHQUERY_FORDATATABLE?" + queryString)).load();
}