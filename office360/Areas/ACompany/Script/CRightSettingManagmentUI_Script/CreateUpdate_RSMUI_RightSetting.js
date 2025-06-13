/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE RSM_RIGHTSETTING                       **----------------------------------------------*/
var OperationType = "";
var DDL_Condition = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

/*----------------------------------** FUNCTION FOR::PAGE LOADER                                                        **----------------------------------------------*/
$(document).ready(function () {
    DB_OperationType = $('#HiddenFieldDB_OperationType').val();
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            $('#DivButtonSubmitDown').show();
            $('#DivButtonUpdateDown').hide();
            break;
        case DBOperation.UPDATE:
            GET_RSM_RIGHTSETTING_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
    PopulateDropDownLists();
    ChangeCase();

});

function PopulateDropDownLists() {
    PopulateMT_CM_Company_ListByParam();
    PopulateLK_Right_List();
    PopulateLK_URLType_List();
}

/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER                                                 **----------------------------------------------*/
function ChangeCase() {
    //-----------FOR ::EDIT CASE
    $('#DropDownListRightSetting').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY (ON LOAD)              **----------------------------------------------*/
function PopulateLK_Right_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/CRightSettingManagmentUI/GET_LK1_RIGHT",
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
function PopulateLK_URLType_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/CRightSettingManagmentUI/GET_LK1_URLTYPE",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListURLType").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_MAIN-- STORED PROCEDURE (ON LOAD)        **----------------------------------------------*/
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
        url: BasePath + "/ACompany/CRightSettingManagmentUI/GET_MT_CM_COMPANY_BYPARAMTER",
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

/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR)                        **----------------------------------------------*/
function ValidateInputFields() {

    if ($('#DropDownListRight').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxDescription').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#DropDownListURLType').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListCompany').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxRemarks').RequiredTextBoxInputGroup() == false) {
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

    var RightId = $('#DropDownListRight :selected').val();
    var Description = $('#TextBoxDescription').val();
    var URLTypeId = $('#DropDownListURLType :selected').val();
    var CompanyId = $('#DropDownListCompany :selected').val();
    var Remarks = $('#TextBoxRemarks').val();
    var RightSettingGuID = $('#HiddenFieldRightSettingGuID').val();

    var JsonArg = {
        GuID: RightSettingGuID,
        OperationType: OperationType,

        RightId: RightId,
        Description: Description,
        URLTypeId: URLTypeId,
        CompanyId: CompanyId,
        Remarks: Remarks,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/CRightSettingManagmentUI/UpSert_Into_RSM_RightSetting",
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

/*----------------------------------** FUNCTION FOR:: UPDATE COMPANY (LOAD DROPDOWN,DATA FOR RIGHTSETTINGID)            **----------------------------------------------*/
$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListRightSetting').RequiredDropdown() == false) {
        return false;
    }
    else {
        GET_RSM_RIGHTSETTING_INFOBYGUID();
    }
});
function GET_RSM_RIGHTSETTING_LISTBYPARAM() {
    $('#DropDownListRightSetting').empty();
    $('#DropDownListRightSetting').select2({
        placeholder: 'Search By Right Name / URL Path',
        minimumInputLength: 3,
        templateResult: function (item) {
            return QueryDropDownListContainer_Plain(item, ['Company','Right']);
        },
        templateSelection: function (item) {
            return item.text;
        },
        ajax: {
            url: BasePath + "/ACompany/CRightSettingManagmentUI/GET_MT_RSM_RIGHTSETTING_BYPARAMETER_SEARCH",
            type: "POST",
            delay: 250,
            data: function (params) {
                return {
                    PostedData: {
                        SearchParameter: params.term,
                        DB_IF_PARAM: DOCUMENT_LIST_CONDITION.RSM_RIGHTSETTING_BY_SEARCH_PARAMETER_UPDATERIGHTSETTING,
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
                            Right: item.Description,
                            Company: item.CompanyName,
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
function GET_RSM_RIGHTSETTING_INFOBYGUID() {
    var RightSettingId = $('#DropDownListRightSetting :selected').val();
    if (RightSettingId != null && RightSettingId != undefined && RightSettingId != "" && RightSettingId != "-1") {
        var JsonArg = {
            GuID: RightSettingId,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/ACompany/CRightSettingManagmentUI/GET_MT_RSM_RIGHTSETTING_INFOBYGUID",
            dataType: 'json',
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                /*-- LOAD DATA FOR FIELDS RENDERED :: ON LOAD/STATIC --*/
                if (data.length > 0) {
                    $('#DropDownListRight').val(data[0].RightId).change();
                    $('#TextBoxDescription').val(data[0].Description);
                    $('#DropDownListURLType').val(data[0].URLTypeId).trigger('change.select2');
                    $('#DropDownListCompany').val(data[0].CompanyId).trigger('change.select2');
                    $('#TextBoxRemarks').val(data[0].Remarks);
                    $('#HiddenFieldRightSettingGuID').val(data[0].GuID);
                }
                else {
                    GetMessageBox("NO RECORD FOUND FOR FOR SELECTED RIGHT SETTING.... CONTACT DEVELOPER TEAM", 505);
                }
            },
            complete: function () {
                stopLoading();
            },
            error: function (jqXHR, error, errorThrown) {
                GetMessageBox("ERROR FETCHING RECORD FROM SERVER FOR SELECTED RIGHT SETTING.... CONTACT DEVELOPER TEAM", 505);
            },
        });
    }
    else {
        GetMessageBox("Please Select A Company's Right Setting", 505);
        return;
    }
};