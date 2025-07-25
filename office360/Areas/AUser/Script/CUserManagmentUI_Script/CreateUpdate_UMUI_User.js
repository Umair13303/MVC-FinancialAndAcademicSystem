/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE UM_USER                                **----------------------------------------------*/
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
            GET_UM_USER_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
    PopulateDropDownLists();
    ChangeCase();
});

function PopulateDropDownLists() {
    PopulateMT_CM_Company_ListByParam();
    PopulateLK_Role_List();
}

/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER                                                 **----------------------------------------------*/
function ChangeCase() {

    $('#DropDownListCompany').change(function () {
        var CompanyId = $('#DropDownListCompany :selected').val();
        /*-- var AllowedCampusIds = null; NOT PROVIDED ON LOAD --*/
        /*-- var BranchId = null;  NOT PROVIDED ON LOAD --*/
        /*-- var EmployeeId = null;  NOT PROVIDED ON LOAD --*/
        PopulateMT_BM_BranchCampus_ListByParam(CompanyId, null);
        PopulateMT_BM_Branch_ListByParam(CompanyId, null);
        PopulateMT_EM_Employee_ListByParam(CompanyId, null);
    });

    //-----------FOR ::EDIT CASE
    $('#DropDownListUser').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
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
        url: BasePath + "/AUser/CUserManagmentUI/GET_MT_CM_COMPANY_BYPARAMTER",
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

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY (ON CHANGE)            **----------------------------------------------*/
function PopulateMT_BM_BranchCampus_ListByParam(CompanyId, AllowedCampusIds) {
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.BM_BRANCH_BY_COMPANYID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.BM_BRANCH_BY_COMPANYID_FORUPDATERECORD;
            break;
    }
    var JsonArg = {
        DB_IF_PARAM: DDL_Condition,
        CompanyId: CompanyId,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AUser/CUserManagmentUI/GET_MT_BM_BRANCH_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option value="-1">Select an option</option>';
            s += '<option value="0">Attach Allowed Campus On Later Stage</option>';

            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListAllowedCampus").html(s);
        },
        complete: function () {
            if (AllowedCampusIds != null && AllowedCampusIds != undefined && AllowedCampusIds != "" && AllowedCampusIds != "-1") {
                $('#DropDownListAllowedCampus').val(AllowedCampusIds.split(',')).change();
            }
            stopLoading();
        },
    });
}
function PopulateMT_BM_Branch_ListByParam(CompanyId,BranchId) {
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.BM_BRANCH_BY_COMPANYID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.BM_BRANCH_BY_COMPANYID_FORUPDATERECORD;
            break;
    }
    var JsonArg = {
        DB_IF_PARAM: DDL_Condition,
        CompanyId: CompanyId,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AUser/CUserManagmentUI/GET_MT_BM_BRANCH_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option value="-1">Select an option</option>';
            s += '<option value="0" ' + (BranchId == 0 ? 'selected' : '') + '>Attach Branch On Later Stage</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option ' + (data[i].Id == BranchId ? 'selected' : '') + ' value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListBranch").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateMT_EM_Employee_ListByParam(CompanyId, EmployeeId) {
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.BM_BRANCH_BY_COMPANYID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.BM_BRANCH_BY_COMPANYID_FORUPDATERECORD;
            break;
    }
    var JsonArg = {
        DB_IF_PARAM: DDL_Condition,
        CompanyId: CompanyId,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AUser/CUserManagmentUI/GET_MT_EM_EMPLOYEE_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option value="-1">Select an option</option>';
            s += '<option value="0" ' + (EmployeeId == 0 ? 'selected' : '') + '>Attach Employee On Later Stage</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option ' + (data[i].Id == EmployeeId ? 'selected' : '') + ' value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListEmployee").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY (ON LOAD)              **----------------------------------------------*/
function PopulateLK_Role_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AUser/CUserManagmentUI/GET_LK1_ROLE",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListRole").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR)                        **----------------------------------------------*/
function ValidateInputFields() {

    if ($('#TextBoxName').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxUserName').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxPassword').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxEmailAddress').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxMobileNumber').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#DropDownListCompany').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListAllowedCampus').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListBranch').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListEmployee').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListRole').RequiredDropdown() == false) {
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
    var Name = $('#TextBoxName').val();
    var UserName = $('#TextBoxUserName').val();
    var Password = $('#TextBoxPassword').val();
    var EmailAddress = $('#TextBoxEmailAddress').val();
    var MobileNumber = $('#TextBoxMobileNumber').val();
    var CompanyId = $('#DropDownListCompany :selected').val(); 
    var BranchId = $('#DropDownListBranch :selected').val();
    var AllowedCampusIds = $('#DropDownListAllowedCampus').val();
    var EmployeeId = $('#DropDownListEmployee :selected').val();
    var RoleId = $('#DropDownListRole :selected').val();
    var IsLogIn = $('#CheckBoxIsLogIn').prop('checked');
    var IsDeveloper = $('#CheckBoxIsDeveloper').prop('checked');

    var Remarks = $('#TextBoxRemarks').val();
    var UserGuID = $('#HiddenFieldUserGuID').val();

    var JsonArg = {
        GuID: UserGuID,
        OperationType: OperationType,

        Name: Name,
        UserName: UserName,
        Password: Password,
        EmailAddress: EmailAddress,
        MobileNumber: MobileNumber,
        CompanyId: CompanyId,
        AllowedCampusIds: AllowedCampusIds.toString(),
        BranchId: BranchId,
        EmployeeId: EmployeeId,
        RoleId: RoleId,
        IsLogIn: IsLogIn,
        IsDeveloper: IsDeveloper,
        Remarks: Remarks,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AUser/CUserManagmentUI/UpSert_Into_UM_User",
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
    $('.form-control').not('#DropDownListUser').val('');
    $('.select2').not('#DropDownListUser').val('-1').change();
    $('form').removeClass('Is-Valid');
}

