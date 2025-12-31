/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE SM_STUDENT                                                    **----------------------------------------------*/
var OperationType = "";

var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

/*----------------------------------** FUNCTION FOR::PAGE LOADER                                                                                **----------------------------------------------*/
$(document).ready(function () {
    DB_OperationType = $('#HiddenFieldDB_OperationType').val();
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            $('#DivButtonSubmitDown').show();
            $('#DivButtonUpdateDown').hide();
            break;
        case DBOperation.UPDATE:
            GET_SM_STUDENT_LISTBYPARAM();
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
    var JsonArg = {
        OperationType: DB_OperationType
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/CStudentManagmentUI/GET_MT_BM_BRANCH_BYPARAMTER",
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
    var JsonArg = {
        OperationType: DB_OperationType,
        CampusId: CampusId,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/CStudentManagmentUI/GET_MT_AASM_ADMISSIONSESSION_BYPARAMTER",
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
    var JsonArg = {
        OperationType: DB_OperationType,
        CampusId: CampusId,
        AdmissionSessionId: AdmissionSessionId,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AStudent/CStudentManagmentUI/GET_MT_ACM_CLASS_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option value="' + data[i].Id + '"' + (data[i].Id == ClassId ? ' selected' : '') + '>' + data[i].Description + '</option>';
            }
            $("#DropDownListClass").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateMT_ACFSM_ClassFeeStructure_ListByParam(ClassId, ClassFeeStructureId) {
    var JsonArg = {
        OperationType: DB_OperationType,
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
                List += '<option value="' + data[i].Id + '"' + (data[i].Id == ClassFeeStructureId ? ' selected' : '') + '>' + data[i].Description + '</option>';
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
    var IS_VALID = true;
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
    var IS_VALID = true;
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
        data: { 'OperationType': OperationType, 'PostedDataDetail': (SM_StudentDetail) },
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
    $('.form-control').not('#DropDownListCampus,#DropDownListStudent').val('');
    $('.select2').not('#DropDownListCampus,#DropDownListStudent').val('-1').change();
    $('form').removeClass('Is-Valid');
}


/*----------------------------------** FUNCTION FOR:: UPDATE BRANCH (LOAD DROPDOWN,DATA FOR BRANCHID)                                           **----------------------------------------------*/
$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListCampus').RequiredDropdown() === false) {
        return false;
    }
    if ($('#DropDownListStudent').RequiredDropdown() == false) {
        return false;
    }
    else {
        GET_SM_STUDENT_INFOBYGUID();
    }
});
function GET_SM_STUDENT_LISTBYPARAM() {
    $('#DropDownListStudent').empty();
    $('#DropDownListStudent').select2({
        placeholder: 'Search By Student Name / Student CNIC / Registration Number',
        minimumInputLength: 3,
        ajax: {
            url: BasePath + "/AStudent/CStudentManagmentUI/GET_MT_SM_STUDENT_BYPARAMETER_SEARCH",
            type: "POST",
            delay: 250,
            data: function (params) {
                if ($('#DropDownListCampus').RequiredDropdown() === false) {
                    return false;
                }
                var CampusId = $("#DropDownListCampus :selected").val();
                return {
                    PostedData: {
                        SearchParameter: params.term,
                        CampusId: CampusId,
                        DB_IF_PARAM: DOCUMENT_LIST_CONDITION.SM_STUDENT_BY_CAMPUSID_SEARCH_PARAMETER_UPDATESTUDENT,
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
function GET_SM_STUDENT_INFOBYGUID() {
    var StudentId = $('#DropDownListStudent :selected').val();
    var CampusId = $("#DropDownListCampus :selected").val();

    if (StudentId != null && StudentId != undefined && StudentId != "" && StudentId != "-1") {
        var JsonArg = {
            GuID: StudentId,
            CampusId: CampusId,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/AStudent/CStudentManagmentUI/GET_MT_SM_STUDENT_INFOBYGUID",
            dataType: 'json',
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                if (data.length > 0) {
                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON LOAD/STATIC --*/
                    $("#DropDownListAdmissionCategory").val(data[0].AdmissionCategoryId).trigger('change.select2');
                    $("#TextBoxRegistrationNumber").val(data[0].RegistrationNumber);
                    $("#TextBoxStudentName").val(data[0].StudentName);
                    $("#TextBoxStudentCNIC").val(data[0].StudentCNIC);
                    $("#TextBoxBirthDate").val(data[0].BirthDate);
                    //GET_TRIGGER_DATEPICKER_SIMPLE(data[0].BirthDate, '#TextBoxBirthDate');
                    $("#DropDownListReligion").val(data[0].ReligionId).trigger('change.select2');
                    $("#DropDownListCountry").val(data[0].CountryId).trigger('change.select2');
                    $("#TextBoxDomicileDistrict").val(data[0].DomicileDistrict);
                    $("#TextBoxFatherName").val(data[0].FatherName);
                    $("#TextBoxFatherCNIC").val(data[0].FatherCNIC);
                    $("#DropDownListOccupation").val(data[0].OccupationId).trigger('change.select2');
                    $("#TextBoxGuardianName").val(data[0].GuardianName);
                    $("#TextBoxGuardianCNIC").val(data[0].GuardianCNIC);
                    $("#TextBoxStudentMobile").val(data[0].StudentMobile);
                    $("#TextBoxStudentEmail").val(data[0].StudentEmail);
                    $("#TextBoxParentMobile").val(data[0].ParentMobile);
                    $("#TextBoxLandLine").val(data[0].LandLine);
                    $("#TextBoxEmergencyMobile").val(data[0].EmergencyMobile);
                    $("#TextBoxAddress").val(data[0].Address);
                    $("#TextBoxRemarks").val(data[0].Remarks).prop('disabled', true);
                    $("#HiddenFieldStudentGuID").val(data[0].GuID);

                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON CHANGE --*/
                    PopulateMT_AASM_AdmissionSession_ListByParam(data[0].CampusId, data[0].AdmissionSessionId);
                    PopulateMT_ACM_Class_ListByParam(data[0].CampusId, data[0].AdmissionSessionId, data[0].ClassId);
                    PopulateMT_ACFSM_ClassFeeStructure_ListByParam(data[0].ClassId, 1);
                }
                else {
                    GetMessageBox("NO RECORD FOUND FOR FOR SELECTED STUDENT.... CONTACT DEVELOPER TEAM", 505);
                }
            },
            complete: function () {
                stopLoading();
            },
            error: function (jqXHR, error, errorThrown) {
                GetMessageBox("ERROR FETCHING RECORD FROM SERVER FOR SELECTED BRANCH/CAMPUS.... CONTACT DEVELOPER TEAM", 505);
            },
        });
    }
    else {
        GetMessageBox("Please Select A Student / Campus", 505);
        return;
    }
};