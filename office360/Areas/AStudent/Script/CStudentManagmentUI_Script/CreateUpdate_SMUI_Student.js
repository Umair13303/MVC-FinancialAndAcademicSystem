/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE SM_STUDENT                                                    **----------------------------------------------*/
var OperationType = "";
var DDL_Condition = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

var ClassCurriculumSubjectTable = "";
/*----------------------------------** FUNCTION FOR::PAGE LOADER                                                                                **----------------------------------------------*/
$(document).ready(function () {
    DB_OperationType = $('#HiddenFieldDB_OperationType').val();
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            $('#DivButtonSubmitDown').show();
            $('#DivButtonUpdateDown').hide();
            break;
        case DBOperation.UPDATE:
            GET_ACCM_CLASSCURRICULUM_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
    PopulateDropDownLists();
    ChangeCase();
});

function PopulateDropDownLists() {
    PopulateMT_BM_Branch_ListByParam();
    PopulateLK_AdmissionCategory_List();
    PopulateLK_Country_List();
    PopulateLK_Religion_List();
    PopulateLK_Occupation_List();
}

/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER                                                                         **----------------------------------------------*/
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
    $('#DropDownListClass').change(function () {
        var ClassId = $("#DropDownListClass :selected").val();
        var ClassFeeStructureId = null;
        PopulateMT_ACFSM_ClassFeeStructure_ListByParam(ClassId, ClassFeeStructureId)
    });
    //-----------FOR ::EDIT CASE
    $('#DropDownListClassCurriculum').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_MAIN-- STORED PROCEDURE (ON LOAD)                                **----------------------------------------------*/
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
        url: BasePath + "/AAcademic/CAcademicClassCurriculumManagmentUI/GET_MT_BM_BRANCH_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListCampus").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_MAIN-- LINQUERY (ON CHANGE)                                      **----------------------------------------------*/
function PopulateMT_AASM_AdmissionSession_ListByParam(CampusId, AdmissionSessionId) {
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
                List += '<option ' + (data[i].Id == AdmissionSessionId ? 'selected' : '') + ' value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListAdmissionSession").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateMT_ACM_Class_ListByParam(CampusId, AdmissionSessionId, ClassId) {
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
                List += '<option data-StudySchemeId="' + data[i].StudySchemeId + '"' + (data[i].Id == ClassId ? 'selected' : '') + ' value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListClass").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateMT_ACFSM_ClassFeeStructure_ListByParam(ClassId, ClassFeeStructureId) {
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.ACFSM_CLASSFEESTRUCTURE_BY_CLASSID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.ACFSM_CLASSFEESTRUCTURE_BY_CLASSID_FORUPDATERECORD;
            break;
    }
    var JsonArg = {
        DB_IF_PARAM: DDL_Condition,
        ClassId: ClassId,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/CStudentManagmentUI/GET_MT_ACFSM_CLASSFEESTRUCTURE_BYPARAMETER_",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListClassFeeStructure").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY (ON LOAD)                                      **----------------------------------------------*/
function PopulateLK_AdmissionCategory_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/CStudentManagmentUI/GET_LK1_ADMISSIONCATEGORY",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListAdmissionCategory").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_Religion_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/CStudentManagmentUI/GET_LK1_RELIGION",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListReligion").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_Country_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/CStudentManagmentUI/GET_LK1_COUNTRY",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListCountry").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_Occupation_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/CStudentManagmentUI/GET_LK1_OCCUPATION",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListOccupation").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}


/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR)                                                **----------------------------------------------*/
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
    var CampusId = $("#DropDownListCampus :selected").val();
    var AdmissionSessionId = $("#DropDownListAdmissionSession :selected").val();
    var ClassId = $("#DropDownListClass :selected").val();
    var ClassFeeStructureId = $("#DropDownListClassFeeStructure :selected").val();
    var AdmissionCategoryId = $("#DropDownListAdmissionCategory :selected").val();
    var RegistrationNumber = $("#TextBoxRegistrationNumber").val();
    var StudentName = $("#TextBoxStudentName").val();
    var StudentCNIC = $("#TextBoxStudentCNIC").val();
    var BirthDate = $("#TextBoxBirthDate").val();
    var ReligionId = $("#DropDownListReligion :selected").val();
    var CountryId = $("#DropDownListCountry :selected").val();
    var DomicileDistrict = $("#TextBoxDomicileDistrict").val();
    var FatherName = $("#TextBoxFatherName").val();
    var FatherCNIC = $("#TextBoxFatherCNIC").val();
    var OccupationId = $("#DropDownListOccupation :selected").val();
    var IsFatherAlive = $("#CheckBoxIsFatherAlive").prop("checked");
    var GuardianName = $("#TextBoxGuardianName").val();
    var GuardianCNIC = $("#TextBoxGuardianCNIC").val();
    var StudentMobile = $("#TextBoxStudentMobile").val();
    var StudentEmail = $("#TextBoxStudentEmail").val();
    var ParentMobile = $("#TextBoxParentMobile").val();
    var LandLine = $("#TextBoxLandLine").val();
    var EmergencyMobile = $("#TextBoxEmergencyMobile").val();
    var Address = $("#TextBoxAddress").val();
    var Remarks = $('#TextBoxRemarks').val();

    var StudentGuID = $('#HiddenFieldStudentGuID').val();

    var SM_StudentDetail = [];
    var JsonArg = {
        GuID: StudentGuID,
        OperationType: OperationType,

        CampusId: CampusId,
        AdmissionSessionId: AdmissionSessionId,
        ClassId: ClassId,
        ClassFeeStructureId: ClassFeeStructureId,
        AdmissionCategoryId: AdmissionCategoryId,
        RegistrationNumber: RegistrationNumber,
        StudentName: StudentName,
        StudentCNIC: StudentCNIC,
        BirthDate: BirthDate,
        ReligionId: ReligionId,
        CountryId: CountryId,
        DomicileDistrict: DomicileDistrict,
        FatherName: FatherName,
        FatherCNIC: FatherCNIC,
        OccupationId: OccupationId,
        IsFatherAlive: IsFatherAlive,
        GuardianName: GuardianName,
        GuardianCNIC: GuardianCNIC,
        StudentMobile: StudentMobile,
        StudentEmail: StudentEmail,
        ParentMobile: ParentMobile,
        LandLine: LandLine,
        EmergencyMobile: EmergencyMobile,
        Address: Address,
        Remarks: Remarks,
    }
    SM_StudentDetail.push(JsonArg);
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/CStudentManagmentUI/UpSert_Into_SM_Student",
        dataType: 'json',
        data: { 'PostedData': (SM_StudentDetail) },
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
    $('.form-control').not('#DropDownListCampus').val('');
    $('.select2').not('#DropDownListCampus').val('-1').change();
    $('form').removeClass('Is-Valid');
}