/*----------------------------------** FUNCTION FOR:: UPDATE COMPANY (LOAD DROPDOWN,DATA FOR ADMISSIONSESSIONID)        **-----------------------------------------------*/
$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListUser').RequiredDropdown() == false) {
        return false;
    }
    else {
        GET_UM_USER_INFOBYGUID();
    }
});
function GET_UM_USER_LISTBYPARAM() {
    $('#DropDownListUser').empty();
    $('#DropDownListUser').select2({
        placeholder: 'Search By User Name / Email Address',
        minimumInputLength: 3,
        ajax: {
            url: BasePath + "/AUser/CUserManagmentUI/GET_MT_UM_USER_BYPARAMETER_SEARCH",
            type: "POST",
            delay: 250,
            data: function (params) {
                return {
                    PostedData: {
                        SearchParameter: params.term,
                        DB_IF_PARAM: DOCUMENT_LIST_CONDITION.UM_USER_BY_SEARCH_PARAMETER_UPDATEUSER,
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
function GET_UM_USER_INFOBYGUID() {
    var UserId = $('#DropDownListUser :selected').val();
    if (UserId != null && UserId != undefined && UserId != "" && UserId != "-1") {
        var JsonArg = {
            GuID: UserId,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/AUser/CUserManagmentUI/GET_MT_UM_USER_INFOBYGUID",
            dataType: 'json',
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                if (data.length > 0) {
                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON LOAD/STATIC --*/
                    $('#TextBoxName').val(data[0].Name);
                    $('#TextBoxUserName').val(data[0].UserName);
                    $('#TextBoxPassword').val(data[0].Password);
                    $('#TextBoxEmailAddress').val(data[0].EmailAddress);
                    $('#TextBoxMobileNumber').val(data[0].MobileNumber);
                    $('#DropDownListCompany').val(data[0].CompanyId).trigger('change.select2');
                    $('#DropDownListRole').val(data[0].RoleId).change();
                    $('#TextBoxRemarks').val(data[0].Remarks).prop('disabled', true);
                    $('#HiddenFieldUserGuID').val(data[0].GuID);

                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON CHANGE --*/
                    PopulateMT_BM_BranchCampus_ListByParam(data[0].CompanyId, data[0].AllowedCampusIds);
                    PopulateMT_BM_Branch_ListByParam(data[0].CompanyId, data[0].BranchId);
                    PopulateMT_EM_Employee_ListByParam(data[0].CompanyId, data[0].EmployeeId);
                }
                else {
                    GetMessageBox("NO RECORD FOUND FOR FOR SELECTED USER.... CONTACT DEVELOPER TEAM", 505);
                }
            },
            complete: function () {
                stopLoading();
            },
            error: function (jqXHR, error, errorThrown) {
                GetMessageBox("ERROR FETCHING RECORD FROM SERVER FOR SELECTED USER.... CONTACT DEVELOPER TEAM", 505);
            },
        });
    }
    else {
        GetMessageBox("Please Select A User", 505);
        return;
    }
};


