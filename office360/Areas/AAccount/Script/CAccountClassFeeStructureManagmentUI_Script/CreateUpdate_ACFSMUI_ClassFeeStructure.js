/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE ADTM_DISCOUNTTYPE                          **----------------------------------------------*/
var OperationType = "";

var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

var ClassFeeStructureFeeTypeTable = "";

var IsSecurity;
var IsRefundable;
var IsDiscount;
var WH_Percentage;
var WH_SlabAmount;
var WH_FixedCharges;
var WH_IsOnExceedingAmount;

/*----------------------------------** FUNCTION FOR::PAGE LOADER                                                            **----------------------------------------------*/
$(document).ready(function () {
    DB_OperationType = $('#HiddenFieldDB_OperationType').val();
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            $('#DivButtonSubmitDown').show();
            $('#DivButtonUpdateDown').hide();
            break;
        case DBOperation.UPDATE:
            GET_AFSM_FEESTRUCTURE_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
    PopulateDropDownLists();
    ChangeCase();
    InitializeFeeStructureFeeTypeDataTable();
});
function PopulateDropDownLists() {
    PopulateMT_BM_Branch_ListByParam();
    PopulateLK_ChallanMethod_List();
    PopulateLK_WHTaxPolicy_List();
    PopulateMT_AFTM_FeeType_ListByParam();
    PopulateMT_ACOAM_RevenueAccount_ListByParam();
    PopulateMT_ACOAM_AssetAccount_ListByParam();
    PopulateMT_ACOAM_LiabilityAccount_ListByParam();
    PopulateMT_ACOAM_CostOfSaleAccount_ListByParam();
}
/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER                                                     **----------------------------------------------*/
function ChangeCase() {
    $('#DropDownListCampus').change(function () {
        var CampusId = $("#DropDownListCampus :selected").val();
        var AdmissionSessionId = null;
        PopulateMT_AASM_AdmissionSession_ListByParam(CampusId, AdmissionSessionId)
    });
    $('#DropDownListAdmissionSession').change(function () {
        var CampusId = $("#DropDownListCampus :selected").val();
        var AdmissionSessionId = $("#DropDownListAdmissionSession :selected").val();
        var ClassId = null;
        PopulateMT_ACM_Class_ListByParam(CampusId, AdmissionSessionId, ClassId)
    });
    $("#DropDownListFeeType").change(function () {
        PopulateMT_AFTM_FeeType_SettingByGUID();
    });
    $('#DropDownListWHTaxPolicy').change(function (event) {
        event.preventDefault();
        var Selected_WHTaxPolicyId = $('#DropDownListWHTaxPolicy :selected');
        WH_Percentage = parseFloat(Selected_WHTaxPolicyId.attr('data-Percentage')) || 0;
        WH_SlabAmount = parseFloat(Selected_WHTaxPolicyId.attr('data-SlabAmount')) || 0;
        WH_FixedCharges = parseFloat(Selected_WHTaxPolicyId.attr('data-FixedCharges')) || 0;
        WH_IsOnExceedingAmount = $('#DropDownListWHTaxPolicy :selected').attr('data-IsOnExceedingAmount') === 'true';
        CalculationBoxClassFeeStructureFeeTypeTable();
    });

    //-----------FOR ::EDIT CASE
    $('#DropDownListFeeStructure').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });
}

