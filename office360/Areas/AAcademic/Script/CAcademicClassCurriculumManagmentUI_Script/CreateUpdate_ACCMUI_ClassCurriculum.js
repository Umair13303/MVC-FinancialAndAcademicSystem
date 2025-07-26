/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE ACCM_CLASSCURRICULAM                                           **----------------------------------------------*/
var OperationType = "";
var DDL_Condition = "";
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
            //GET_AASM_ADMISSIONSESSION_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
    PopulateDropDownLists();
    ChangeCase();
});

function PopulateDropDownLists() {
    PopulateMT_BM_Branch_ListByParam();
    PopulateLK_Semester_List();
}

/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER                                                                         **----------------------------------------------*/
function ChangeCase() {
    $('#DropDownListClass').change(function () {
        var IsSemesterRequired = $('#DropDownListClass :selected').attr('data-IsSemesterRequired') == "true";
        $('#DropDownListSemester').val('-1').change();
        if (IsSemesterRequired) {
            $('#DropDownListSemester').prop('disabled', false);
        }
        else {
            $('#DropDownListSemester').prop('disabled', true);
        }
    });

    $('#DropDownListCampus').change(function () {
        var CampusId = $("#DropDownListCampus :selected").val();
        /*--var ClassIds = null;  NOT PROVIDED ON LOAD --*/
        PopulateMT_ACM_Class_ListByParam(CampusId, null);
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
            var s = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description+ '</option>';
            }
            $("#DropDownListCampus").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_MAIN-- STORED PROCEDURE (ON CHANGE)                              **----------------------------------------------*/
function PopulateMT_ACM_Class_ListByParam(CampusId, ClassId) {
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.ACM_CLASS_BY_CAMPUSID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.ACM_CLASS_BY_CAMPUSID_FORUPDATERECORD;
            break;
    }
    var JsonArg = {
        DB_IF_PARAM: DDL_Condition,
        CampusId: CampusId,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicClassCurriculumManagmentUI/GET_MT_ACM_CLASS_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option data-IsSemesterRequired="' + data[i].IsSemesterRequired+'"' + (data[i].Id == ClassId ? 'selected' : '') + ' value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListClass").html(s);
        },
        complete: function () {
           
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY (ON LOAD)                                      **----------------------------------------------*/
function PopulateLK_Semester_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicClassCurriculumManagmentUI/GET_LK1_SEMESTER",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListSemester").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR)                                                **----------------------------------------------*/
function ValidateInputFields() {
    if ($('#DropDownListCampus').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxDescription').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#DropDownListClass').RequiredDropdown() == false) {
        return false;
    }
    var IsSemesterRequired = $('#DropDownListClass :selected').attr('data-IsSemesterRequired') == "true";
    if (IsSemesterRequired) {
        if ($('#DropDownListSemester').RequiredDropdown() == false) {
            return false;
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
            //UpSertDataIntoDB();
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
            //UpSertDataIntoDB();
        }
        catch {
            GetMessageBox(err, 505);
        }
    }
});
function ClearInputFields() {
    //-----------NOT CLEARING REQUIRED FIELD
    $('.form-control').not('#DropDownListClassCurriculum').val('');
    $('.select2').not('#DropDownListClassCurriculum').val('-1').change();
    $('form').removeClass('Is-Valid');
}

/*----------------------------------** FUNCTION FOR:: UPDATE CLASSCURRICULAM (LOAD DROPDOWN,DATA FOR CLASSCURRICULAMID)                        **----------------------------------------------*/
$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListCampus').RequiredDropdown() == false) {
        return false;
    }
    else {
        GET_ACCM_CLASSCURRICULUM_INFOBYGUID();
    }
});
function GET_ACCM_CLASSCURRICULUM_LISTBYPARAM() {
    $('#DropDownListClassCurriculum').empty();
    $('#DropDownListClassCurriculum').select2({
        placeholder: 'Search By Class Name / Subject Name / Curriculum Code',
        minimumInputLength: 3,
        ajax: {
            url: BasePath + "/ABranch/CBranchManagmentUI/GET_MT_BM_BRANCH_BYPARAMETER_SEARCH",
            type: "POST",
            delay: 250,
            data: function (params) {
                return {
                    PostedData: {
                        SearchParameter: params.term,
                        DB_IF_PARAM: DOCUMENT_LIST_CONDITION.BM_BRANCH_BY_ALLOWEDBRANCHIDS_SEARCH_PARAMETER_UPDATEBRANCH,
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
function GET_ACCM_CLASSCURRICULUM_INFOBYGUID() {
    var ClassCurriculumId = $('#DropDownListClassCurriculum :selected').val();
    if (ClassCurriculumId != null && ClassCurriculumId != undefined && ClassCurriculumId != "" && ClassCurriculumId != "-1") {

        var JsonArg = {
            GuID: ClassCurriculumId,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/ABranch/CBranchManagmentUI/GET_MT_BM_BRANCH_INFOBYGUID",
            dataType: 'json',
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                if (data.length > 0) {
                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON LOAD/STATIC --*/

                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON CHANGE --*/
                }
                else {
                    GetMessageBox("NO RECORD FOUND FOR FOR SELECTED CLASS CURRICULUM.... CONTACT DEVELOPER TEAM", 505);
                }
            },
            complete: function () {
                stopLoading();
            },
            error: function (jqXHR, error, errorThrown) {
                GetMessageBox("ERROR FETCHING RECORD FROM SERVER FOR SELECTED CLASS CURRICULUM.... CONTACT DEVELOPER TEAM", 505);
            },
        });
    }
    else {
        GetMessageBox("Please Select A CLASS CURRICULUM", 505);
        return;
    }
};