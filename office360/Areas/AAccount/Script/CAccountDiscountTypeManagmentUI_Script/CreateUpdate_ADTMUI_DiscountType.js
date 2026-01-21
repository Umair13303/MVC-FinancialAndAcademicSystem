/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE ADTM_DISCOUNTTYPE                          **----------------------------------------------*/
var OperationType = "";

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
            GET_ADTM_DISCOUNTTYPE_LISTBYPARAM();
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
    //-----------FOR :: DISCOUNT CONFIGURATION
    $('#CheckBoxIsByPercentage, #CheckBoxIsByAmount').change(function () {
        if (this.id === "CheckBoxIsByPercentage" && this.checked) {
            $('#CheckBoxIsByAmount').prop('checked', false);
        }
        else if (this.id === "CheckBoxIsByAmount" && this.checked) {
            $('#CheckBoxIsByPercentage').prop('checked', false);
        }
    });

    //-----------FOR ::EDIT CASE
    $('#DropDownListDiscountType').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_MAIN-- STORED PROCEDURE (ON LOAD)            **----------------------------------------------*/
function PopulateMT_ACOAM_CostOfSaleAccount_ListByParam() {
    var JsonArg = {
        OperationType: DB_OperationType,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountDiscountTypeManagmentUI/GET_MT_ACOAM_COSTOFSALEACCOUNT_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListCostOfSaleAccount").html(List);
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
    if ($('#DropDownListCostOfSaleAccount').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxDiscountPercentageOrAmount').RequiredTextBoxInputGroup() == false) {
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
    var DiscountPercentage = null;
    var DiscountAmount = null;
    var Description = $('#TextBoxDescription').val();
    var CostOfSaleAccountId = $('#DropDownListCostOfSaleAccount').val();
    var IsByPercentage = $("#CheckBoxIsByPercentage").prop('checked');
    if (IsByPercentage == true) {
        DiscountPercentage = $("#TextBoxDiscountPercentageOrAmount").val();
    }
    var IsByAmount = $("#CheckBoxIsByAmount").prop('checked');
    if (IsByAmount == true) {
        DiscountAmount = $("#TextBoxDiscountPercentageOrAmount").val();
    }
    var Remarks = $('#TextBoxRemarks').val();

    var DiscountTypeGuID = $('#HiddenFieldDiscountTypeGuID').val();

    var JsonArg = {
        GuID: DiscountTypeGuID,
        OperationType: OperationType,
        Description: Description,
        CostOfSaleAccountId: CostOfSaleAccountId,
        IsByPercentage: IsByPercentage,
        DiscountPercentage: DiscountPercentage,
        IsByAmount: IsByAmount,
        DiscountAmount: DiscountAmount,
        Remarks: Remarks,
    };
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountDiscountTypeManagmentUI/UpSert_Into_ADTM_DiscountType",
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
    $('.form-control').not('#DropDownListDiscountType').val('');
    $('.select2').not('#DropDownListDiscountType').val('-1').change();
    $('form').removeClass('Is-Valid');
}

/*----------------------------------** FUNCTION FOR:: UPDATE CHARTOFACCOUNT (LOAD DROPDOWN,DATA FOR DISCOUNTTYPEID)         **----------------------------------------------*/
$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListDiscountType').RequiredDropdown() == false) {
        return false;
    }
    else {
        GET_ADTM_DISCOUNTTYPE_INFOBYGUID();
    }
});
function GET_ADTM_DISCOUNTTYPE_LISTBYPARAM() {
    $('#DropDownListDiscountType').empty();
    $('#DropDownListDiscountType').select2({
        placeholder: 'Search By Description / Code',
        minimumInputLength: 3,
        ajax: {
            url: BasePath + "/AAccount/CAccountDiscountTypeManagmentUI/GET_MT_ADTM_DISCOUNTTYPE_BYPARAMETER_SEARCH",
            type: "POST",
            delay: 250,
            data: function (params) {
                return {
                    PostedData: {
                        SearchParameter: params.term,
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
function GET_ADTM_DISCOUNTTYPE_INFOBYGUID() {
    var DiscountTypeId = $('#DropDownListDiscountType :selected').val();
    if (DiscountTypeId != null && DiscountTypeId != undefined && DiscountTypeId != "" && DiscountTypeId != "-1") {
        var JsonArg = {
            GuID: DiscountTypeId,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/AAccount/CAccountDiscountTypeManagmentUI/GET_MT_ADTM_DISCOUNTTYPE_INFOBYGUID",
            dataType: 'json',
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                if (data.length > 0) {
                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON LOAD/STATIC --*/
                    $('#TextBoxDescription').val(data[0].Description);
                    $('#DropDownListCostOfSaleAccount').val(data[0].CostOfSaleAccountId).trigger('change.select2');
                    $("#CheckBoxIsByPercentage").prop('checked', (data[0].IsByPercentage)).change();
                    $("#CheckBoxIsByAmount").prop('checked', (data[0].IsByAmount)).change();
                    if (data[0].IsByPercentage == true) {
                        $("#TextBoxDiscountPercentageOrAmount").val(data[0].DiscountPercentage);
                    }
                    if (data[0].IsByAmount == true) {
                        $("#TextBoxDiscountPercentageOrAmount").val(data[0].DiscountAmount);
                    }
                    $('#TextBoxRemarks').val(data[0].Remarks).prop('disabled', true);
                    $('#HiddenFieldDiscountTypeGuID').val(data[0].GuID);
                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON CHANGE --*/
                }
                else {
                    GetMessageBox("NO RECORD FOUND FOR FOR SELECTED DISCOUNT TYPE.... CONTACT DEVELOPER TEAM", 505);
                }
            },
            complete: function () {
                stopLoading();
            },
            error: function (jqXHR, error, errorThrown) {
                GetMessageBox("ERROR FETCHING RECORD FROM SERVER FOR SELECTED DISCOUNT TYPE.... CONTACT DEVELOPER TEAM", 505);
            },
        });
    }
    else {
        GetMessageBox("Please Select A Discount Type", 505);
        return;
    }
};
