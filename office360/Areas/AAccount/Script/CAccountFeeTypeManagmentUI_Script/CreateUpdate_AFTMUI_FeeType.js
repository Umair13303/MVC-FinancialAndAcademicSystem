/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE AFTM_FEETYPE                               **----------------------------------------------*/
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
            GET_AFTM_FEETYPE_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
    PopulateDropDownLists();
    ChangeCase();
});
function PopulateDropDownLists() {
    PopulateLK_FeeCatagory_List();
    PopulateLK_ChargingMethod_List();
    PopulateMT_ACOAM_RevenueAccount_ListByParam();
    PopulateMT_ACOAM_AssetAccount_ListByParam();
    PopulateMT_ACOAM_LiabilityAccount_ListByParam();
    PopulateMT_ACOAM_CostOfSaleAccount_ListByParam();
}

/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER                                                     **----------------------------------------------*/
function ChangeCase() {
    $('#DropDownListFeeCategory').change(function (event) {
        event.preventDefault();
        $('#CheckBoxIsOnAdmission,#CheckBoxIsSecurity,#CheckBoxIsRefundable,#CheckBoxIsDiscount').prop("checked", false).change();
        $('#DropDownListRevenueAccount,#DropDownListAssetAccount,#DropDownListLiabilityAccount,#DropDownListCostOfSaleAccount,#DropDownListChargingMethod').val('-1').trigger('change.select2');
        var IsOtherFee = $("#DropDownListFeeCategory :selected").attr("data-IsOtherFee");
        //-----------FOR ::IN CASE FEE CATAGORY IS: OTHER FEE(NOT ACADEMIC FEE'S)
        if (CONVERSION.TO_BOOL(IsOtherFee) == true) {
            $("#DivOtherFeeChartOfAccount").show();
        }
        //-----------FOR ::IN CASE FEE CATAGORY IS: ACADEMIC FEE'S
        else
        {
            $("#DivOtherFeeChartOfAccount").hide();
        }
    });
    $('#DropDownListChargingMethod').change(function (event) {
        event.preventDefault();
        $('#CheckBoxIsOnAdmission').prop("checked", false).change();
        var IsRecurring = $("#DropDownListChargingMethod :selected").attr("data-IsRecurring");
        //-----------FOR ::IN CASE FEE IS: RECURRING
        if (CONVERSION.TO_BOOL(IsRecurring) == true) {
            $('#DivCheckBoxIsOnAdmission').hide();
        }
        //-----------FOR ::IN CASE FEE IS: NOT-RECURRING
        else {
            $('#DivCheckBoxIsOnAdmission').show();
        }
    });
    $('#CheckBoxIsRefundable, #CheckBoxIsDiscount').change(function (event) {
        event.preventDefault();
        $('#DropDownListRevenueAccount,#DropDownListAssetAccount,#DropDownListLiabilityAccount,#DropDownListCostOfSaleAccount').val('-1').trigger('change.select2');
        var IsOtherFee = $("#DropDownListFeeCategory :selected").attr("data-IsOtherFee");
        if (CONVERSION.TO_BOOL(IsOtherFee) == true) {
            var IsRefundable = $('#CheckBoxIsRefundable').prop('checked');
            var IsDiscount = $('#CheckBoxIsDiscount').prop('checked');
            if (IsRefundable == true && IsDiscount == true) {
                $('#DivDropDownListRevenueAccount').hide();
                $('#DivDropDownListAssetAccount').show();
                $('#DivDropDownListLiabilityAccount').show();
                $('#DivDropDownListCostOfSaleAccount').show();
            }
            else if (IsRefundable == false && IsDiscount == true) {
                $('#DivDropDownListRevenueAccount').show();
                $('#DivDropDownListAssetAccount').show();
                $('#DivDropDownListLiabilityAccount').hide();
                $('#DivDropDownListCostOfSaleAccount').show();
            }
            else if (IsRefundable == true && IsDiscount == false) {
                $('#DivDropDownListRevenueAccount').hide();
                $('#DivDropDownListAssetAccount').show();
                $('#DivDropDownListLiabilityAccount').show();
                $('#DivDropDownListCostOfSaleAccount').hide();
            }
            else if (IsRefundable == false && IsDiscount == false) {
                $('#DivDropDownListRevenueAccount').show();
                $('#DivDropDownListAssetAccount').show();
                $('#DivDropDownListLiabilityAccount').hide();
                $('#DivDropDownListCostOfSaleAccount').hide();
            }
        }
    });

    //-----------FOR ::EDIT CASE
    $('#DropDownListFeeType').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY (ON LOAD)                  **----------------------------------------------*/
function PopulateLK_FeeCatagory_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountFeeTypeManagmentUI/GET_LK1_FEECATEGORY",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option data-IsOtherFee="' + data[i].IsOtherFee+'" value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListFeeCategory").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_ChargingMethod_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountFeeTypeManagmentUI/GET_LK1_CHARGINGMETHOD",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option data-IsRecurring="' + data[i].IsRecurring + '"value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListChargingMethod").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_MAIN-- STORED PROCEDURE (ON LOAD)            **----------------------------------------------*/
function PopulateMT_ACOAM_RevenueAccount_ListByParam() {
    var JsonArg = {
        OperationType: DB_OperationType,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountFeeTypeManagmentUI/GET_MT_ACOAM_REVENUEACCOUNT_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListRevenueAccount").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateMT_ACOAM_AssetAccount_ListByParam() {
    var JsonArg = {
        OperationType: DB_OperationType,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountFeeTypeManagmentUI/GET_MT_ACOAM_ASSETACCOUNT_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListAssetAccount").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateMT_ACOAM_LiabilityAccount_ListByParam() {
    var JsonArg = {
        OperationType: DB_OperationType,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountFeeTypeManagmentUI/GET_MT_ACOAM_LIABILITYACCOUNT_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListLiabilityAccount").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateMT_ACOAM_CostOfSaleAccount_ListByParam() {
    var JsonArg = {
        OperationType: DB_OperationType,
    }

    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountFeeTypeManagmentUI/GET_MT_ACOAM_COSTOFSALEACCOUNT_BYPARAMTER",
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
    var IsOtherFee = $("#DropDownListFeeCategory :selected").attr("data-IsOtherFee");
    var IsDiscount = $('#CheckBoxIsDiscount').prop('checked');
    var IsRefundable = $('#CheckBoxIsRefundable').prop('checked');
    if ($('#TextBoxDescription').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#DropDownListFeeCategory').RequiredDropdown() == false) {
        return false;
    }
    if (CONVERSION.TO_BOOL(IsOtherFee) == false) {
        if ($('#DropDownListChargingMethod').RequiredDropdown() == false) {
            return false;
        }
    }
    else {
        if (IsRefundable == true && IsDiscount == true) {
            if ($('#DropDownListAssetAccount').RequiredDropdown() == false) {
                return false;
            }
            if ($('#DropDownListLiabilityAccount').RequiredDropdown() == false) {
                return false;
            }
            if ($('#DropDownListCostOfSaleAccount').RequiredDropdown() == false) {
                return false;
            }
        }
        else if (IsRefundable == false && IsDiscount == true) {
            if ($('#DropDownListRevenueAccount').RequiredDropdown() == false) {
                return false;
            }
            if ($('#DropDownListAssetAccount').RequiredDropdown() == false) {
                return false;
            }
            if ($('#DropDownListCostOfSaleAccount').RequiredDropdown() == false) {
                return false;
            }

        }
        else if (IsRefundable == true && IsDiscount == false) {
            if ($('#DropDownListAssetAccount').RequiredDropdown() == false) {
                return false;
            }

            if ($('#DropDownListLiabilityAccount').RequiredDropdown() == false) {
                return false;
            }
        }
        else if (IsRefundable == false && IsDiscount == false) {
            if ($('#DropDownListRevenueAccount').RequiredDropdown() == false) {
                return false;
            }
            if ($('#DropDownListAssetAccount').RequiredDropdown() == false) {
                return false;
            }
        }
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
        catch(err) {
            GetMessageBox(err.Message, 505);
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
    var Description     = null; var ChargingMethodId    = null;
    var IsOnAdmission   = null; var IsDiscount          = null; var IsRefundable        = null; var IsSecurity          = null;
    var AssetAccountId  = null; var RevenueAccountId    = null; var CostOfSaleAccountId = null; var LiabilityAccountId  = null;


    var Description = $('#TextBoxDescription').val();
    var FeeCategoryId = $('#DropDownListFeeCategory :selected').val();


    var IsOtherFee = $("#DropDownListFeeCategory :selected").attr("data-IsOtherFee");

    if (CONVERSION.TO_BOOL(IsOtherFee) == true) {
        IsDiscount = $('#CheckBoxIsDiscount').prop('checked');
        IsRefundable = $('#CheckBoxIsRefundable').prop('checked');
        IsSecurity = $('#CheckBoxIsSecurity').prop('checked');
        if (IsRefundable == true && IsDiscount == true) {
            AssetAccountId = $('#DropDownListAssetAccount :selected').val();
            LiabilityAccountId = $('#DropDownListLiabilityAccount :selected').val();
            CostOfSaleAccountId = $('#DropDownListCostOfSaleAccount :selected').val();
        }
        else if (IsRefundable == false && IsDiscount == true) {
            RevenueAccountId = $('#DropDownListRevenueAccount :selected').val();
            AssetAccountId = $('#DropDownListAssetAccount :selected').val();
            CostOfSaleAccountId = $('#DropDownListCostOfSaleAccount :selected').val();
        }
        else if (IsRefundable == true && IsDiscount == false) {
            AssetAccountId = $('#DropDownListAssetAccount :selected').val();
            LiabilityAccountId = $('#DropDownListLiabilityAccount :selected').val();
        }
        else if (IsRefundable == false && IsDiscount == false) {
            RevenueAccountId = $('#DropDownListRevenueAccount :selected').val();
            AssetAccountId = $('#DropDownListAssetAccount :selected').val();
        }
    }

    else if (CONVERSION.TO_BOOL(IsOtherFee) == false) {
        ChargingMethodId = $('#DropDownListChargingMethod :selected').val();
        IsOnAdmission = $('#CheckBoxIsOnAdmission').prop('checked');
        IsDiscount = $('#CheckBoxIsDiscount').prop('checked');
        IsRefundable = $('#CheckBoxIsRefundable').prop('checked');
        IsSecurity = $('#CheckBoxIsSecurity').prop('checked');
    }
    var Remarks = $('#TextBoxRemarks').val();
    var FeeTypeGuID = $('#HiddenFieldFeeTypeGuID').val();

    var JsonArg = {
        GuID: FeeTypeGuID,
        OperationType: OperationType,
        Description: Description,
        FeeCategoryId: FeeCategoryId,
        ChargingMethodId: ChargingMethodId,
        IsOnAdmission: IsOnAdmission,
        IsSecurity: IsSecurity,
        IsRefundable: IsRefundable,
        IsDiscount: IsDiscount,
        RevenueAccountId: RevenueAccountId,
        AssetAccountId: AssetAccountId,
        LiabilityAccountId: LiabilityAccountId,
        CostOfSaleAccountId: CostOfSaleAccountId,
        Remarks: Remarks,
    };
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountFeeTypeManagmentUI/UpSert_Into_AFTM_FeeType",
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

/*----------------------------------** FUNCTION FOR:: UPDATE FEETYPE (LOAD DROPDOWN,DATA FOR FEETYPEID)                     **----------------------------------------------*/
$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListFeeType').RequiredDropdown() == false) {
        return false;
    }
    else {
        GET_AFTM_FEETYPE_INFOBYGUID();
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
                    $('#DropDownListFeeCategory').val(data[0].FeeCategoryId).trigger('change.select2');
                    $('#DropDownListChargingMethod').val(data[0].ChargingMethodId).trigger('change.select2');
                    $("#CheckBoxIsOnAdmission").prop('checked', (data[0].IsOnAdmission)).change();
                    $("#CheckBoxIsSecurity").prop('checked', (data[0].IsSecurity)).change();
                    $("#CheckBoxIsRefundable").prop('checked', (data[0].IsRefundable)).change();
                    $("#CheckBoxIsDiscount").prop('checked', (data[0].IsDiscount)).change();
                    if (data[0].IsOtherFee == true) {
                        $("#DivOtherFeeChartOfAccount").show();
                        $("#DropDownListRevenueAccount").val(data[0].RevenueAccountId).trigger('change.select2');
                        $("#DropDownListAssetAccount").val(data[0].AssetAccountId).trigger('change.select2');
                        $("#DropDownListLiabilityAccount").val(data[0].LiabilityAccountId).trigger('change.select2');
                        $("#DropDownListCostOfSaleAccount").val(data[0].CostOfSaleAccountId).trigger('change.select2');
                    }
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
