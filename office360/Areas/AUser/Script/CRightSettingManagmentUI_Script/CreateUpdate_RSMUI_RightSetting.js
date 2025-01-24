/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE RSM_RIGHTSETTING **-----------------------------------------------*/
var OperationType = "";
var DDL_Condition = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;


/*----------------------------------** FUNCTION FOR::PAGE LOADER **------------------------------------------------------------------------------------*/
$(document).ready(function () {
    DB_OperationType = $('#HiddenFieldDB_OperationType').val();
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            $('#DivButtonSubmitDown').show();
            $('#DivButtonUpdateDown').hide();
            break;
        case DBOperation.UPDATE:
      //      GET_UM_USER_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
    PopulateDropDownLists();
    //ChangeCase();

});

function PopulateDropDownLists() {
    PopulateLK_Right_List();
    PopulateLK_URLType_List();
    PopulateMT_CM_Company_ListByParam();
}
function ChangeCase() {

    //-----------FOR ::EDIT CASE
    $('#DropDownListRight').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY **----------------------------------------------------*/

function PopulateLK_Right_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AUser/CRightSettingManagmentUI/GET_LK1_RIGHT",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListRight").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_URLType_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AUser/CRightSettingManagmentUI/GET_LK1_URLTYPE",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListURLType").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_MAIN-- STORED PROCEDURE **----------------------------------------------*/

function PopulateMT_CM_Company_ListByParam() {
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.CM_COMPANY_BY_SOLUTION_DEVELOPER_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.CM_COMPANY_BY_SOLUTION_DEVELOPER_FORUPDATERECORD;
            break;
    }
    var JsonArg = {
        DB_IF_PARAM: DDL_Condition,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AUser/CRightSettingManagmentUI/GET_MT_CM_COMPANY_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListCompany").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });

}

/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR) **----------------------------------------------*/
function ValidateInputFields() {

    if ($('#TextBoxName').RequiredTextBoxInputGroup() == false) {
        return false;
    }
}
$('#ButtonSubmitDown').click(function (event) {
    event.preventDefault();
    var IS_VALID = ValidateInputFields();
    if (IS_VALID) {
        try {
            OperationType = DBOperation.INSERT;
            UpSertDataIntoDB();
        }
        catch {
            GetMessageBox(err, 505);
        }
    }
});
$('#ButtonUpdateDown').click(function (event) {
    event.preventDefault();
    var IS_VALID = ValidateInputFields();
    if (IS_VALID) {
        try {
            OperationType = DBOperation.UPDATE;
            UpSertDataIntoDB();
        }
        catch {
            GetMessageBox(err, 505);
        }
    }
});
function UpSertDataIntoDB() {

    var Remarks = $('#TextBoxRemarks').val();
    var RightSettingGuID = $('#HiddenFieldRightSettingGuID').val();

    var JsonArg = {
        GuID: RightSettingGuID,
        OperationType: OperationType,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AUser/CRightSettingManagmentUI/UpSert_Into_RSM_RightSetting",
        dataType: 'json',
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            GetMessageBox(data.Message, data.StatusCode);
        },
        complete: function () {
            ClearInputFields();
            stopLoading();
        },
        error: function (jqXHR, error, errorThrown) {
            GetMessageBox("The Transaction Can Not Be Performed Due To Serve Activity", 500);
        },
    });

}
function ClearInputFields() {
    //-----------NOT CLEARING REQUIRED FIELD
    $('.form-control').not('#DropDownListRightSetting').val('');
    $('.select2').not('#DropDownListRightSetting').val('-1').change();
    $('form').removeClass('Is-Valid');
}