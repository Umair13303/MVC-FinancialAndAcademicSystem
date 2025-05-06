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
            GET_URM_USERRIGHT_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
    PopulateDropDownLists();
    ChangeCase();
});


function PopulateDropDownLists() {
    PopulateLK_Right_List();
    PopulateMT_CM_Company_ListByParam();
}
function ChangeCase() {

    $('#DropDownListCompany').change(function () {
        PopulateMT_UM_User_ListByParam();
    });
    //-----------FOR ::EDIT CASE
    $('#DropDownListRightSetting').change(function () {
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
        url: BasePath + "/AUser/CUserRightManagmentUI/GET_LK1_RIGHT",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListRight").html(s);
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
        url: BasePath + "/AUser/CUserRightManagmentUI/GET_MT_CM_COMPANY_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListCompany").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });

}
function PopulateMT_UM_User_ListByParam() {
    var CompanyId = $('#DropDownListCompany :selected').val();
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.UM_USER_BY_COMPANYID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.UM_USER_BY_COMPANYID_FORUPDATERECORD;
            break;
    }
    var JsonArg = {
        CompanyId: CompanyId,
        DB_IF_PARAM: DDL_Condition,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AUser/CUserRightManagmentUI/GET_MT_UM_USER_BYPARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListUser").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });

}


/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR) **---------------------------------------------------*/
function ValidateInputFields() {
    if ($('#DropDownListCompany').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListUser').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListRight').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxRemarks').RequiredDropdown() == false) {
        return false;
    }

    return true;
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

    var CompanyId = $('#DropDownListCompany :selected').val();
    var UserId = $('#DropDownListUser :selected').val();
    var RightId = $('#DropDownListRight :selected').val();
    var Remarks = $('#TextBoxRemarks').val();
    var UserRightGuID = $('#HiddenFieldUserRightGuID').val();

    var JsonArg = {
        GuID: UserRightGuID,
        OperationType: OperationType,

        CompanyId: CompanyId,
        UserId: UserId,
        RightId: RightId,
        Remarks: Remarks,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AUser/CUserRightManagmentUI/UpSert_Into_URM_UserRight",
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


/*----------------------------------** FUNCTION FOR:: UPDATE COMPANY (LOAD DROPDOWN,DATA FOR USERID) **-----------------------------------------------*/
$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListUserRight').RequiredDropdown() == false) {
        return false;
    }
    else {
        GET_URM_USERRIGHT_INFOBYGUID();
    }
});
function GET_URM_USERRIGHT_LISTBYPARAM() {
    $('#DropDownListUserRight').empty();
    $('#DropDownListUserRight').select2({
        placeholder: 'Search By Right Name / Setting Code / User Name',
        minimumInputLength: 3,
        ajax: {
            url: BasePath + "/AUser/CUserRightManagmentUI/GET_MT_URM_USERRIGHT_BYPARAMETER_SEARCH",
            type: "POST",
            delay: 250,
            data: function (params) {
                return {
                    PostedData: {
                        SearchParameter: params.term,
                        DB_IF_PARAM: DOCUMENT_LIST_CONDITION.URM_USERRIGHT_BY_SEARCH_PARAMETER_UPDATEUSERRIGHT,
                    }
                };
            },
            beforeSend: function () {
                startLoading();
            },
            processResults: function (data) {
                return {
                    results: data.data.map(function (item) {
                        return {
                            id: item.GuID,
                            text: item.Description,
                            ClassDecor: item.Description,
                        };
                    })
                };
            },
            complete: function () {
                stopLoading();
            },
        },
    });
}
function GET_URM_USERRIGHT_INFOBYGUID() {
    var UserRightId = $('#DropDownListUserRight :selected').val();
    if (UserRightId != null && UserRightId != undefined && UserRightId != "" && UserRightId != "-1") {

        var JsonArg = {
            GuID: UserRightId,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/AUser/CUserRightManagmentUI/GET_MT_URM_USERRIGHT_INFOBYGUID",
            dataType: 'json',
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                $('#DropDownListCompany').val(data[0].CompanyId).change();
                $('#DropDownListRight').val(data[0].RightId).change();
                $('#DropDownListUser').val(data[0].UserId).change();

                $('#TextBoxRemarks').val(data[0].Remarks);
                $('#HiddenFieldUserRightGuID').val(data[0].GuID);
            },
            complete: function () {

                stopLoading();
            },
        });


    }
    else {
        GetMessageBox("Please Select A User Right", 505);
        return;
    }
};
