/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE AQM_QUESTION                       **----------------------------------------------*/
var OperationType = "";
var DDL_Condition = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

/*----------------------------------** FUNCTION FOR::PAGE LOADER                                                    **----------------------------------------------*/
$(document).ready(function () {
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            $('#DivButtonSubmitDown').show();
            $('#DivButtonUpdateDown').hide();
            break;
        case DBOperation.UPDATE:
            GET_AQM_QUESTION_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
    PopulateDropDownLists();
    ChangeCase();
});


function PopulateDropDownLists() {
    PopulateMT_BM_Branch_ListByParam();
    PopulateLK_QuestionType_List();

}

/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER                                             **----------------------------------------------*/
function ChangeCase() {
    $('#DropDownListCampus').change(function () {
        var CampusId = $("#DropDownListCampus :selected").val();
        /*--var ClassId = null;  NOT PROVIDED ON LOAD --*/
        PopulateMT_ACM_Class_ListByParam(CampusId, null);
    });
    $('#DropDownListClass').change(function () {
        var ClassId = $("#DropDownListClass :selected").val();
        /*--var SubjectId = null;  NOT PROVIDED ON LOAD --*/
        PopulateMT_ASM_Subject_ListByParam(ClassId, null);
    });
    $('#DropDownListQuestionType,#DropDownListOptionLimit').change(function () {
        $('#DropDownListOptionLimit').prop('disabled', true);
        var QuestionTypeId = $("#DropDownListQuestionType :selected").val();
        var ContainerId = "ContainerDynamicOption";
        $("#" + ContainerId).empty();
        switch (QuestionTypeId) {
            case "1":/* MCQ */
                $('#DropDownListOptionLimit').prop('disabled', false);
                var OptionLimit = $("#DropDownListOptionLimit :selected").val();
                INPUT_FIELD.DYNAMIC_MCQ_OPTION_FIELD(ContainerId, OptionLimit);
                return;
            case "4": /* MATCH THE COLUMN */
                INPUT_FIELD.DYNAMIC_MTQ_ROW(ContainerId);
                return;

        }
    });
    $(document).on('keydown', '.match-to', function (e) {
        if (e.which == 9 || e.which == 13) {
            var isLastInput = $(this).closest('.match-pair-row').is(':last-child');
            if (isLastInput && $(this).val() !== "") {
                e.preventDefault();
                INPUT_FIELD.DYNAMIC_MTQ_ROW("ContainerDynamicOption");
                $(this).closest('.match-pair-row').next().find('.match-from').focus();
            }
        }
    });
    $(document).on('click', '.btn-remove-row', function () {
        if ($('.match-pair-row').length > 1) {
            $(this).closest('.match-pair-row').remove();
        }
    });
    //-----------FOR ::EDIT CASE
    $('#DropDownListQuestion').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_MAIN-- STORED PROCEDURE (ON LOAD)    **----------------------------------------------*/
function PopulateMT_BM_Branch_ListByParam() {
    var JsonArg = {
        OperationType: DB_OperationType,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicQuestionManagmentUI/GET_MT_BM_BRANCH_BYPARAMTER",
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

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_MAIN-- STORED PROCEDURE (ON CHANGE)  **----------------------------------------------*/
function PopulateMT_ACM_Class_ListByParam(CampusId, ClassId) {
    var JsonArg = {
        OperationType: DB_OperationType,
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
            var List = '<option  value="-1">Select an option</option>';
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
function PopulateMT_ASM_Subject_ListByParam(ClassId, SubjectId) {
    var JsonArg = {
        OperationType: DB_OperationType,
        ClassId: ClassId
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicQuestionManagmentUI/GET_MT_ASM_SUBJECT_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option ' + (data[i].Id == SubjectId ? 'selected' : '') + ' value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListSubject").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY (ON LOAD)       **----------------------------------------------*/
function PopulateLK_QuestionType_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicQuestionManagmentUI/GET_LK1_QUESTIONTYPE",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListQuestionType").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR)                    **----------------------------------------------*/
function ValidateInputFields() {

    if ($('#DropDownListCampus').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxDescription').RequiredTextBoxInputGroup() == false) {
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
            GetMessageBox(err.Message, 505);
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
    var ClassId = $('#DropDownListClass :selected').val();
    var SubjectId = $('#DropDownListSubject :selected').val();
    var QuestionTypeId = $("#DropDownListQuestionType :selected").val();
    var OptionLimit = $("#DropDownListOptionLimit :selected").val();
    var Chapter = $("#TextBoxChapter").val();
    var Description = $("#TextBoxDescription").val();
    var DifficultyLevelId = $("#DropDownListDifficultyLevel :selected").val();
    var Options = "";
    if (QuestionTypeId == "1") { // MCQ
        var mcqArray = [];
        $("input[name='mcq_option']").each(function () {
            if ($(this).val() !== "") mcqArray.push($(this).val());
        });
        Options = JSON.stringify(mcqArray);
    }
    else if (QuestionTypeId == "3") { // True/False
        Options = JSON.stringify(["True", "False"]);
    }
    else if (QuestionTypeId == "4") { // Match Column
        var matchPairs = [];
        $(".match-pair-row").each(function () {
            var from = $(this).find(".match-from").val();
            var to = $(this).find(".match-to").val();
            if (from !== "" || to !== "") {
                matchPairs.push({ From: from, To: to });
            }
        });
        Options = JSON.stringify(matchPairs);
    }
    var CorrectAnswer = $("#TextBoxCorrectAnswer").val();
    
    var Remarks = $("#TextBoxRemarks").val();
    var QuestionGuID = $("#HiddenFieldQuestionGuID").val();

    var JsonArg = {
        GuID: QuestionGuID,
        OperationType: OperationType,
        CampusId: CampusId,
        ClassId: ClassId,
        SubjectId: SubjectId,
        QuestionTypeId: QuestionTypeId,
        OptionLimit: OptionLimit,
        Chapter: Chapter,
        Description: Description,
        DifficultyLevelId: DifficultyLevelId,
        Options: Options,
        CorrectAnswer: CorrectAnswer,
        Remarks: Remarks,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicQuestionManagmentUI/UpSert_Into_AQM_Question",
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
    $('.form-control').not('#DropDownListQuestion').val('');
    $('.select2').not('#DropDownListQuestion').val('-1').change();
    $('form').removeClass('Is-Valid');
}

/*----------------------------------** FUNCTION FOR:: UPDATE QUESTION (LOAD DROPDOWN,DATA FOR QUESTIONID)           **----------------------------------------------*/
$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListQuestion').RequiredDropdown() == false) {
        return false;
    }
    else {
        GET_AQM_QUESTION_INFOBYGUID();
    }
});
function GET_AQM_QUESTION_LISTBYPARAM() {
    $('#DropDownListQuestion').empty();
    $('#DropDownListQuestion').select2({
        placeholder: 'Search By Question Name / Question Code',
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
function GET_AQM_QUESTION_INFOBYGUID() {
    var QuestionId = $('#DropDownListQuestion :selected').val();
    if (QuestionId != null && QuestionId != undefined && QuestionId != "" && QuestionId != "-1") {
        var JsonArg = {
            GuID: QuestionId,
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
                    $('#TextBoxRemarks').val(data[0].Remarks).prop('disabled', true);
                    $('#HiddenFieldQuestionGuID').val(data[0].GuID);
                }
                else {
                    GetMessageBox("NO RECORD FOUND FOR SELECTED QUESTION.... CONTACT DEVELOPER TEAM", 505);
                }
            },
            complete: function () {
                stopLoading();
            },
            error: function (jqXHR, error, errorThrown) {
                GetMessageBox("ERROR FETCHING RECORD FROM SERVER FOR SELECTED QUESTION.... CONTACT DEVELOPER TEAM", 505);
            },
        });
    }
    else {
        GetMessageBox("Please Select A QUESTION", 505);
        return;
    }
};