/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE ACM_CLASS                       **----------------------------------------------*/
var OperationType = "";
var DDL_Condition = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

/*----------------------------------** FUNCTION FOR::PAGE LOADER                                                 **----------------------------------------------*/
$(document).ready(function () {
    DB_OperationType = $('#HiddenFieldDB_OperationType').val();
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            $('#DivButtonSubmitDown').show();
            $('#DivButtonUpdateDown').hide();
            break;
        case DBOperation.UPDATE:
            GET_ACM_CLASS_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
    PopulateDropDownLists();
    ChangeCase();
});

function PopulateDropDownLists() {
    PopulateMT_BM_Branch_ListByParam();
    PopulateLK_StudyLevel_List();
    PopulateLK_StudyGroup_List();
    PopulateLK_StudyScheme_List();
}

/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER                                          **----------------------------------------------*/
function ChangeCase() {
    //-----------FOR ::EDIT CASE
    $('#DropDownListClass').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_MAIN-- STORED PROCEDURE (ON LOAD) **----------------------------------------------*/
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
        url: BasePath + "/AAcademic/CAcademicClassManagmentUI/GET_MT_BM_BRANCH_BYPARAMTER",
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

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY (ON LOAD)       **----------------------------------------------*/
function PopulateLK_StudyLevel_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicClassManagmentUI/GET_LK1_STUDYLEVEL",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List  += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListStudyLevel").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_StudyGroup_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicClassManagmentUI/GET_LK1_STUDYGROUP",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListStudyGroup").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateLK_StudyScheme_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicClassManagmentUI/GET_LK1_STUDYSCHEME",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListStudyScheme").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR)                 **----------------------------------------------*/
function ValidateInputFields() {

    if ($('#DropDownListCampus').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxDescription').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#DropDownListStudyLevel').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListStudyGroup').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListStudyScheme').RequiredDropdown() == false) {
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
    var CampusId = $('#DropDownListCampus :selected').val();
    var Description = $('#TextBoxDescription').val();
    var StudyLevelId = $('#DropDownListStudyLevel :selected').val();
    var StudyGroupId = $('#DropDownListStudyGroup :selected').val();
    var StudySchemeId = $('#DropDownListStudyScheme :selected').val();
    var Remarks = $('#TextBoxRemarks').val();
    var ClassGuID = $('#HiddenFieldClassGuID').val();

    var JsonArg = {
        GuID: ClassGuID,
        OperationType: OperationType,

        CampusId: CampusId,
        Description: Description,
        StudyLevelId: StudyLevelId,
        StudyGroupId: StudyGroupId,
        StudySchemeId: StudySchemeId,
        Remarks: Remarks,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicClassManagmentUI/UpSert_Into_ACM_Class",
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
    $('.form-control').not('#DropDownListClass').val('');
    $('.select2').not('#DropDownListClass').val('-1').change();
    $('form').removeClass('Is-Valid');
}

/*----------------------------------** FUNCTION FOR:: UPDATE BRANCH (LOAD DROPDOWN,DATA FOR CLASSID)             **----------------------------------------------*/
$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListClass').RequiredDropdown() == false) {
     //   return false;
    }
    else {
        GET_ACM_CLASS_INFOBYGUID();
    }
});
function GET_ACM_CLASS_LISTBYPARAM() {
    $('#DropDownListClass').empty();
    $('#DropDownListClass').select2({
        placeholder: 'Search By Class Name / Class Code/ Campus Name',
        minimumInputLength: 3,
        templateResult: function (item) {
            return QueryDropDownListContainer_Plain(item, ['ClassName']);
        },
        templateSelection: function (item) {
            return item.text;
        },
        ajax: {
            url: BasePath + "/AAcademic/CAcademicClassManagmentUI/GET_MT_ACM_CLASS_BYPARAMETER_SEARCH",
            type: "POST",
            delay: 250,
            data: function (params) {
                return {
                    PostedData: {
                        SearchParameter: params.term,
                        DB_IF_PARAM: DOCUMENT_LIST_CONDITION.ACM_CLASS_BY_ALLOWEDBRANCHIDS_SEARCH_PARAMETER_UPDATECLASS,
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
                            ClassName: item.Description,
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
function GET_ACM_CLASS_INFOBYGUID() {
    var ClassId = $('#DropDownListClass :selected').val();
    if (ClassId != null && ClassId != undefined && ClassId != "" && ClassId != "-1") {
        var JsonArg = {
            GuID: ClassId,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/AAcademic/CAcademicClassManagmentUI/GET_MT_ACM_CLASS_INFOBYGUID",
            dataType: 'json',
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                if (data.length > 0) {
                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON LOAD/STATIC --*/
                    $('#DropDownListCampus').val(data[0].CampusId).trigger('change.select2');
                    $('#TextBoxDescription').val(data[0].Description);
                    $('#DropDownListStudyLevel').val(data[0].StudyLevelId).trigger('change.select2');
                    $('#DropDownListStudyGroup').val(data[0].StudyGroupId).trigger('change.select2');
                    $('#DropDownListStudyScheme').val(data[0].StudySchemeId).trigger('change.select2');
                    $('#TextBoxRemarks').val(data[0].Remarks).prop('disabled', true);
                    $('#HiddenFieldClassGuID').val(data[0].GuID);
                }
                else {
                    GetMessageBox("NO RECORD FOUND FOR SELECTED CLASS.... CONTACT DEVELOPER TEAM", 505);
                }
            },
            complete: function () {
                stopLoading();
            },
            error: function (jqXHR, error, errorThrown) {
                GetMessageBox("ERROR FETCHING RECORD FROM SERVER FOR SELECTED CLASS.... CONTACT DEVELOPER TEAM", 505);
            },
        });
    }
    else {
        GetMessageBox("Please Select A Class", 505);
        return;
    }
};