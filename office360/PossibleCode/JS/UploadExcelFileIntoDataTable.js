var EnrollmentList = "";
var HighLightMap = {};

function InitDataTable() {
    EnrollmentList = $('#MainTableEnrollmentList').DataTable({
        "responsive": true, "ordering": false,
        "processing": true, "pagination": false,
        "paging": false,
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
function GetDataTableColumnIndexByDataKey(Table, DataKeys) {
    var Column = Table.settings().init().columns;
    return DataKeys.reduce((Map, DataKey) => {
        var idx = Column.findIndex(c => c.data === DataKey);
        if (idx !== -1) Map[DataKey] = idx;
        return Map;
    }, {});
}
$("#ButtonPopulateExcel").click(function () {
    var UseFile = $("#UploadExcelFile").prop("files")[0];
    if (UseFile) {
        startLoading();
        var ContentReader = new FileReader();/* LIBRARY TO READ FILE CONTENT */
        ContentReader.onload = function (event)/* WHEN CONTENT READER FETCH THE DATA */
        {
            var BinaryData = new Uint8Array(event.target.result);/* SETTING ENVOIRMENT TO MAKE SHEETREAD & PARSE */
            var ExcelSheet = XLSX.read(BinaryData, { type: 'array' });/* PARSE BINARYDATA INTO A WORKBOOK  */
            var MainWorkSheet = ExcelSheet.Sheets[ExcelSheet.SheetNames[0]];/* GET THE NAME OF WORKSHEET BY SR.NO FROM ALL PRESENT SHEETS  */
            var JsonData = XLSX.utils.sheet_to_json(MainWorkSheet, {
                range: 0,   /* SET ROW NO. CONTAINING HEADER ON BASE OF 0 INDEXING  */
                defval: null
            });
            var ValidationHeader = ["Class Name", "Admission Session"]; /* NAME OF HEADER THAT WILL BE VALIDATE ON BASIS OF CONDITION   */
            var ValidationHeaderIndexMap = GetDataTableColumnIndexByDataKey(EnrollmentList, ValidationHeader);/* GET SERIAL NUMBER OF GIVEN COLUMN NUMBER   */

            JsonData.forEach((ROW, Index) => {

                /* VALIDATE EXCEL SHEET CELL DATA   
                   CAN CHECK IF A CELL :
                   IS EMPTY & HIGHLIGHT IT.
                   IS NOT MATCHING A REGEX
                   IS NOT MATCHING A FORMAT(YYYY-MM-DD)
                */
                HighLightMap[Index] = {};
                var AdmissionSession = (ROW["Admission Session"] ?? "").toString().trim();
                if (!AdmissionSession) {
                    var AdmissionSessionIdx = ValidationHeaderIndexMap["Admission Session"];
                    if (AdmissionSessionIdx !== undefined) {
                        HighLightMap[Index][AdmissionSessionIdx] = "danger";
                    }
                }
                var CNIC = (ROW["CNIC"] ?? "").toString().trim();
                var FormattedCNIC = CNIC.replace(/[^0-9]/g, '');
                if (FormattedCNIC.length !== 13) {
                    var CNICIdx = ValidationHeaderIndexMap["Student CNIC"];
                    if (CNICIdx !== undefined) {
                        HighLightMap[Index][CNICIdx] = "danger";
                    }
                    ROW["Student CNIC"] = rawCNIC;
                }
                else {
                    ROW["Student CNIC"] = cleanedCNIC;
                }

            });

            PopulateDataTable(JsonData);
        }
        ContentReader.readAsArrayBuffer(UseFile);

    }
});

function PopulateDataTable(dataObj) {
    // Clear the table only once
    table.clear();

    // Use map to process the data and generate rows
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

    // Add all rows at once
    table.rows.add(rowsToAdd);

    // Redraw the table
    table.draw();
    stopLoading();

}