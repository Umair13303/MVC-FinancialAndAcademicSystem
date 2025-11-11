/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE ADTM_DISCOUNTTYPE                          **----------------------------------------------*/
var OperationType = "";
var DDL_Condition = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

var FeeStructureFeeTypeTable = "";

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
        CalculationBoxFeeStructureFeeTypeTable();
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
    FeeStructureFeeTypeTable = $('#MainTableAFSM_FeeStructureFeeType').DataTable({
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
                $('#MainTableAFSM_FeeStructureFeeType').DataTable().row($(this).closest('tr')).remove().draw();
            });
        }
    });
    FeeStructureFeeTypeTable.on('order.dt search.dt', function () {
        FeeStructureFeeTypeTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
    FeeStructureFeeTypeTable.on('draw', function () {
        CalculationBoxFeeStructureFeeTypeTable();
    });
    HTML_DATATABLE_UTIL.APPEND_FOOTER("TDTotalFeeTypeAmount", "MainTableAFSM_FeeStructureFeeType", "11", "Total Fee");
    HTML_DATATABLE_UTIL.APPEND_FOOTER("TDWithHoldingTaxAmount", "MainTableAFSM_FeeStructureFeeType", "11", "With Holding Tax");
    HTML_DATATABLE_UTIL.APPEND_FOOTER("TDNetFeeAmount", "MainTableAFSM_FeeStructureFeeType", "11", "Net Fee (Tax Inclusive)");
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
    FeeStructureFeeTypeTable.column(1).data().each(function (value, index) {
        if (value == (Table_Row[1])) {
            IsRecordAlreadyInserted = true;
        }
    });
    if (IsRecordAlreadyInserted) {
        GetMessageBox("Duplicate Record Exist", 505)
    }
    else {
        FeeStructureFeeTypeTable.row.add(Table_Row).draw();
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
function CalculationBoxFeeStructureFeeTypeTable() {
    var TotalFeeTypeAmount = FeeStructureFeeTypeTable.column(11).data().reduce(function (a, b) {
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
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.ACOAM_CHARTOFACCOUNT_BY_COMPANYID_ACCOUNTTYPEID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.ACOAM_CHARTOFACCOUNT_BY_COMPANYID_ACCOUNTTYPEID_FORUPDATERECORD;
            break;
    }
    var JsonArg = {
        DB_IF_PARAM: DDL_Condition,
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
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.ACOAM_CHARTOFACCOUNT_BY_COMPANYID_ACCOUNTTYPEID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.ACOAM_CHARTOFACCOUNT_BY_COMPANYID_ACCOUNTTYPEID_FORUPDATERECORD;
            break;
    }
    var JsonArg = {
        DB_IF_PARAM: DDL_Condition,
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
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.ACOAM_CHARTOFACCOUNT_BY_COMPANYID_ACCOUNTTYPEID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.ACOAM_CHARTOFACCOUNT_BY_COMPANYID_ACCOUNTTYPEID_FORUPDATERECORD;
            break;
    }
    var JsonArg = {
        DB_IF_PARAM: DDL_Condition,
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
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.ACOAM_CHARTOFACCOUNT_BY_COMPANYID_ACCOUNTTYPEID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.ACOAM_CHARTOFACCOUNT_BY_COMPANYID_ACCOUNTTYPEID_FORUPDATERECORD;
            break;
    }
    var JsonArg = {
        DB_IF_PARAM: DDL_Condition,
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
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.AFTM_FEETYPE_BY_COMPANYID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.AFTM_FEETYPE_BY_COMPANYID_FORUPDATERECORD;
            break;
    }
    var JsonArg = {
        DB_IF_PARAM: DDL_Condition,
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
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.AASM_ADMISSIONSESSION_BY_CAMPUSID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.AASM_ADMISSIONSESSION_BY_CAMPUSID_FORUPDATERECORD;
            break;
    }
    var JsonArg = {
        DB_IF_PARAM: DDL_Condition,
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
                List += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListAdmissionSession").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateMT_ACM_Class_ListByParam(CampusId, AdmissionSessionId,ClassId) {
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.ACM_CLASS_BY_ADMISSIONSESSIONID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.ACM_CLASS_BY_ADMISSIONSESSIONID_FORUPDATERECORD;
            break;
    }
    var JsonArg = {
        DB_IF_PARAM: DDL_Condition,
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
                List += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
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
        GetMessageBox("Please Select A Fee Type", 505);
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
    if (!FeeStructureFeeTypeTable.data().count()) {
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
    var FeeStructureFeeTypeDetail = $('#MainTableAFSM_FeeStructureFeeType').DataTable().rows().data().toArray().map(row => {
        return Object.fromEntries(
            Object.entries(IncludedColumnMappings).map(([index, key]) => [key, row[index]])
        );
    });

    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountClassFeeStructureManagmentUI/UpSert_Into_ACFSM_ClassFeeStructure",
        dataType: 'json',
        data: { 'PostedData': (JsonArg), 'PostedDataDetail': (FeeStructureFeeTypeDetail) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            GetMessageBox(data.Message, data.StatusCode);
        },
        complete: function () {
            stopLoading();
            //ClearInputFields();
        },
        error: function (jqXHR, error, errorThrown) {
            GetMessageBox("The Transaction Can Not Be Performed Due To Serve Activity", 500);
        },
    });
}
function ClearInputFields() {
    //-----------NOT CLEARING REQUIRED FIELD
    $('.form-control').not('#DropDownListCampus').val('');
    $('.select2').not('#DropDownListCampus').val('-1').change();
    $('form').removeClass('Is-Valid');
    FeeStructureFeeTypeTable.clear().draw();
}

/*----------------------------------** FUNCTION FOR:: UPDATE BRANCH (LOAD DROPDOWN,DATA FOR FEESTRUCTUREID)                 **----------------------------------------------*/

$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListDiscountType').RequiredDropdown() == false) {
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
            url: BasePath + "/AAccount/CAccountDiscountTypeManagmentUI/GET_MT_ADTM_DISCOUNTTYPE_BYPARAMETER_SEARCH",
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
function GET_AFSM_FEESTRUCTURE_INFOBYGUID() {
    var FeeStructureId = $('#DropDownListFeeStructure :selected').val();
    if (FeeStructureId != null && FeeStructureId != undefined && FeeStructureId != "" && FeeStructureId != "-1") {
        var JsonArg = {
            GuID: FeeStructureId,
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