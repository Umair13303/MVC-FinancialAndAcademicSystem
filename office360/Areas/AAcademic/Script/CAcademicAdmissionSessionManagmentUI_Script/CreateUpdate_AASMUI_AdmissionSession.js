/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE BM_BRANCH **-----------------------------------------------*/
var OperationType = "";
var DDL_Condition = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;



/*----------------------------------** FUNCTION FOR::PAGE LOADER **------------------------------------------------------------------------------*/
$(document).ready(function () {
    DB_OperationType = $('#HiddenFieldDB_OperationType').val();
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            $('#DivButtonSubmitDown').show();
            $('#DivButtonUpdateDown').hide();
            break;
        case DBOperation.UPDATE:
           // GET_ACM_CLASS_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
    PopulateDropDownLists();
    ChangeCase();

});

function PopulateDropDownLists() {
    PopulateMT_BM_Branch_ListByParam();
}

/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER **-----------------------------------------------------------------------*/
function ChangeCase() {
    //-----------FOR ::EDIT CASE
    $('#DropDownListAdmissionSession').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_MAIN-- STORED PROCEDURE **----------------------------------------------*/
function PopulateMT_BM_Branch_ListByParam() {
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.BM_BRANCH_BY_ALLOWEDBRANCHIDS_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.BM_BRANCH_BY_ALLOWEDBRANCHIDS_FORUPDATERECORD;
            break;
    }
    var JsonArg = {
        DB_IF_PARAM: DDL_Condition,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicAdmissionSessionManagmentUI/GET_MT_BM_BRANCH_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListCampus").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}


/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY **----------------------------------------------*/


/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR) **----------------------------------------------*/
function ClearInputFields() {
    //-----------NOT CLEARING REQUIRED FIELD
    $('.form-control').not('#DropDownListAdmissionSession').val('');
    $('.select2').not('#DropDownListAdmissionSession').val('-1').change();
    $('form').removeClass('Is-Valid');
}

/*----------------------------------** FUNCTION FOR:: UPDATE BRANCH (LOAD DROPDOWN,DATA FOR ADMISSIONSESSIONID) **-----------------------------------------*/
