/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE ACCM_CLASSCURRICULAM                                           **----------------------------------------------*/
var OperationType = "";
var DDL_Condition = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

var CurriculumDetailTable = "";
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
    InitializeClassCurriculumDataTable();
});

function PopulateDropDownLists() {
    PopulateMT_BM_Branch_ListByParam();
    PopulateMT_ASM_Subject_ListByParam();
    PopulateLK_Semester_List();
}

/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER                                                                         **----------------------------------------------*/
function ChangeCase() {
    $('#DropDownListClass').change(function () {
        var StudySchemeId = $('#DropDownListClass :selected').attr('data-StudySchemeId');
        /*--var SemesterId = null;  NOT PROVIDED ON LOAD --*/
        PopulateLK_Semester_List(StudySchemeId, null);
        CurriculumDetailTable.clear().draw();
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

/*----------------------------------** FUNCTION FOR::INITIALIZING DATA TABLE's & RELATED OPERATION's                                            **----------------------------------------------*/
function InitializeClassCurriculumDataTable() {
    CurriculumDetailTable = $('#MainTableACCM_ClassCurriculum').DataTable({
        "responsive": true,
        "ordering": false,
        "processing": true,
        "paging": false,
        "info": false,
        "columns": [
            { "title": "#", "orderable": false, },
            { "title": "Semester" },
            { "title": "Subject" },
            { "title": "SemesterId" },
            { "title": "SubjectId" },
            { "title": "Action(s)" },
        ],
        columnDefs: [
            { visible: false, targets: [3,4] },
        ],
        drawCallback: async function () {
            $('.delete').off('click').on('click', function () {
                $('#MainTableACCM_ClassCurriculum').DataTable().row($(this).closest('tr')).remove().draw();
            });
        }
    });
    CurriculumDetailTable.on('order.dt search.dt', function () {
        CurriculumDetailTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}

/*----------------------------------** FUNCTION FOR::VALIDATE DATA & INSERT INTO DATATABLE                                                      **----------------------------------------------*/
function ValidateInputFieldsClassCurriculumDetail() {
    if ($('#DropDownListSemester').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListSubject').RequiredDropdown() == false) {
        return false;
    }
    return true;
}
$('#ButtonAddDataIntoTable').click(function (event) {
    event.preventDefault();
    var IS_VALID = ValidateInputFieldsClassCurriculumDetail();
    if (IS_VALID) {
        try {
            InsertDataIntoDataTable();
        }
        catch (err) {
            GetMessageBox(err.message , 505);
        }
    }
});
function InsertDataIntoDataTable() {
    var Semester = $('#DropDownListSemester :selected').text();
    var SemesterId = $('#DropDownListSemester :selected').val();
    var SubjectIds = $('#DropDownListSubject').val(); 
    var Subjects = $('#DropDownListSubject option:selected').map(function () { return $(this).text(); }).get();
    var DuplicateSubject = [];
    for (var i = 0; i < SubjectIds.length; i++) {
        var SubjectId = SubjectIds[i];
        var Subject = Subjects[i];
        var IsRecordAlreadyInserted = false;

        CurriculumDetailTable.column(4).data().each(function (ExistingId) {
            if (ExistingId == SubjectId) {
                IsRecordAlreadyInserted = true;
                return false; 
            }
        });

        if (IsRecordAlreadyInserted) {
            DuplicateSubject.push(Subject);
        } else {
            var Table_Row = [];
            Table_Row[0] = "";
            Table_Row[1] = Semester;
            Table_Row[2] = Subject;
            Table_Row[3] = SemesterId;
            Table_Row[4] = SubjectId;
            Table_Row[5] = HTML_BUTTON.DELETE_IN_LIST();

            CurriculumDetailTable.row.add(Table_Row).draw();
        }
    }
    if (DuplicateSubject.length > 0) {
        var message = "The following subjects already exist in the table:\n\n";
        message += DuplicateSubject.join(", ");
        GetMessageBox(message, 505);
    }
    ClearInputFieldsDataTable();

}
function ClearInputFieldsDataTable() {
    //-----------NOT CLEARING REQUIRED FIELD
    $('#DropDownListSemester').val('-1').change();
    $('#DropDownListSubject').val('').change();
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
                List += '<option  value="' + data[i].Id + '">' + data[i].Description+ '</option>';
            }
            $("#DropDownListCampus").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}
function PopulateMT_ASM_Subject_ListByParam() {
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            DDL_Condition = MDB_LIST_CONDITION.ASM_SUBJECT_BY_COMPANYID_FORNEWINSERT;
            break;
        case DBOperation.UPDATE:
            DDL_Condition = MDB_LIST_CONDITION.ASM_SUBJECT_BY_COMPANYID_FORUPDATERECORD;
            break;
    }
    var JsonArg = {
        DB_IF_PARAM: DDL_Condition,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicClassCurriculumManagmentUI/GET_MT_ASM_SUBJECT_BYPARAMTER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description+ '</option>';
            }
            $("#DropDownListSubject").html(List);
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
            var List = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option data-StudySchemeId="' + data[i].StudySchemeId+'"' + (data[i].Id == ClassId ? 'selected' : '') + ' value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListClass").html(List);
        },
        complete: function () {
           
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY (ON CHANGE)                                    **----------------------------------------------*/
function PopulateLK_Semester_List(StudySchemeId, SemesterId) {
    var JsonArg = {
        StudySchemeId: StudySchemeId,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicClassCurriculumManagmentUI/GET_LK1_SEMESTER",
        data: {'PostedData': (JsonArg)},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option ' + (data[i].Id == SemesterId ? 'selected' : '') + ' value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListSemester").html(List);
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
            //UpSertDataIntoDB();
        }
        catch (err) {
            GetMessageBox(err.message, 505);
        }
    }
});
function UpSertDataIntoDB() {
    var CampusId = $('#DropDownListCampus :selected').val();
    var Description = $('#TextBoxDescription').val();
    var ClassId = $('#DropDownListClass :selected').val();
    var Remarks = $('#TextBoxRemarks').val();
    var ClassCurriculumGuID = $('#HiddenFieldClassCurriculumGuID').val();

    var JsonArg = {
        GuID: ClassCurriculumGuID,
        OperationType: OperationType,

        CampusId: CampusId,
        Description: Description,
        ClassId: ClassId,
        Remarks: Remarks
    };

    var IncludedColumnMappings = {
        3: 'SemesterId',
        4: 'SubjectId'
    };
    var ClassCurriculumDetail = $('#MainTableACCM_ClassCurriculum').DataTable().rows().data().toArray().map(row => {
        return Object.fromEntries(
                Object.entries(IncludedColumnMappings).map(([index, key]) => [key, row[index]])
            );
    });


    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicClassCurriculumManagmentUI/UpSert_Into_ACCM_ClassCurriculum",
        dataType: 'json',
        data: { 'PostedData': (JsonArg), 'PostedDataDetail': (ClassCurriculumDetail) },
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
    $('.form-control').not('#DropDownListClassCurriculum').val('');
    $('.select2').not('#DropDownListClassCurriculum').val('-1').change();
    $('form').removeClass('Is-Valid');
}

/*----------------------------------** FUNCTION FOR:: UPDATE CLASSCURRICULAM (LOAD DROPDOWN,DATA FOR CLASSCURRICULAMID)                        **----------------------------------------------*/
$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListClassCurriculum').RequiredDropdown() == false) {
        return false;
    }
    else {
        GET_ACCM_CLASSCURRICULUM_INFOBYGUID();
    }
});
function GET_ACCM_CLASSCURRICULUM_LISTBYPARAM() {
    $('#DropDownListClassCurriculum').empty();
    $('#DropDownListClassCurriculum').select2({
        placeholder: 'Search By Class Name / Curriculum Code',
        minimumInputLength: 3,
        ajax: {
            url: BasePath + "/AAcademic/CAcademicClassCurriculumManagmentUI/GET_MT_ACCM_CLASSCURRICULUM_BYPARAMETER_SEARCH",
            type: "POST",
            delay: 250,
            data: function (params) {
                return {
                    PostedData: {
                        SearchParameter: params.term,
                        DB_IF_PARAM: DOCUMENT_LIST_CONDITION.ACCM_CLASSCURRICULUM_BY_ALLOWEDBRANCHIDS_SEARCH_PARAMETER_UPDATECLASSCURRICULUM,
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