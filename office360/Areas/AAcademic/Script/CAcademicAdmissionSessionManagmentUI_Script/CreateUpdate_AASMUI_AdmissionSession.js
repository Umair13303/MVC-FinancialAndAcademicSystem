/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE AASM_ADMISSIONSESSION                       **----------------------------------------------*/
var OperationType = "";

var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

var AdmissionSessionClassTable = "";

/*----------------------------------** FUNCTION FOR::PAGE LOADER                                                             **----------------------------------------------*/
$(document).ready(function () {
    DB_OperationType = $('#HiddenFieldDB_OperationType').val();
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            $('#DivButtonSubmitDown').show();
            $('#DivButtonUpdateDown').hide();
            break;
        case DBOperation.UPDATE:
            GET_AASM_ADMISSIONSESSION_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
    PopulateDropDownLists();
    ChangeCase();
    InitializeAdmissionSessionClassDataTable();

});

function PopulateDropDownLists() {
    PopulateMT_BM_Branch_ListByParam();
    PopulateLK_AcademicYear_List();
}

/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER                                                      **----------------------------------------------*/
function ChangeCase() {
    $('#DropDownListCampus').change(function () {
        var CampusId = $("#DropDownListCampus :selected").val();
        PopulateMT_ACM_Class_ListByParam(CampusId);
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

/*----------------------------------** FUNCTION FOR::INITIALIZING DATA TABLE's & RELATED OPERATION's                         **----------------------------------------------*/
function InitializeAdmissionSessionClassDataTable() {
    AdmissionSessionClassTable = $('#MainTableAASM_AdmissionSessionClass').DataTable({
        "responsive": true,
        "ordering": false,
        "processing": true,
        "paging": false,
        "info": false,
        "columns": [
            { "title": "#", "orderable": false, },
            { "title": "Class" },
            { "title": "Is Entery Test Required" },
            { "title": "Is Interview Required" },
            { "title": "Session Start Date" },
            { "title": "Session End Date" },
            { "title": "ClassId" },
            { "title": "IsEnteryTestRequired" },
            { "title": "IsInterviewRequired" },
            { "title": "Action(s)" },
        ],
        columnDefs: [
            { visible: false, targets: [6, 7, 8] },
        ],
        drawCallback: async function () {
            $('.delete').off('click').on('click', function () {
                $('#MainTableAASM_AdmissionSessionClass').DataTable().row($(this).closest('tr')).remove().draw();
            });
        }
    });
    AdmissionSessionClassTable.on('order.dt search.dt', function () {
        AdmissionSessionClassTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}
function ValidateInputFieldsAdmissionSessionClassDetail() {
    if ($('#DropDownListClasses').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxSessionStartDate').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxSessionEndDate').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    return true;
}
$('#ButtonAddDataIntoTable').click(function (event) {
    event.preventDefault();
    var IS_VALID = ValidateInputFieldsAdmissionSessionClassDetail();
    if (IS_VALID) {
        try {
            InsertDataIntoDataTable();
        }
        catch (err) {
            GetMessageBox(err.message, 505);
        }
    }
});
function InsertDataIntoDataTable() {
    var Classes = $('#DropDownListClasses option:selected').map(function () { return $(this).text(); }).get();
    var IsEnteryTestRequired = $("#CheckBoxIsEnteryTestRequired").prop('checked');
    var IsInterviewRequired = $("#CheckBoxIsInterviewRequired").prop('checked');
    var SessionStartDate = $("#TextBoxSessionStartDate").val();
    var SessionEndDate = $("#TextBoxSessionEndDate").val();
    var ClassIds = $('#DropDownListClasses').val();
    var DuplicateClass = [];
    for (var i = 0; i < ClassIds.length; i++) {
        var ClassId = ClassIds[i];
        var Class = Classes[i];
        var IsRecordAlreadyInserted = false;
        AdmissionSessionClassTable.column(6).data().each(function (ExistingId) {
            if (ExistingId == ClassId) {
                IsRecordAlreadyInserted = true;
                return false;
            }
        });
        if (IsRecordAlreadyInserted) {
            DuplicateClass.push(Class);
        }
        else {
            var Table_Row = [];
            Table_Row[0] = "";
            Table_Row[1] = Class;
            Table_Row[2] = HTML_LABEL.TEXT_DISPLAY(CONVERSION.BOOL_CONFIRMATION(IsEnteryTestRequired));
            Table_Row[3] = HTML_LABEL.TEXT_DISPLAY(CONVERSION.BOOL_CONFIRMATION(IsInterviewRequired));
            Table_Row[4] = SessionStartDate;
            Table_Row[5] = SessionEndDate;
            Table_Row[6] = ClassId;
            Table_Row[7] = IsEnteryTestRequired;
            Table_Row[8] = IsInterviewRequired;
            Table_Row[9] = HTML_BUTTON.DELETE_IN_LIST();
            AdmissionSessionClassTable.row.add(Table_Row).draw();
        }
    }
    if (DuplicateClass.length > 0) {
        var message = "The following classes already exist in the table:\n\n";
        message += DuplicateClass.join(", ");
        GetMessageBox(message, 505);
    }
    ClearInputFieldsDataTable();
}
function ClearInputFieldsDataTable() {
    //-----------NOT CLEARING REQUIRED FIELD
    $('#DropDownListClasses').val('').change();
    $('#TextBoxSessionStartDate').val('').change();
    $('#TextBoxSessionEndDate').val('').change();
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_MAIN-- STORED PROCEDURE (ON LOAD)             **----------------------------------------------*/
function PopulateMT_BM_Branch_ListByParam() {
    
    var JsonArg = {
        OperationType: DB_OperationType
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicAdmissionSessionManagmentUI/GET_MT_BM_BRANCH_BYPARAMTER",
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

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_MAIN-- STORED PROCEDURE (ON CHANGE)           **----------------------------------------------*/
function PopulateMT_ACM_Class_ListByParam(CampusId) {
    
    var JsonArg = {
        OperationType: DB_OperationType,
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
            var List = '<option value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListClasses").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY (ON LOAD)                   **----------------------------------------------*/
function PopulateLK_AcademicYear_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicAdmissionSessionManagmentUI/GET_LK1_ACADEMICYEAR",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var List = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                List += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListAcademicYear").html(List);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR)                             **----------------------------------------------*/
function ValidateInputFields() {
    if ($('#DropDownListCampus').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxDescription').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#DropDownListAcademicYear').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxAdmissionStartDate').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxAdmissionEndDate').RequiredTextBoxInputGroup() == false) {
        return false;
    }

    //if ($('#DropDownListClasses').RequiredDropdown() == false) {
    //    return false;
    //}

    //if ($('#TextBoxSessionStartDate').RequiredTextBoxInputGroup() == false) {
    //    return false;
    //}
    //if ($('#TextBoxSessionEndDate').RequiredTextBoxInputGroup() == false) {
    //    return false;
    //}
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
        catch (err) {
            GetMessageBox(err.message, 505);
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
    var Description = $("#TextBoxDescription").val();
    var AcademicYearId = $("#DropDownListAcademicYear :selected").val();
    var AdmissionStartDate = $("#TextBoxAdmissionStartDate").val();
    var AdmissionEndDate = $("#TextBoxAdmissionEndDate").val();
    var Remarks = $('#TextBoxRemarks').val();

    var AdmissionSessionGuID = $('#HiddenFieldAdmissionSessionGuID').val();

    var JsonArg = {
        GuID: AdmissionSessionGuID,
        OperationType: OperationType,

        CampusId: CampusId,
        Description: Description,
        AcademicYearId: AcademicYearId,
        AdmissionStartDate: AdmissionStartDate,
        AdmissionEndDate: AdmissionEndDate,
        Remarks: Remarks,
    }

    var IncludedColumnMappings = {
       // 2: 'IsEnteryTestRequired',
        //3: 'IsInterviewRequired',
        4: 'SessionStartDate',
        5: 'SessionEndDate',
        6: 'ClassId',
    };
    var AdmissionSessionClassDetail = $('#MainTableAASM_AdmissionSessionClass').DataTable().rows().data().toArray().map(row => {
        return Object.fromEntries(
            Object.entries(IncludedColumnMappings).map(([index, key]) => [key, row[index]])
        );
    });
    $.ajax({
        type: "POST",
        url: BasePath + "/AAcademic/CAcademicAdmissionSessionManagmentUI/UpSert_Into_AASM_AdmissionSession",
        dataType: 'json',
        data: { 'PostedData': (JsonArg), 'PostedDataDetail': (AdmissionSessionClassDetail) },
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
    AdmissionSessionClassTable.clear().draw();

}

/*----------------------------------** FUNCTION FOR:: UPDATE ADMISSIONSESSION (LOAD DROPDOWN,DATA FOR ADMISSIONSESSIONID)    **----------------------------------------------*/
$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListAdmissionSession').RequiredDropdown() == false) {
        return false;
    }
    else {
        GET_AASM_ADMISSIONSESSION_INFOBYGUID();
    }
});
function GET_AASM_ADMISSIONSESSION_LISTBYPARAM() {
    $('#DropDownListAdmissionSession').empty();
    $('#DropDownListAdmissionSession').select2({
        placeholder: 'Search By Session Description / Session Code / Branch Name',
        minimumInputLength: 3,
        ajax: {
            url: BasePath + "/AAcademic/CAcademicAdmissionSessionManagmentUI/GET_MT_AASM_ADMISSIONSESSION_BYPARAMETER_SEARCH",
            type: "POST",
            delay: 250,
            data: function (params) {
                return {
                    PostedData: {
                        SearchParameter: params.term,
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
function GET_AASM_ADMISSIONSESSION_INFOBYGUID() {
    var AdmissionSessionId = $('#DropDownListAdmissionSession :selected').val();
    if (AdmissionSessionId != null && AdmissionSessionId != undefined && AdmissionSessionId != "" && AdmissionSessionId != "-1") {
        var JsonArg = {
            GuID: AdmissionSessionId,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/AAcademic/CAcademicAdmissionSessionManagmentUI/GET_MT_AASM_ADMISSIONSESSION_INFOBYGUID",
            dataType: 'json',
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                if (data.DATA && data.DATA.length > 0) {
                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON LOAD/STATIC --*/
                    $('#DropDownListCampus').val(data.DATA[0].CampusId).trigger('change.select2');
                    $('#TextBoxDescription').val(data.DATA[0].Description);
                    GET_TRIGGER_DATEPICKER_SIMPLE(data.DATA[0].AdmissionStartDate, '#TextBoxAdmissionStartDate');
                    GET_TRIGGER_DATEPICKER_SIMPLE(data.DATA[0].AdmissionEndDate, '#TextBoxAdmissionEndDate');
                    $('#DropDownListAcademicYear').val(data.DATA[0].AcademicYearId).change();
                    $('#TextBoxRemarks').val(data.DATA[0].Remarks).prop('disabled', true);
                    $('#HiddenFieldAdmissionSessionGuID').val(data.DATA[0].GuID);
                }
                if (data.DATA_DETAIL && data.DATA_DETAIL.length > 0) {
                    /*-- LOAD DATA FOR TABLE RENDERED :: ON LOAD/STATIC --*/
                    AdmissionSessionClassTable.clear().draw();
                    for (var i in data.DATA_DETAIL) {
                        var row_data = [];
                        row_data[0] = '';
                        row_data[1] = data.DATA_DETAIL[i].Class;
                        row_data[2] = HTML_LABEL.TEXT_DISPLAY(data.DATA_DETAIL[i].IsEnteryTestRequired);
                        row_data[3] = HTML_LABEL.TEXT_DISPLAY(data.DATA_DETAIL[i].IsInterviewRequired);
                        row_data[4] = CONVERSION.TO_DISPLAY_DATE(data.DATA_DETAIL[i].SessionStartDate, "j-F-Y");
                        row_data[5] = CONVERSION.TO_DISPLAY_DATE(data.DATA_DETAIL[i].SessionEndDate, "j-F-Y");
                        row_data[6] = data.DATA_DETAIL[i].IsEnteryTestRequired;
                        row_data[7] = data.DATA_DETAIL[i].IsInterviewRequired;
                        row_data[8] = data.DATA_DETAIL[i].ClassId;
                        row_data[9] = HTML_BUTTON.DELETE_IN_LIST();
                        AdmissionSessionClassTable.row.add(row_data);
                    }
                    AdmissionSessionClassTable.draw();
                }
                else {
                    GetMessageBox("NO RECORD FOUND FOR SELECTED ADMISSION SESSION.... CONTACT DEVELOPER TEAM", 505);
                }
            },
            complete: function () {
                stopLoading();
            },
            error: function (jqXHR, error, errorThrown) {
                GetMessageBox("ERROR FETCHING RECORD FROM SERVER FOR SELECTED ADMISSION SESSION.... CONTACT DEVELOPER TEAM", 505);
            },
        });
    }
    else {
        GetMessageBox("Please Select An Admission Session", 505);
        return;
    }
};