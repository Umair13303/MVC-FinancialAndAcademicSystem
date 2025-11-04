/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE ACOAM_CHARTOFACCOUNT                       **----------------------------------------------*/
var OperationType = "";
var DDL_Condition = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

/*----------------------------------** FUNCTION FOR::PAGE LOADER                                                            **----------------------------------------------*/
$(document).ready(function () {
    DB_OperationType = $('#HiddenFieldDB_OperationType').val();
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            $('#DivButtonSubmitDown').show();
            $('#DivButtonUpdateDown').hide();
            break;
        case DBOperation.UPDATE:
            GET_ACOAM_CHARTOFACCOUNT_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
    PopulateDropDownLists();
    ChangeCase();

});

function PopulateDropDownLists() {
    PopulateLK_AccountType_List();
    PopulateLK_FinancialStatement_List();
}

/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER                                                     **----------------------------------------------*/
function ChangeCase() {

    $('#DropDownListAccountType').change(function () {
        var AccountTypeId = $("#DropDownListAccountType :selected").val();
        PopulateLK_AccountCategory_List(AccountTypeId, null);
    });
    //-----------FOR ::EDIT CASE
    $('#DropDownListChartOfAccount').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY (ON LOAD)                  **----------------------------------------------*/
function PopulateLK_AccountType_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountCOAManagmentUI/GET_LK1_ACCOUNTTYPE",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListAccountType").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_FinancialStatement_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountCOAManagmentUI/GET_LK1_FINANCIALSTATEMENT",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListFinancialStatement").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY (ON CHANGE)                **----------------------------------------------*/
function PopulateLK_AccountCategory_List(AccountTypeId, AccountCategoryId) {
    var JsonArg = {
        AccountTypeId: AccountTypeId
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountCOAManagmentUI/GET_LK1_ACCOUNTCATAGORY",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option ' + (data[i].Id == AccountCategoryId ? 'selected' : '') + ' value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListAccountCategory").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR)                            **----------------------------------------------*/
function ValidateInputFields() {

    if ($('#TextBoxDescription').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#DropDownListAccountType').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListAccountCategory').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListFinancialStatement').RequiredDropdown() == false) {
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
    var Description = $('#TextBoxDescription').val();
    var AccountCategoryId = $('#DropDownListAccountCategory :selected').val();
    var AccountTypeId = $('#DropDownListAccountType :selected').val();
    var FinancialStatementId = $('#DropDownListFinancialStatement :selected').val();
    var Remarks = $('#TextBoxRemarks').val();

    var ChartOfAccountGuID = $('#HiddenFieldChartOfAccountGuID').val();

    var JsonArg = {
        GuID: ChartOfAccountGuID,
        OperationType: OperationType,
        Description: Description,
        AccountCategoryId: AccountCategoryId,
        AccountTypeId: AccountTypeId,
        FinancialStatementId: FinancialStatementId,
        Remarks: Remarks,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountCOAManagmentUI/UpSert_Into_ACOAM_ChartOfAccount",
        dataType: 'json',
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            GetMessageBox(data.Message, data.StatusCode);
        },
        complete: function () {
            stopLoading();
            ClearInputFields();
        },
        error: function (jqXHR, error, errorThrown) {
            GetMessageBox("The Transaction Can Not Be Performed Due To Serve Activity", 500);
        },
    });
}
function ClearInputFields() {
    //-----------NOT CLEARING REQUIRED FIELD
    $('.form-control').not('#DropDownListChartOfAccount').val('');
    $('.select2').not('#DropDownListChartOfAccount').val('-1').change();
    $('form').removeClass('Is-Valid');
}

/*----------------------------------** FUNCTION FOR:: UPDATE CHARTOFACCOUNT (LOAD DROPDOWN,DATA FOR CHARTOFACCOUNTID)               **----------------------------------------------*/
$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListChartOfAccount').RequiredDropdown() == false) {
        return false;
    }
    else {
        GET_ACOAM_CHARTOFACCOUNT_INFOBYGUID();
    }
});
function GET_ACOAM_CHARTOFACCOUNT_LISTBYPARAM() {
    $('#DropDownListChartOfAccount').empty();
    $('#DropDownListChartOfAccount').select2({
        placeholder: 'Search By Chart Of Account',
        minimumInputLength: 3,
        ajax: {
            url: BasePath + "/AAccount/CAccountCOAManagmentUI/GET_MT_ACOAM_CHARTOFACCOUNT_BYPARAMETER_SEARCH",
            type: "POST",
            delay: 250,
            data: function (params) {
                return {
                    PostedData: {
                        SearchParameter: params.term,
                        DB_IF_PARAM: DOCUMENT_LIST_CONDITION.ACOAM_CHARTOFACCOUNT_BY_SEARCH_PARAMETER_UPDATECHARTOFACCOUNT,
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
function GET_ACOAM_CHARTOFACCOUNT_INFOBYGUID() {
    var ChartOfAccountId = $('#DropDownListChartOfAccount :selected').val();
    if (ChartOfAccountId != null && ChartOfAccountId != undefined && ChartOfAccountId != "" && ChartOfAccountId != "-1") {
        var JsonArg = {
            GuID: ChartOfAccountId,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/AAccount/CAccountCOAManagmentUI/GET_MT_ACOAM_CHARTOFACCOUNT_INFOBYGUID",
            dataType: 'json',
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                if (data.length > 0) {
                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON LOAD/STATIC --*/
                    $('#TextBoxDescription').val(data[0].Description);
                    $('#DropDownListAccountType').val(data[0].AccountTypeId).trigger('change.select2');
                    $('#DropDownListFinancialStatement').val(data[0].FinancialStatementId).trigger('change.select2');
                    $('#TextBoxRemarks').val(data[0].Remarks).prop('disabled', true);
                    $('#HiddenFieldChartOfAccountGuID').val(data[0].GuID);
                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON CHANGE --*/
                    PopulateLK_AccountCategory_List(data[0].AccountTypeId, data[0].AccountCategoryId)
                }
                else {
                    GetMessageBox("NO RECORD FOUND FOR FOR SELECTED COA.... CONTACT DEVELOPER TEAM", 505);
                }
            },
            complete: function () {
                stopLoading();
            },
            error: function (jqXHR, error, errorThrown) {
                GetMessageBox("ERROR FETCHING RECORD FROM SERVER FOR SELECTED COA.... CONTACT DEVELOPER TEAM", 505);
            },
        });
    }
    else {
        GetMessageBox("Please Select A COA", 505);
        return;
    }
};
