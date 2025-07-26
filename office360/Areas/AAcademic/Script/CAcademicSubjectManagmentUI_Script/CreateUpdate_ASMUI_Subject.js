/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE ASM_SUBJECT                     **----------------------------------------------*/
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
            GET_ASM_SUBJECT_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
});

/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER                                          **----------------------------------------------*/
function ChangeCase() {
    //-----------FOR ::EDIT CASE
    $('#DropDownListSubject').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });
}

/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR)                 **----------------------------------------------*/
function ValidateInputFields() {
    if ($('#TextBoxDescription').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxShortDescription').RequiredTextBoxInputGroup() == false) {
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
    var Description = $('#TextBoxDescription').val();
    var ShortDescription = $('#TextBoxShortDescription').val();
    var Remarks = $('#TextBoxRemarks').val();

    var SubjectGuID = $('#HiddenFieldSubjectGuID').val();

    var JsonArg = {
        GuID: SubjectGuID,
        OperationType: OperationType,

        Description: Description,
        ShortDescription: ShortDescription,
        Remarks: Remarks,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicSubjectManagmentUI/UpSert_Into_ASM_Subject",
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
    $('.form-control').not('#DropDownListSubject').val('');
    $('.select2').not('#DropDownListSubject').val('-1').change();
    $('form').removeClass('Is-Valid');
}

/*----------------------------------** FUNCTION FOR:: UPDATE BRANCH (LOAD DROPDOWN,DATA FOR SUBJECTID)           **----------------------------------------------*/
$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListSubject').RequiredDropdown() == false) {
        return false;
    }
    else {
        GET_ASM_SUBJECT_INFOBYGUID();
    }
});
function GET_ASM_SUBJECT_LISTBYPARAM() {
    $('#DropDownListSubject').empty();
    $('#DropDownListSubject').select2({
        placeholder: 'Search By Subject Name / Short Description/ Subject Code',
        minimumInputLength: 3,
        ajax: {
            url: BasePath + "/AAcademic/CAcademicSubjectManagmentUI/GET_MT_ASM_SUBJECT_BYPARAMETER_SEARCH",
            type: "POST",
            delay: 250,
            data: function (params) {
                return {
                    PostedData: {
                        SearchParameter: params.term,
                        DB_IF_PARAM: DOCUMENT_LIST_CONDITION.ASM_SUBJECT_BY_COMPANYID_SEARCH_PARAMETER_UPDATESUBJECT,
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
function GET_ASM_SUBJECT_INFOBYGUID() {
    var SubjectId = $('#DropDownListSubject :selected').val();
    if (SubjectId != null && SubjectId != undefined && SubjectId != "" && SubjectId != "-1") {
        var JsonArg = {
            GuID: SubjectId,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/AAcademic/CAcademicSubjectManagmentUI/GET_MT_ASM_SUBJECT_INFOBYGUID",
            dataType: 'json',
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                if (data.length > 0) {
                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON LOAD/STATIC --*/
                    $('#TextBoxDescription').val(data[0].Description);
                    $('#TextBoxShortDescription').val(data[0].ShortDescription);
                    $('#TextBoxRemarks').val(data[0].Remarks).prop('disabled',true);
                    $('#HiddenFieldSubjectGuID').val(data[0].GuID);
                }
                else {
                    GetMessageBox("NO RECORD FOUND FOR SELECTED SUBJECT.... CONTACT DEVELOPER TEAM", 505);
                }
            },
            complete: function () {
                stopLoading();
            },
            error: function (jqXHR, error, errorThrown) {
                GetMessageBox("ERROR FETCHING RECORD FROM SERVER FOR SELECTED SUBJECT.... CONTACT DEVELOPER TEAM", 505);
            },
        });
    }
    else {
        GetMessageBox("Please Select A SUBJECT", 505);
        return;
    }
};
