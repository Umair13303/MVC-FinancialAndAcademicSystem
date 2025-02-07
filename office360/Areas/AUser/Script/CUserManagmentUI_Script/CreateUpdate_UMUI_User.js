/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE UM_USER **-----------------------------------------------*/
var OperationType = "";
var DDL_Condition = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

var AllowedCampusIds = "";

/*----------------------------------** FUNCTION FOR::PAGE LOADER **------------------------------------------------------------------------------------*/
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
function ChangeCase() {
    $('#DropDownListCompany').change(function () {
        PopulateMT_BM_BranchCampus_ListByParam();
        PopulateMT_BM_Branch_ListByParam();
        PopulateMT_EM_Employee_ListByParam();
    });
    $("#DropDownListAllowedCampus").attr('data-width', '100%').select2({
        placeholder: 'Select an Option',
        multiple: true,
    }).change(function (event) {
        if (event.target == this) {
            AllowedCampusIds = $(this).val();
        }
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
/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY **----------------------------------------------------*/

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
function PopulateMT_BM_BranchCampus_ListByParam() {
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.BM_BRANCH_BY_COMPANYID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.BM_BRANCH_BY_COMPANYID_FORUPDATERECORD;
            break;
    }
    var CompanyId = $("#DropDownListCompany :selected").val();
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
            s += '<option value="0">Attach Branch On Later Stage</option>';

            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListBranch").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateMT_BM_Branch_ListByParam() {
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.BM_BRANCH_BY_COMPANYID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.BM_BRANCH_BY_COMPANYID_FORUPDATERECORD;
            break;
    }
    var CompanyId = $("#DropDownListCompany :selected").val();
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
            s += '<option value="0">Attach Branch On Later Stage</option>';

            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListAllowedCampus").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateMT_EM_Employee_ListByParam() {
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.BM_BRANCH_BY_COMPANYID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.BM_BRANCH_BY_COMPANYID_FORUPDATERECORD;
            break;
    }
    var CompanyId = $("#DropDownListCompany :selected").val();
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
            s += '<option value="0">Attach Employee On Later Stage</option>';

            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListEmployee").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR) **---------------------------------------------------*/
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
    //var AllowedCampusIds =AllowedCampusIds.toString();
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

/*----------------------------------** FUNCTION FOR:: UPDATE COMPANY (LOAD DROPDOWN,DATA FOR USERID) **-----------------------------------------------*/
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

                $('#TextBoxName').val(data[0].Name);
                $('#TextBoxUserName').val(data[0].UserName);
                $('#TextBoxPassword').val(data[0].Password);
                $('#TextBoxEmailAddress').val(data[0].EmailAddress);
                $('#TextBoxMobileNumber').val(data[0].MobileNumber);
                $('#DropDownListCompany').val(data[0].CompanyId).change();
                setTimeout(function () {
                    $('#DropDownListAllowedCampus').val(data[0].AllowedCampusIds.split(',')).change();
                }, 1000);
                setTimeout(function () {
                    $('#DropDownListBranch').val(data[0].BranchId).change();
                }, 1000);
                setTimeout(function () {
                    $('#DropDownListEmployee').val(data[0].EmployeeId).change();
                }, 1000);

                $('#DropDownListRole').val(data[0].RoleId).change();
                $('#TextBoxRemarks').val(data[0].Remarks);
                $('#HiddenFieldUserGuID').val(data[0].GuID);
            },
            complete: function () {

                stopLoading();
            },
        });


    }
    else {
        GetMessageBox("Please Select A User", 505);
        return;
    }
};


