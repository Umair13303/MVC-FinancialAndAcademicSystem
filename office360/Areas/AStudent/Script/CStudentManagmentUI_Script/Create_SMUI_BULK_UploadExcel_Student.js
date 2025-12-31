/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE SM_STUDENT                                                    **----------------------------------------------*/
var OperationType = "";
var DDL_Condition = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

var StudentTable = "";
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
    InitializeStudentDataTable();
    PopulateDropDownLists();
    ChangeCase();
});

function PopulateDropDownLists() {
    PopulateMT_BM_Branch_ListByParam();
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
}
/*----------------------------------** FUNCTION FOR::INITIALIZING DATA TABLE's & RELATED OPERATION's                                            **----------------------------------------------*/
function InitializeStudentDataTable() {
    StudentTable = $('#MainTableSM_Student').DataTable({
        dom: '<"row"<"col-md-12"<"row"<"col-md-6"B><"col-md-6"f> > ><"col-md-12"rt> <"col-md-12"<"row"<"col-md-5"i><"col-md-7"p>>> >',
        buttons: {
            buttons: [
                { extend: 'copy', className: 'btn' },
                { extend: 'csv', className: 'btn' },
                { extend: 'excel', className: 'btn' },
                { extend: 'print', className: 'btn' }
            ]
        },
        "oLanguage": {
            "oPaginate": {
                "sPrevious": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
                "sNext": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
            },
            "sInfo": "Showing page _PAGE_ of _PAGES_",
            "sSearch": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
            "sSearchPlaceholder": "Search...",
            "sLengthMenu": "Results :  _MENU_"
        },
        "responsive": true,
        "ordering": false,
        "processing": true,
        "paging": true,
        "pageLength": 100,
        "deferRender": true,
        "scrollY": 500,
        "columns": [
            { "title": "#", "orderable": false, },//0
            { "title": "Admission Category", },//1
            { "title": "Registration Number", },//2
            { "title": "Student Name", },//3
            { "title": "Student CNIC", },//4
            { "title": "D.O.B", },//5
            { "title": "Religion", },//6
            { "title": "Country", },//7
            { "title": "Domicile", },//8
            { "title": "Father Name", },//9
            { "title": "Father CNIC", },//10
            { "title": "Occupation", },//11
            { "title": "Is Father Alive", },//12
            { "title": "Guardian", },//13
            { "title": "Guardian CNIC", },//14
            { "title": "Student Mobile", },//15
            { "title": "Student Email", },//16
            { "title": "Parent Mobile", },//17
            { "title": "LandLine", },//18
            { "title": "Emergency Mobile", },//19
            { "title": "Address", },//20
            { "title": "AdmissionCategoryId", },//21
            { "title": "ReligionId", },//22
            { "title": "CountryId", },//23
            { "title": "OccupationId", },//24
        ],
        columnDefs: [
            { visible: false, targets: [13,14,15,16,17,18,19,20,21,22,23,24] },
        ],
        drawCallback: async function () {
            $('.delete').off('click').on('click', function () {
                $('#MainTableSM_Student').DataTable().row($(this).closest('tr')).remove().draw();
            });
        }
    });
    StudentTable.on('order.dt search.dt', function () {
        StudentTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}
$("#ButtonPopulateExcel").click(function () {
    var UseFile = $("#UploadExcelFile").prop("files")[0];
    if (UseFile) {
        var ContentReader = new FileReader();/* LIBRARY TO READ FILE CONTENT */
        ContentReader.onload = function (event)/* WHEN CONTENT READER FETCH THE DATA */ {
            startLoading();
            var BinaryData = new Uint8Array(event.target.result);/* SETTING ENVOIRMENT TO MAKE SHEETREAD & PARSE */
            var ExcelSheet = XLSX.read(BinaryData, { type: 'array' });/* PARSE BINARYDATA INTO A WORKBOOK  */
            var MainWorkSheet = ExcelSheet.Sheets[ExcelSheet.SheetNames[0]];/* GET THE NAME OF WORKSHEET BY SR.NO FROM ALL PRESENT SHEETS  */
            var JsonData = XLSX.utils.sheet_to_json(MainWorkSheet, {
                range: 1,   /* SET ROW NO. CONTAINING HEADER ON BASE OF 0 INDEXING  */
                defval: null
            });
            PopulateDataTable(JsonData);
        }
        ContentReader.readAsArrayBuffer(UseFile);
    }
});

function PopulateDataTable(dataObj) {
    StudentTable.clear();
    const rowsToAdd = dataObj.map(function (row, index) {
        return [
            (index + 1).toString(),
            row["Admission Category"],
            row["Registration Number"],
            row["Student Name"],
            row["Student CNIC"],
            row["Birth Date"],
            row["Religion"],
            row["Country"],
            row["Domicile District"],
            row["Father Name"],
            row["Father CNIC"],
            row["Occupation"],
            row["Is Father Alive"],
            row["Guardian"],
            row["Guardian CNIC"],
            row["Student Mobile"],
            row["Student Email"],
            row["Parent Mobile"],
            row["LandLine"],
            row["Emergency Mobile"],
            row["Address"],
            row["AdmissionCategoryId"],
            row["ReligionId"],
            row["CountryId"],
            row["OccupationId"],
        ];
    });
    StudentTable.rows.add(rowsToAdd);
    StudentTable.draw();
    stopLoading();
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
                List += '<option ' + (data[i].Id == ClassFeeStructureId ? 'selected' : '') + ' value="' + data[i].Id + '">' + data[i].Description + '</option>';
            }
            $("#DropDownListClassFeeStructure").html(List);
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
        catch(err) {
            GetMessageBox(err.message, 505);
        }
    }
});
function UpSertDataIntoDB() {
    var CampusId = $("#DropDownListCampus :selected").val();
    var AdmissionSessionId = $("#DropDownListAdmissionSession :selected").val();
    var ClassId = $("#DropDownListClass :selected").val();
    var ClassFeeStructureId = $("#DropDownListClassFeeStructure :selected").val();

    var SM_StudentDetail = [];
    var IncludedColumnMappings = {
        2:"RegistrationNumber",
        3:"StudentName",
        4:"StudentCNIC",
        5:"BirthDate",
        8:"DomicileDistrict",
        9:"FatherName",
        10:"FatherCNIC",
        12:"IsFatherAlive",
        13:"GuardianName",
        14:"GuardianCNIC",
        15:"StudentMobile",
        16:"StudentEmail",
        17:"ParentMobile",
        18:"LandLine",
        19:"EmergencyMobile",
        20:"Address",
        21:"AdmissionCategoryId",
        22:"ReligionId",
        23:"CountryId",
        24:"OccupationId",
    };

    var SM_StudentDetail = $('#MainTableSM_Student')
        .DataTable()
        .rows()
        .data()
        .toArray()
        .map(row => {
            var obj = Object.fromEntries(
                Object.entries(IncludedColumnMappings)
                    .map(([index, key]) => [key, row[index]])
            );

            obj.CampusId = CampusId;
            obj.AdmissionSessionId = AdmissionSessionId;
            obj.ClassId = ClassId;
            obj.ClassFeeStructureId = ClassFeeStructureId;

            return obj;
        });
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
                    $('#TextBoxRemarks').val(data[0].Remarks).prop('disabled', true);
                    $('#HiddenFieldStudentGuID').val(data[0].GuID);

                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON CHANGE --*/
                    PopulateMT_AASM_AdmissionSession_ListByParam(data[0].CampusId, data[0].AdmissionSessionId);
                    PopulateMT_ACM_Class_ListByParam(data[0].CampusId, data[0].AdmissionSessionId, data[0].ClassId);
                    PopulateMT_ACFSM_ClassFeeStructure_ListByParam(data[0].ClassId, data[0].ClassFeeStructureId);
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