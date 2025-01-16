-----------ALL DATA TABLE
function InitDataTable() {
    table = $('#MainTableFeeChallanDetail').DataTable({
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
        "responsive": true, "ordering": false,
        "processing": true, "pagination": false,
        "paging": false,
        "columns": [
            { "data": null, "title": "#", "orderable": false, },
            { "data": "FeeName", "title": "Description" },
            { "data": "FeeAmount", "title": "Amount (PKR)" },
            { "data": "FeeTypeId", "title": "FeeTypeId" },
        ],
        columnDefs: [
            { visible: false, targets: [3] },
        ],
    });
    table.on('draw', function () {
        CalcBoxDataTable();
    });
    table.on('order.dt search.dt', function () {
        table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });

    }).draw();
    addDataTableFooter(
        table, 1, "TDTotalFeeExclusiveAmount", "Recievable Fee", 1);


}
$('#ButtonPreviewFeeChallan').click(function (event) {
    event.preventDefault();

    var IsValid = true;
    if (IsValid) {
        try {
            var CampusId = $('#DropDownListCampus :selected').val();
            var SessionId = $('#DropDownListSession :selected').val();
            var ClassId = $('#DropDownListClass :selected').val();
            var JsonArg = {
                DB_IF_PARAM: PARAMETER.DB_IF_Condition.ACCFEESTRUCTUREDETAIL_GET_INFO_NEW_STUDENT,
                CampusId: CampusId,
                SessionId: SessionId,
                ClassId: ClassId
            };



            var queryString = $.param(JsonArg);
            var url = `${BasePath}/AStudent/MEnrollmentUI/GET_MT_ACCFEESTRUCTUREDETAIL_BYPARAMETER?${queryString}`;
            table.ajax.url(url).load();
        } catch (err) {
            GetMessageBox(err.message || 'An error occurred', 500);
        }
    }
});
function GET_ACCFEESTRUCTUREDETAIL_DETAILBYID() {
    var SessionId = $('#DropDownListSession :selected').val();
    var ClassId = $('#DropDownListClass :selected').val();
    if (ClassId != null && ClassId != undefined && ClassId != "" && ClassId != "-1") {
        var JsonArg = {
            DB_IF_PARAM: PARAMETER.DB_IF_Condition.ACCFEESTRUCTUREDETAIL_GET_INFO_NEW_STUDENT,
            SessionId: SessionId,
            ClassId: ClassId,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/AStudent/MEnrollmentUI/GET_MT_ACCFEESTRUCTUREDETAIL_BYPARAMETER",
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                table.clear().draw();
                if (data.length > 0) {
                    for (var i in data) {


                        var row_data = [];
                        row_data[0] = '';
                        row_data[1] = data[i].FeeName;
                        row_data[2] = data[i].FeeAmount.toFixed(2);
                        row_data[3] = data[i].FeeTypeId;


                        table.row.add(row_data);
                    }
                    table.draw();

                }
            },
            complete: function () {
                stopLoading();
            },
        });

    }
}


function CalcBoxDataTable() {
    var TotalFeeExclusiveAmount = table.column(2).data().reduce(function (a, b) {
        return parseFloat(a) + parseFloat(b);
    }, 0);

    $('#TDTotalFeeExclusiveAmount').text(TotalFeeExclusiveAmount.toFixed(2));
}
-----------LOAD ENTERY RECORD :: CHALLAN SETTING FOR SELECTED CAMPUS
function GET_GENERALBRANCH_DETAILBYID() {
    var CampusId = $('#DropDownListCampus :selected').val();
    if (CampusId != null && CampusId != undefined && CampusId != "" && CampusId != "-1") {

        var JsonArg = {
            Id: CampusId,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/ACompany/MAcademicSessionUI/GET_MT_GENERALBRANCH_DETAILBYID",
            dataType: 'json',
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                if (data.length == undefined) {
                }
                else {
                    GET_GENERALBRANCH_CHALLANSETTING(data[0].ChallanMethodId);
                }
            },
            complete: function () {
                stopLoading();
            },
        });
    }
}
function GET_GENERALBRANCH_CHALLANSETTING(ChallanMethodId) {
    var ChallanMethodId_ = (ChallanMethodId == (-1) || ChallanMethodId == undefined || ChallanMethodId == "") ? 0 : ChallanMethodId;
    var JsonArg = {
        Id: ChallanMethodId_,
        DB_IF_PARAM: PARAMETER.DB_IF_Condition.CHALLANMETHOD_LIST_BY_ID,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/MAcademicSessionUI/GET_LK1_CHALLANMETHOD_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            ChallanNumberForCampus = data[0].ChallanNo;
            InsertDataInto_SessionDetailTable();
        },
        complete: function () {
            stopLoading();
        },
    });
}


function FN_GENERALBRANCHSETTING_INFO_BY_CAMPUSID() {
    var CampusId = $('#DropDownListCampus :selected').val();
    if (CampusId != null && CampusId != undefined && CampusId != "" && CampusId != "-1") {

        var JsonArg = {
            CampusId: CampusId,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/ACompany/MAcademicSessionUI/FN_GENERALBRANCHSETTING_INFO_BY_CAMPUSID",
            dataType: 'json',
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                if (data.length == undefined) {
                }
                else {
                    ChallanNumberForCampus = data[0].AllowedChallanNo;
                    InsertDataInto_SessionDetailTable();
                }
            },
            complete: function () {
                stopLoading();
            },
        });
    }
}