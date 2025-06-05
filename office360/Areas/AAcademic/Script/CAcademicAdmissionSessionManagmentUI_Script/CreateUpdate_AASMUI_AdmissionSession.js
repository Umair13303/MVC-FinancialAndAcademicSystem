/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE BM_BRANCH **-----------------------------------------------*/
var OperationType = "";
var DDL_Condition = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;



/*----------------------------------** FUNCTION FOR::PAGE LOADER **------------------------------------------------------------------------------*/
$(document).ready(function () {
    DB_OperationType = $('#HiddenFieldDB_OperationType').val();
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            $('#DivButtonSubmitDown').show();
            $('#DivButtonUpdateDown').hide();
            break;
        case DBOperation.UPDATE:
           // GET_ACM_CLASS_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
    PopulateDropDownLists();
    ChangeCase();

});

function PopulateDropDownLists() {
    PopulateMT_BM_Branch_ListByParam();
    PopulateLK_AcademicYear_List();
}

/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER **-----------------------------------------------------------------------*/
function ChangeCase() {
    $('#DropDownListCampus').change(function () {
        PopulateMT_ACM_Class_ListByParam();
    });
    $('#TextBoxSessionStartDate').change(function () {
        var SessionStartDate = $('#TextBoxSessionStartDate').val();
        GET_INCREMENT_DATEPICKER_SIMPLE("#TextBoxSessionEndDate", SessionStartDate, DATEPICKER_INCREMENT.FOR_ADMISSION_SESSION_ROUTINE);
    });
    $('#TextBoxAdmissionStartDate').change(function () {
        var AdmissionStartDate = $('#TextBoxAdmissionStartDate').val();
        GET_INCREMENT_DATEPICKER_SIMPLE("#TextBoxAdmissionEndDate", AdmissionStartDate, DATEPICKER_INCREMENT.FOR_ADMISSION_OPENING_ROUTINE);
    });
    //-----------FOR ::EDIT CASE
    $('#DropDownListAdmissionSession').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });
   
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_MAIN-- STORED PROCEDURE **----------------------------------------------*/
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
        url: BasePath + "/AAcademic/CAcademicAdmissionSessionManagmentUI/GET_MT_BM_BRANCH_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListCampus").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateMT_ACM_Class_ListByParam() {
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.ACM_CLASS_BY_CAMPUSID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.ACM_CLASS_BY_CAMPUSID_FORUPDATERECORD;
            break;
    }
    var CampusId = $("#DropDownListCampus :selected").val();

    var JsonArg = {
        DB_IF_PARAM: DDL_Condition,
        CampusId: CampusId,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicAdmissionSessionManagmentUI/GET_MT_ACM_CLASS_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListClasses").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}


/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY **----------------------------------------------*/
function PopulateLK_AcademicYear_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicAdmissionSessionManagmentUI/GET_LK1_ACADEMICYEAR",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListAcademicYear").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}


/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR) **----------------------------------------------*/
function ValidateInputFields() {
    if ($('#DropDownListCampus').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxDescription').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxSessionStartDate').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxSessionEndDate').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxAdmissionStartDate').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxAdmissionEndDate').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#DropDownListAcademicYear').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListClasses').RequiredDropdown() == false) {
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
function UpSertDataIntoDB() {
    var CampusId = $("#DropDownListCampus :selected").val();
    var Description = $("#TextBoxDescription").val();
    var SessionStartDate = $("#TextBoxSessionStartDate").val();
    var SessionEndDate = $("#TextBoxSessionEndDate").val();
    var AdmissionStartDate = $("#TextBoxAdmissionStartDate").val();
    var AdmissionEndDate = $("#TextBoxAdmissionEndDate").val();
    var AcademicYearId = $("#DropDownListAcademicYear :selected").val();
    var ClassIds = $("#DropDownListClasses").val();
    var IsEnteryTestRequired = $('#CheckBoxIsEnteryTestRequired').prop('checked');
    var IsInterviewRequired = $('#CheckBoxIsInterviewRequired').prop('checked');
    var Remarks = $('#TextBoxRemarks').val();

    var AdmissionSessionGuID = $('#HiddenFieldAdmissionSessionGuID').val();

    var JsonArg = {
        GuID: AdmissionSessionGuID,
        OperationType: OperationType,

        CampusId: CampusId,
        Description: Description,
        SessionStartDate: SessionStartDate,
        SessionEndDate: SessionEndDate,
        AdmissionStartDate: AdmissionStartDate,
        AdmissionEndDate: AdmissionEndDate,
        AcademicYearId: AcademicYearId,
        ClassIds: ClassIds.toString(),
        IsEnteryTestRequired: IsEnteryTestRequired,
        IsInterviewRequired: IsInterviewRequired,
        Remarks: Remarks,
    }

   
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicAdmissionSessionManagmentUI/UpSert_Into_AASM_AdmissionSession",
        dataType: 'json',
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            this.complete(data.Message, data.StatusCode)
        },
        complete: function (Message, StatusCode) {
            stopLoading();
            ClearInputFields();
            GetMessageBox(Message, StatusCode);
        },
        error: function (jqXHR, error, errorThrown) {
            GetMessageBox("The Transaction Can Not Be Performed Due To Serve Activity", 500);
        },
    });
}

function ClearInputFields() {
    //-----------NOT CLEARING REQUIRED FIELD
    $('.form-control').not('#DropDownListAdmissionSession').val('');
    $('.select2').not('#DropDownListAdmissionSession').val('-1').change();
    $('form').removeClass('Is-Valid');
}

/*----------------------------------** FUNCTION FOR:: UPDATE BRANCH (LOAD DROPDOWN,DATA FOR ADMISSIONSESSIONID) **-----------------------------------------*/
