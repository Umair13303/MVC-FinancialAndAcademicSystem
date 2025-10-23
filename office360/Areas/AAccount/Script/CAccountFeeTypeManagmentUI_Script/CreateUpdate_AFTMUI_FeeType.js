/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE ADTM_DISCOUNTTYPE                          **----------------------------------------------*/
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
            GET_AFTM_FEETYPE_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
    PopulateDropDownLists();
    ChangeCase();
});
function PopulateDropDownLists() {
    PopulateMT_ACOAM_CostOfSaleAccount_ListByParam();
}

/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER                                                     **----------------------------------------------*/
function ChangeCase() {
    //-----------FOR ::EDIT CASE
    $('#DropDownListFeeType').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_MAIN-- STORED PROCEDURE (ON LOAD)            **----------------------------------------------*/

/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR)                            **----------------------------------------------*/
function ValidateInputFields() {

    if ($('#TextBoxDescription').RequiredTextBoxInputGroup() == false) {
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
    var Remarks = $('#TextBoxRemarks').val();

    var FeeTypeGuID = $('#HiddenFieldFeeTypeGuID').val();

    var JsonArg = {
        GuID: FeeTypeGuID,
        OperationType: OperationType,
        Description: Description,
        Remarks: Remarks,
    };
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountDiscountTypeManagmentUI/UpSert_Into_AFTM_FeeType",
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
    $('.form-control').not('#DropDownListFeeType').val('');
    $('.select2').not('#DropDownListFeeType').val('-1').change();
    $('form').removeClass('Is-Valid');
}

/*----------------------------------** FUNCTION FOR:: UPDATE CHARTOFACCOUNT (LOAD DROPDOWN,DATA FOR DISCOUNTTYPEID)         **----------------------------------------------*/
$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListFeeType').RequiredDropdown() == false) {
        return false;
    }
    else {
        GET_AFTM_FEETYPE_LISTBYPARAM();
    }
});
function GET_AFTM_FEETYPE_LISTBYPARAM() {
    $('#DropDownListFeeType').empty();
    $('#DropDownListFeeType').select2({
        placeholder: 'Search By Description / Code',
        minimumInputLength: 3,
        ajax: {
            url: BasePath + "/AAccount/CAccountFeeTypeManagmentUI/GET_MT_AFTM_FEETYPE_BYPARAMETER_SEARCH",
            type: "POST",
            delay: 250,
            data: function (params) {
                return {
                    PostedData: {
                        SearchParameter: params.term,
                        DB_IF_PARAM: DOCUMENT_LIST_CONDITION.ADTM_DISCOUNTTYPE_BY_COMPANYID_SEARCH_PARAMETER_UPDATEDISCOUNTTYPE,
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
function GET_AFTM_FEETYPE_INFOBYGUID() {
    var FeeTypeId = $('#DropDownListFeeType :selected').val();
    if (FeeTypeId != null && FeeTypeId != undefined && FeeTypeId != "" && FeeTypeId != "-1") {
        var JsonArg = {
            GuID: FeeTypeId,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/AAccount/CAccountFeeTypeManagmentUI/GET_MT_AFTM_FEETYPE_INFOBYGUID",
            dataType: 'json',
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                if (data.length > 0) {
                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON LOAD/STATIC --*/
                    $('#TextBoxDescription').val(data[0].Description);
                    $('#TextBoxRemarks').val(data[0].Remarks).prop('disabled', true);
                    $('#HiddenFieldFeeTypeGuID').val(data[0].GuID);
                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON CHANGE --*/
                }
                else {
                    GetMessageBox("NO RECORD FOUND FOR FOR SELECTED FEE TYPE.... CONTACT DEVELOPER TEAM", 505);
                }
            },
            complete: function () {
                stopLoading();
            },
            error: function (jqXHR, error, errorThrown) {
                GetMessageBox("ERROR FETCHING RECORD FROM SERVER FOR SELECTED FEE TYPE.... CONTACT DEVELOPER TEAM", 505);
            },
        });
    }
    else {
        GetMessageBox("Please Select A Fee Type", 505);
        return;
    }
};
