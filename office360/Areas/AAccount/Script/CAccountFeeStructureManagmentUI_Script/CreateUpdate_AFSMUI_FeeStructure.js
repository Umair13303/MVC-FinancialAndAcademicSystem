/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE ADTM_DISCOUNTTYPE                          **----------------------------------------------*/
var OperationType = "";
var DDL_Condition = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

var FeeStructureFeeTypeTable = "";


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

    //-----------FOR ::EDIT CASE
    $('#DropDownListFeeStructure').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });
}
/*----------------------------------** FUNCTION FOR::INITIALIZING DATA TABLE's & RELATED OPERATION's                         **----------------------------------------------*/
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
}
function ValidateInputFieldsFeeStructureFeeTypeDetail() {
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
    var FeeType = $("#DropDownListFeeType :selected").text();
    var RevenueAccount = $("#DropDownListRevenueAccount :selected").text();
    var AssetAccount = $("#DropDownListAssetAccount :selected").text();
    var LiabilityAccount = $("#DropDownListLiabilityAccount :selected").text();
    var CostOfSaleAccount = $("#DropDownListCostOfSaleAccount :selected").text();

    var FeeTypeId = $("#DropDownListFeeType :selected").val();
    var RevenueAccountId = $("#DropDownListRevenueAccount :selected").val();
    var AssetAccountId = $("#DropDownListAssetAccount :selected").val();
    var LiabilityAccountId = $("#DropDownListLiabilityAccount :selected").val();
    var CostOfSaleAccountId = $("#DropDownListCostOfSaleAccount :selected").val();

    var Amount = $("#TextBoxAmount").val();

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
    FeeStructureFeeTypeTable.row.add(Table_Row).draw();

    //ClearInputFieldsDataTable();
}


/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY (ON LOAD)                  **----------------------------------------------*/
function PopulateLK_ChallanMethod_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AAccount/CAccountFeeStructureManagmentUI/GET_LK1_CHALLANMETHOD",
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
        url: BasePath + "/AAccount/CAccountFeeStructureManagmentUI/GET_LK1_WHTAXPOLICY",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
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
        url: BasePath + "/AAccount/CAccountFeeStructureManagmentUI/GET_MT_BM_BRANCH_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
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
        url: BasePath + "/AAccount/CAccountFeeStructureManagmentUI/GET_MT_ACOAM_REVENUEACCOUNT_BYPARAMTER",
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
        url: BasePath + "/AAccount/CAccountFeeStructureManagmentUI/GET_MT_ACOAM_ASSETACCOUNT_BYPARAMTER",
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
        url: BasePath + "/AAccount/CAccountFeeStructureManagmentUI/GET_MT_ACOAM_LIABILITYACCOUNT_BYPARAMTER",
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
        url: BasePath + "/AAccount/CAccountFeeStructureManagmentUI/GET_MT_ACOAM_COSTOFSALEACCOUNT_BYPARAMTER",
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
        url: BasePath + "/AAccount/CAccountFeeStructureManagmentUI/GET_MT_AFTM_FEETYPE_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
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
        url: BasePath + "/AAccount/CAccountFeeStructureManagmentUI/GET_MT_AASM_ADMISSIONSESSION_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
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
        url: BasePath + "/AAccount/CAccountFeeStructureManagmentUI/GET_MT_ACM_CLASS_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListClass").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR)                            **----------------------------------------------*/
$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListDiscountType').RequiredDropdown() == false) {
        return false;
    }
    else {
        GET_ADTM_DISCOUNTTYPE_INFOBYGUID();
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