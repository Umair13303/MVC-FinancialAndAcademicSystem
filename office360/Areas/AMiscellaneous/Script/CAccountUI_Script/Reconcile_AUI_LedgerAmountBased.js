var EnrollmentList = "";
var HighLightMap = {};

$(document).ready(function () {
    InitDataTable();
});
function InitDataTable() {
    EnrollmentList = $('#MainTableEnrollmentList').DataTable({
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
        "scroller": true,
        "scrollY": 500,
        "columns": [
            { "title": "#", "orderable": false, },
            { "title": "Reg", },//1
            { "title": "Student Name", },//2
            { "title": "Student CNIC", },//3
            { "title": "D.O.B", },//4
            { "title": "Religion", },//5
            { "title": "Country", },//6
            { "title": "Domicile", },//7
            { "title": "Father Name", },//8
            { "title": "Father CNIC", },//9
            { "title": "Occupation", },//10
            { "title": "Is Father Alive", },//11
            { "title": "Guardian", },//12
            { "title": "Guardian CNIC", },//13
            { "title": "Student Mobile", },//14
            { "title": "Student Email", },//15
            { "title": "Parent Mobile", },//16
            { "title": "LandLine", },//17
            { "title": "Emergency Mobile", },//18
            { "title": "Address", },//19
            { "title": "ReligionId", },//20
            { "title": "CountryId", },//21
            { "title": "OccupationId", },//22
        ],
        "columnDefs": [
            { visible: false, targets: [20, 21, 22] },
        ],
        "rowCallback": function (row, data, index) {
            var rowMap = HighLightMap[index] || {};
            Object.entries(rowMap).forEach(([colIndex, HighLightClass]) => {
                $('td', row).eq(Number(colIndex)).addClass(HighLightClass);
            });
        }
    });
    EnrollmentList.on('order.dt search.dt', function () {
        EnrollmentList.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });

    }).draw();
}
// FUNCTION TO GET INDEX NUMBE OF COLUMN's IN DATA TABLE BY MATCHING HEADERNAME
function GetDataTableColumnIndexByHeaderText(Table, Headers) {
    var Columns = Table.settings().init().columns;
    return Headers.reduce((Map, Header) => {
        var Index = Columns.findIndex(col => col.title === Header);
        if (Index !== -1) Map[Header] = Index;
        return Map;
    }, {});
}

$("#ButtonPopulateExcel").click(function () {
    var UseFile = $("#UploadExcelFile").prop("files")[0];
    if (UseFile) {
        startLoading();
        var ContentReader = new FileReader();/* LIBRARY TO READ FILE CONTENT */
        ContentReader.onload = function (event)/* WHEN CONTENT READER FETCH THE DATA */ {
            var BinaryData = new Uint8Array(event.target.result);/* SETTING ENVOIRMENT TO MAKE SHEETREAD & PARSE */
            var ExcelSheet = XLSX.read(BinaryData, { type: 'array' });/* PARSE BINARYDATA INTO A WORKBOOK  */
            var MainWorkSheet = ExcelSheet.Sheets[ExcelSheet.SheetNames[0]];/* GET THE NAME OF WORKSHEET BY SR.NO FROM ALL PRESENT SHEETS  */
            var JsonData = XLSX.utils.sheet_to_json(MainWorkSheet, {
                range: 1,   /* SET ROW NO. CONTAINING HEADER ON BASE OF 0 INDEXING  */
                defval: null
            });
            var ValidationHeader = ["Student CNIC"]; /* NAME OF HEADER THAT WILL BE VALIDATE ON BASIS OF CONDITION   */
            var ValidationHeaderIndexMap = GetDataTableColumnIndexByHeaderText(EnrollmentList, ValidationHeader);

            JsonData.forEach((ROW, Index) => {

                /* VALIDATE EXCEL SHEET CELL DATA   
                   CAN CHECK IF A CELL :
                   IS EMPTY & HIGHLIGHT IT.
                   IS NOT MATCHING A REGEX
                   IS NOT MATCHING A FORMAT(YYYY-MM-DD)
                */
                HighLightMap[Index] = {};
                var CNIC = (ROW["Student CNIC"] ?? "")
                    .toString()
                    .replace(/[\u200B-\u200D\uFEFF\xA0\s]/g, '') // Remove all types of weird spaces
                    .trim();

                var FormattedCNIC = CNIC.replace(/[^0-9]/g, '');
                if (FormattedCNIC.length != 13) {

                    var CNICIdx = ValidationHeaderIndexMap["Student CNIC"];
                    if (CNICIdx != undefined) {
                        HighLightMap[Index][CNICIdx] = "danger";
                    }
                    ROW["Student CNIC"] = CNIC;
                }
                else {
                    ROW["Student CNIC"] = FormattedCNIC;
                }

            });

            PopulateDataTable(JsonData);
        }
        ContentReader.readAsArrayBuffer(UseFile);

    }
});

function PopulateDataTable(dataObj) {
    EnrollmentList.clear();
    const rowsToAdd = dataObj.map(function (row) {
        return [
            '', // Add empty field if needed
            row["Reg"],
            row["Student Name"],
            row["Student CNIC"],
            row["Birth Date"],
            row["Religion"],
            row["Country"],
            row["Domicile"],
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
            row["ReligionId"],
            row["CountryId"],
            row["OccupationId"],
        ];
    });
    EnrollmentList.rows.add(rowsToAdd);
    EnrollmentList.draw();
    stopLoading();
}