/*----------------------------------** FUNCTION FOR::INITIALIZING DATA TABLE's & RELATED OPERATION's                        **----------------------------------------------*/
function InitializeFeeStructureFeeTypeDataTable() {
    ClassFeeStructureFeeTypeTable = $('#MainTableACFSM_ClassFeeStructureFeeType').DataTable({
        "responsive": true,
        "ordering": false,
        "processing": true,
        "paging": false,
        "info": false,
        "columns": [
            { "title": "#", "orderable": false, },
            { "title": "Fee Type" },
            { "title": "Revenue A/C" },
            { "title": "Asset A/C" },
            { "title": "Liability A/C" },
            { "title": "COS A/C" },
            { "title": "FeeTypeId" },
            { "title": "RevenueAccountId" },
            { "title": "AssetAccountId" },
            { "title": "LiabilityAccountId" },
            { "title": "CostOfSaleAccountId" },
            { "title": "Amount" },
            { "title": "Action(s)" },
        ],
        columnDefs: [
            { visible: false, targets: [6, 7, 8,9,10] },
        ],
        drawCallback: async function () {
            $('.delete').off('click').on('click', function () {
                $('#MainTableACFSM_ClassFeeStructureFeeType').DataTable().row($(this).closest('tr')).remove().draw();
            });
        }
    });
    ClassFeeStructureFeeTypeTable.on('order.dt search.dt', function () {
        ClassFeeStructureFeeTypeTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
    ClassFeeStructureFeeTypeTable.on('draw', function () {
        CalculationBoxClassFeeStructureFeeTypeTable();
    });
    HTML_DATATABLE_UTIL.APPEND_FOOTER("TDTotalFeeTypeAmount", "MainTableACFSM_ClassFeeStructureFeeType", "11", "Total Fee");
    HTML_DATATABLE_UTIL.APPEND_FOOTER("TDWithHoldingTaxAmount", "MainTableACFSM_ClassFeeStructureFeeType", "11", "With Holding Tax");
    HTML_DATATABLE_UTIL.APPEND_FOOTER("TDNetFeeAmount", "MainTableACFSM_ClassFeeStructureFeeType", "11", "Net Fee (Tax Inclusive)");
}
function ValidateInputFieldsFeeStructureFeeTypeDetail() {
    if ($('#DropDownListFeeType').RequiredDropdown() == false) {
        return false;
    }
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
    if ($('#TextBoxAmount').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    return true;
}
$('#ButtonAddDataIntoTable').click(function (event) {
    event.preventDefault();
    var IS_VALID = ValidateInputFieldsFeeStructureFeeTypeDetail();
    if (IS_VALID) {
        try {
            InsertDataIntoDataTable();
        }
        catch (err) {
            GetMessageBox(err.message, 505);
        }
    }
});
function InsertDataIntoDataTable() {
    var AssetAccount = HTML_LABEL.TEXT_DISPLAY("N/A"); var RevenueAccount = HTML_LABEL.TEXT_DISPLAY("N/A"); var CostOfSaleAccount = HTML_LABEL.TEXT_DISPLAY("N/A"); var LiabilityAccount = HTML_LABEL.TEXT_DISPLAY("N/A");
    var AssetAccountId = null; var RevenueAccountId = null; var CostOfSaleAccountId = null; var LiabilityAccountId = null;

    var FeeType = $("#DropDownListFeeType :selected").text();
    var FeeTypeId = $("#DropDownListFeeType :selected").val();
    var Amount = $("#TextBoxAmount").val();

    if (IsRefundable == true && IsDiscount == true) {
        AssetAccount = $('#DropDownListAssetAccount :selected').text();
        LiabilityAccount = $('#DropDownListLiabilityAccount :selected').text();
        CostOfSaleAccount = $('#DropDownListCostOfSaleAccount :selected').text();

        AssetAccountId = $('#DropDownListAssetAccount :selected').val();
        LiabilityAccountId = $('#DropDownListLiabilityAccount :selected').val();
        CostOfSaleAccountId = $('#DropDownListCostOfSaleAccount :selected').val();
    }
    else if (IsRefundable == false && IsDiscount == true) {
        RevenueAccount = $('#DropDownListRevenueAccount :selected').text();
        AssetAccount = $('#DropDownListAssetAccount :selected').text();
        CostOfSaleAccount = $('#DropDownListCostOfSaleAccount :selected').text();

        RevenueAccountId = $('#DropDownListRevenueAccount :selected').val();
        AssetAccountId = $('#DropDownListAssetAccount :selected').val();
        CostOfSaleAccountId = $('#DropDownListCostOfSaleAccount :selected').val();
    }
    else if (IsRefundable == true && IsDiscount == false) {
        AssetAccount = $('#DropDownListAssetAccount :selected').text();
        LiabilityAccount = $('#DropDownListLiabilityAccount :selected').text();

        AssetAccountId = $('#DropDownListAssetAccount :selected').val();
        LiabilityAccountId = $('#DropDownListLiabilityAccount :selected').val();
    }
    else if (IsRefundable == false && IsDiscount == false) {
        RevenueAccount = $('#DropDownListRevenueAccount :selected').text();
        AssetAccount = $('#DropDownListAssetAccount :selected').text();
        RevenueAccountId = $('#DropDownListRevenueAccount :selected').val();
        AssetAccountId = $('#DropDownListAssetAccount :selected').val();
    }

    var Table_Row = [];
    Table_Row[0] = "";
    Table_Row[1] = FeeType;
    Table_Row[2] = RevenueAccount;
    Table_Row[3] = AssetAccount;
    Table_Row[4] = LiabilityAccount;
    Table_Row[5] = CostOfSaleAccount;
    Table_Row[6] = FeeTypeId;
    Table_Row[7] = RevenueAccountId;
    Table_Row[8] = AssetAccountId;
    Table_Row[9] = LiabilityAccountId;
    Table_Row[10] = CostOfSaleAccountId;
    Table_Row[11] = Amount;
    Table_Row[12] = HTML_BUTTON.DELETE_IN_LIST();
    var IsRecordAlreadyInserted = false;
    ClassFeeStructureFeeTypeTable.column(1).data().each(function (value, index) {
        if (value == (Table_Row[1])) {
            IsRecordAlreadyInserted = true;
        }
    });
    if (IsRecordAlreadyInserted) {
        GetMessageBox("Duplicate Record Exist", 505)
    }
    else {
        ClassFeeStructureFeeTypeTable.row.add(Table_Row).draw();
        ClearInputFieldsFeeStructureFeeTypeDataTable();
    }
    IsRecordAlreadyInserted = false;
}
function ClearInputFieldsFeeStructureFeeTypeDataTable() {
    $('#DropDownListFeeType').val('-1').trigger('change.select2');
    $('#DropDownListRevenueAccount').val('-1').trigger('change.select2');
    $('#DropDownListAssetAccount').val('-1').trigger('change.select2');
    $('#DropDownListLiabilityAccount').val('-1').trigger('change.select2');
    $('#DropDownListCostOfSaleAccount').val('-1').trigger('change.select2');
    $('#TextBoxAmount').val('');
}
function CalculationBoxClassFeeStructureFeeTypeTable() {
    var TotalFeeTypeAmount = ClassFeeStructureFeeTypeTable.column(11).data().reduce(function (a, b) {
        return parseFloat(a) + parseFloat(b);
    }, 0);
    var TaxAmount = 0;
    switch (WH_IsOnExceedingAmount) {
        case true:
            if (TotalFeeTypeAmount > WH_SlabAmount) {

                var ExceedingAmount = parseFloat(TotalFeeTypeAmount - WH_SlabAmount);
                TaxAmount = parseFloat(WH_FixedCharges + ((ExceedingAmount / 100) * WH_Percentage));
            }
            else {
                TaxAmount = 0.00;
            }
            break;
        default:
            TaxAmount = parseFloat(WH_FixedCharges + ((TotalFeeTypeAmount / 100) * WH_Percentage));
            break;
    }
    var TotalFeeStructureAmount = TaxAmount + TotalFeeTypeAmount;

    $("#TDTotalFeeTypeAmount").text(TotalFeeTypeAmount.toFixed(2));
    $("#TDWithHoldingTaxAmount").text(TaxAmount.toFixed(2));
    $("#TDNetFeeAmount").text(TotalFeeStructureAmount.toFixed(2));
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY (ON LOAD)                  **----------------------------------------------*/
function PopulateLK_ChallanMethod_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountClassFeeStructureManagmentUI/GET_LK1_CHALLANMETHOD",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListChallanMethod").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_WHTaxPolicy_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountClassFeeStructureManagmentUI/GET_LK1_WHTAXPOLICY",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option ' +
                    'data-Percentage="' + data[i].Percentage + '" ' + 'data-IsOnExceedingAmount="' + data[i].IsOnExceedingAmount + '" ' +
                    'data-SlabAmount="' + data[i].SlabAmount + '" ' + 'data-FixedCharges="' + data[i].FixedCharges + '" ' +
                    'value="' + data[i].Id + '">' + data[i].Description +
                    '</option>';
            }
            $("#DropDownListWHTaxPolicy").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_MAIN-- STORED PROCEDURE (ON LOAD)            **----------------------------------------------*/
function PopulateMT_BM_Branch_ListByParam() {
    var JsonArg = {
        OperationType: DB_OperationType,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountClassFeeStructureManagmentUI/GET_MT_BM_BRANCH_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListCampus").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateMT_ACOAM_RevenueAccount_ListByParam() {
    var JsonArg = {
        OperationType: DB_OperationType,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountClassFeeStructureManagmentUI/GET_MT_ACOAM_REVENUEACCOUNT_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option value="' + data[i].Id + '">' + data[i].Description +  '</option>';
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
        url: BasePath + "/AAccount/CAccountClassFeeStructureManagmentUI/GET_MT_ACOAM_ASSETACCOUNT_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option value="' + data[i].Id + '">' + data[i].Description +  '</option>';
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
        url: BasePath + "/AAccount/CAccountClassFeeStructureManagmentUI/GET_MT_ACOAM_LIABILITYACCOUNT_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
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
        url: BasePath + "/AAccount/CAccountClassFeeStructureManagmentUI/GET_MT_ACOAM_COSTOFSALEACCOUNT_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListCostOfSaleAccount").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateMT_AFTM_FeeType_ListByParam() {
    var JsonArg = {
        OperationType: DB_OperationType,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountClassFeeStructureManagmentUI/GET_MT_AFTM_FEETYPE_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option data-FeeTypeGuID="'+data[i].GuID+'" value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListFeeType").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_MAIN-- LINQUERY (ON CHANGE)                  **----------------------------------------------*/
function PopulateMT_AASM_AdmissionSession_ListByParam(CampusId,AdmissionSessionId) {
    var JsonArg = {
        OperationType: DB_OperationType,
        CampusId: CampusId,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountClassFeeStructureManagmentUI/GET_MT_AASM_ADMISSIONSESSION_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option ' + (data[i].Id == AdmissionSessionId ? 'selected' : '') + ' value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListAdmissionSession").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateMT_ACM_Class_ListByParam(CampusId, AdmissionSessionId,ClassId) {
    var JsonArg = {
        OperationType: DB_OperationType,
        CampusId: CampusId,
        AdmissionSessionId: AdmissionSessionId,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountClassFeeStructureManagmentUI/GET_MT_ACM_CLASS_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option ' + (data[i].Id == ClassId ? 'selected' : '') + ' value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListClass").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: FETCH DOCUMENT SETTING FROM DB_MAIN-- LINQUERY (ON CHANGE)-- FEE_TYPE **----------------------------------------------*/
function PopulateMT_AFTM_FeeType_SettingByGUID() {
    $('#DropDownListRevenueAccount,#DropDownListAssetAccount,#DropDownListLiabilityAccount,#DropDownListCostOfSaleAccount').val('-1').trigger('change.select2');
    var FeeTypeGuID = $('#DropDownListFeeType :selected').attr('data-FeeTypeGuID')
    if (FeeTypeGuID != null && FeeTypeGuID != undefined && FeeTypeGuID != "" && FeeTypeGuID != "-1") {
        var JsonArg = {
            GuID: FeeTypeGuID,
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
                    IsSecurity = data[0].IsSecurity;
                    IsRefundable = data[0].IsRefundable;
                    IsDiscount = data[0].IsDiscount;
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
        return;
    }
}

/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR)                            **----------------------------------------------*/
function ValidateInputFields() {
    if ($('#DropDownListCampus').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxDescription').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#DropDownListChallanMethod').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListWHTaxPolicy').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListAdmissionSession').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListClass').RequiredDropdown() == false) {
        return false;
    }
    if (!ClassFeeStructureFeeTypeTable.data().count()) {
        GetMessageBox("To Proceed, Atleast Insert Data For One Fee Type!", 505);
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
        catch (err) {
            GetMessageBox(err.message, 505);
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
        catch (err) {
            GetMessageBox(err.message, 505);
        }
    }
});
function UpSertDataIntoDB() {
    var CampusId = $('#DropDownListCampus :selected').val();
    var Description = $('#TextBoxDescription').val();
    var ChallanMethodId = $('#DropDownListChallanMethod :selected').val();
    var WHTaxPolicyId = $('#DropDownListWHTaxPolicy :selected').val();
    var AdmissionSessionId = $('#DropDownListAdmissionSession :selected').val();
    var ClassId = $('#DropDownListClass :selected').val();
    var Remarks = $('#TextBoxRemarks').val();

    var FeeStructureGuID = $('#HiddenFieldFeeStructureGuID').val();

    var JsonArg = {
        GuID: FeeStructureGuID,
        OperationType: OperationType,

        CampusId: CampusId,
        Description: Description,
        ChallanMethodId: ChallanMethodId,
        WHTaxPolicyId: WHTaxPolicyId,
        AdmissionSessionId: AdmissionSessionId,
        ClassId: ClassId,
        Remarks: Remarks
    }
    var IncludedColumnMappings = {
        6: 'FeeTypeId',
        7: 'RevenueAccountId',
        8: 'AssetAccountId',
        9: 'LiabilityAccountId',
        10: 'CostOfSaleAccountId',
        11: 'Amount'
    };
    var ClassFeeStructureFeeTypeTableDetail = $('#MainTableACFSM_ClassFeeStructureFeeType').DataTable().rows().data().toArray().map(row => {
        return Object.fromEntries(
            Object.entries(IncludedColumnMappings).map(([index, key]) => [key, row[index]])
        );
    });

    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountClassFeeStructureManagmentUI/UpSert_Into_ACFSM_ClassFeeStructure",
        dataType: 'json',
        data: { 'PostedData': (JsonArg), 'PostedDataDetail': (ClassFeeStructureFeeTypeTableDetail) },
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
    $('.form-control').not('#DropDownListFeeStructure').val('');
    $('.select2').not('#DropDownListFeeStructure').val('-1').change();
    $('form').removeClass('Is-Valid');
    ClassFeeStructureFeeTypeTable.clear().draw();
}

/*----------------------------------** FUNCTION FOR:: UPDATE BRANCH (LOAD DROPDOWN,DATA FOR FEESTRUCTUREID)                 **----------------------------------------------*/

$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListFeeStructure').RequiredDropdown() == false) {
        return false;
    }
    else {
        GET_AFSM_FEESTRUCTURE_INFOBYGUID();
    }
});
function GET_AFSM_FEESTRUCTURE_LISTBYPARAM() {
    $('#DropDownListFeeStructure').empty();
    $('#DropDownListFeeStructure').select2({
        placeholder: 'Search By Description / Code',
        minimumInputLength: 3,
        ajax: {
            url: BasePath + "/AAccount/CAccountClassFeeStructureManagmentUI/GET_MT_ACFSM_CLASSFEESTRUCTURE_BYPARAMETER_SEARCH",
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
function GET_AFSM_FEESTRUCTURE_INFOBYGUID() {
    var FeeStructureId = $('#DropDownListFeeStructure :selected').val();
    if (FeeStructureId != null && FeeStructureId != undefined && FeeStructureId != "" && FeeStructureId != "-1") {
        var JsonArg = {
            GuID: FeeStructureId,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/AAccount/CAccountClassFeeStructureManagmentUI/GET_MT_ACFSM_CLASSFEESTRUCTURE_INFOBYGUID",
            dataType: 'json',
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                if (data.DATA && data.DATA.length > 0) {
                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON LOAD/STATIC --*/
                    $('#DropDownListCampus').val(data.DATA[0].CampusId).trigger('change.select2');
                    $('#TextBoxDescription').val(data.DATA[0].Description);
                    $('#DropDownListChallanMethod').val(data.DATA[0].ChallanMethodId).trigger('change.select2');
                    $('#DropDownListWHTaxPolicy').val(data.DATA[0].WHTaxPolicyId).change();
                    $('#TextBoxRemarks').val(data.DATA[0].Remarks).prop('disabled', true);
                    $('#HiddenFieldFeeStructureGuID').val(data.DATA[0].GuID);
                    $("#TDWithHoldingTaxAmount").text(data.DATA[0].WHTax);

                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON CHANGE --*/
                    PopulateMT_AASM_AdmissionSession_ListByParam(data.DATA[0].CampusId,data.DATA[0].AdmissionSessionId);
                    PopulateMT_ACM_Class_ListByParam(data.DATA[0].CampusId, data.DATA[0].AdmissionSessionId, data.DATA[0].ClassId);
                }
                if (data.DATA_DETAIL && data.DATA_DETAIL.length > 0) {
                    /*-- LOAD DATA FOR TABLE RENDERED :: ON LOAD/STATIC --*/
                    ClassFeeStructureFeeTypeTable.clear().draw();
                    for (var i in data.DATA_DETAIL) {
                        var row_data = [];
                        row_data[0] = '';
                        row_data[1] = data.DATA_DETAIL[i].FeeType;
                        row_data[2] = data.DATA_DETAIL[i].RevenueAccount ?? HTML_LABEL.TEXT_DISPLAY("N/A");
                        row_data[3] = data.DATA_DETAIL[i].AssetAccount ?? HTML_LABEL.TEXT_DISPLAY("N/A");
                        row_data[4] = data.DATA_DETAIL[i].LiabilityAccount ?? HTML_LABEL.TEXT_DISPLAY("N/A");
                        row_data[5] = data.DATA_DETAIL[i].CostOfSaleAccount ?? HTML_LABEL.TEXT_DISPLAY("N/A");
                        row_data[6] = data.DATA_DETAIL[i].FeeTypeId;
                        row_data[7] = data.DATA_DETAIL[i].RevenueAccountId;
                        row_data[8] = data.DATA_DETAIL[i].AssetAccountId;
                        row_data[9] = data.DATA_DETAIL[i].LiabilityAccountId;
                        row_data[10] = data.DATA_DETAIL[i].CostOfSaleAccountId;
                        row_data[11] = data.DATA_DETAIL[i].Amount;
                        row_data[12] = HTML_BUTTON.DELETE_IN_LIST();
                        ClassFeeStructureFeeTypeTable.row.add(row_data);
                    }
                    ClassFeeStructureFeeTypeTable.draw();
                }
                else {
                    GetMessageBox("NO RECORD FOUND FOR FOR SELECTED FEE STRUCTURE.... CONTACT DEVELOPER TEAM", 505);
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
        GetMessageBox("Please Select A Fee Structure", 505);
        return;
    }
};