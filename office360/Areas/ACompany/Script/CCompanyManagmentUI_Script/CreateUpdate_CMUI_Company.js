/*----------------------------------** GLOBAL VARIABLE FOR PAGE :: CREATE/UPDATE CM_COMPANY                       **----------------------------------------------*/
var OperationType = "";
var DDL_Condition = "";
var DB_OperationType = $('#HiddenFieldDB_OperationType').val();
var IsFieldClear = false;

/*----------------------------------** FUNCTION FOR::PAGE LOADER                                                  **----------------------------------------------*/
$(document).ready(function () {
    DB_OperationType = $('#HiddenFieldDB_OperationType').val();
    switch (DB_OperationType) {
        case DBOperation.INSERT:
            $('#DivButtonSubmitDown').show();
            $('#DivButtonUpdateDown').hide();
            break;
        case DBOperation.UPDATE:
            GET_CM_COMPANY_LISTBYPARAM();
            $('#DivButtonSubmitDown').hide();
            $('#DivButtonUpdateDown').show();
            break;
    }
    PopulateDropDownLists();
    ChangeCase();

});

function PopulateDropDownLists() {
    PopulateLK_Country_List();
}

/*----------------------------------** FUNCTION FOR::CHANGE CASE LOADER                                           **----------------------------------------------*/
function ChangeCase() {
    $('#DropDownListCountry').change(function () {
        var CountryId = $("#DropDownListCountry :selected").val();
        var CityId = null; /*-- NOT PROVIDED ON LOAD --*/
        PopulateLK_City_ListByParam(CountryId, CityId);
    });

    //-----------FOR ::EDIT CASE
    $('#DropDownListCompany').change(function () {
        if (!IsFieldClear) {
            IsFieldClear = true;
            ClearInputFields();
            IsFieldClear = false;
        }
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY (ON LOAD)        **----------------------------------------------*/
function PopulateLK_Country_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/CCompanyManagmentUI/GET_LK1_COUNTRY",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListCountry").html(s);
        },
        complete: function () {
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: RENDER DROP DOWN FROM DB_LOOKUP-- LINQUERY (ON CHANGE)      **----------------------------------------------*/
function PopulateLK_City_ListByParam(CountryId, CityId) {
    var JsonArg = {
        CountryId: CountryId,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/CCompanyManagmentUI/GET_LK1_CITY_BYPARAMETER",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            var s = '<option  value="-1">Select an option</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option  value="' + data[i].Id + '">' + data[i].Description + '' + '</option>';
            }
            $("#DropDownListCity").html(s);
        },
        complete: function () {
            if (CityId != null && CityId != undefined && CityId != "" && CityId != "-1") {
                $('#DropDownListCity').val(CityId).change();
            }
            stopLoading();
        },
    });
}

/*----------------------------------** FUNCTION FOR:: DATABASE OPERATION (VALIDATE,UPSERT,CLEAR)                  **----------------------------------------------*/
function ValidateInputFields() {

    if ($('#TextBoxCompanyName').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#DropDownListCountry').RequiredDropdown() == false) {
        return false;
    }
    if ($('#DropDownListCity').RequiredDropdown() == false) {
        return false;
    }
    if ($('#TextBoxAddress').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxPhoneNumber').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxEmailAddress').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxEmailAddress').RequiredTextBoxInputGroup() == false) {
        return false;
    }
    if ($('#TextBoxCompanyWebsite').RequiredTextBoxInputGroup() == false) {
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
    var CompanyName = $('#TextBoxCompanyName').val();
    var CountryId = $('#DropDownListCountry :selected').val();
    var CityId = $('#DropDownListCity :selected').val();
    var Address = $('#TextBoxAddress').val();
    var PhoneNumber = $('#TextBoxPhoneNumber').val();
    var EmailAddress = $('#TextBoxEmailAddress').val();
    var CompanyWebsite = $('#TextBoxCompanyWebsite').val();
    var Remarks = $('#TextBoxRemarks').val();

    var CompanyGuID = $('#HiddenFieldCompanyGuID').val();

    var JsonArg = {
        GuID: CompanyGuID,
        OperationType: OperationType,
        CompanyName: CompanyName,
        CountryId: CountryId,
        CityId: CityId,
        Address: Address,
        PhoneNumber: PhoneNumber,
        EmailAddress: EmailAddress,
        CompanyWebsite: CompanyWebsite,
        Remarks: Remarks,
    }
    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/CCompanyManagmentUI/UpSert_Into_CM_Company",
        dataType: 'json',
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            GetMessageBox(data.Message, data.StatusCode);
        },
        complete: function () {
            ClearInputFields();
            stopLoading();
        },
        error: function (jqXHR, error, errorThrown) {
            GetMessageBox("The Transaction Can Not Be Performed Due To Serve Activity", 500);
        },
    });
}
function ClearInputFields() {
    //-----------NOT CLEARING REQUIRED FIELD
    $('.form-control').not('#DropDownListCompany').val('');
    $('.select2').not('#DropDownListCompany').val('-1').change();
    $('form').removeClass('Is-Valid');
}

/*----------------------------------** FUNCTION FOR:: UPDATE COMPANY (LOAD DROPDOWN,DATA FOR COMPANYID)           **----------------------------------------------*/
$('#ButtonSubmitGetInfoForEdit').click(function () {
    if ($('#DropDownListCompany').RequiredDropdown() == false) {
        return false;
    }
    else {
        GET_CM_COMPANY_INFOBYGUID();
    }
});
function GET_CM_COMPANY_LISTBYPARAM() {
    $('#DropDownListCompany').empty();
    $('#DropDownListCompany').select2({
        placeholder: 'Search By Company Name / Company Code',
        minimumInputLength: 3,
        ajax: {
            url: BasePath + "/ACompany/CCompanyManagmentUI/GET_MT_CM_COMPANY_BYPARAMETER_SEARCH",
            type: "POST",
            delay: 250,
            data: function (params) {
                return {
                    PostedData: {
                        SearchParameter: params.term,
                        DB_IF_PARAM: DOCUMENT_LIST_CONDITION.CM_COMPANY_BY_SEARCH_PARAMETER_UPDATECOMPANY,
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
function GET_CM_COMPANY_INFOBYGUID() {
    var CompanyId = $('#DropDownListCompany :selected').val();
    if (CompanyId != null && CompanyId != undefined && CompanyId != "" && CompanyId != "-1") {
        var JsonArg = {
            GuID: CompanyId,
        }
        $.ajax({
            type: "POST",
            url: BasePath + "/ACompany/CCompanyManagmentUI/GET_MT_CM_COMPANY_INFOBYGUID",
            dataType: 'json',
            data: { 'PostedData': (JsonArg) },
            beforeSend: function () {
                startLoading();
            },
            success: function (data) {
                /*-- LOAD DATA FOR FIELDS RENDERED :: ON LOAD/STATIC --*/
                if (data.length > 0) {
                    $('#TextBoxCompanyName').val(data[0].CompanyName);
                    $('#DropDownListCountry').val(data[0].CountryId).trigger('change.select2');
                    $('#TextBoxAddress').val(data[0].Address);
                    $('#TextBoxPhoneNumber').val(data[0].PhoneNumber);
                    $('#TextBoxEmailAddress').val(data[0].EmailAddress);
                    $('#TextBoxCompanyWebsite').val(data[0].CompanyWebsite);
                    $('#TextBoxRemarks').val(data[0].Remarks).prop('disabled', true);
                    $('#HiddenFieldCompanyGuID').val(data[0].GuID);

                    /*-- LOAD DATA FOR FIELDS RENDERED :: ON CHANGE --*/
                    PopulateLK_City_ListByParam(data[0].CountryId, data[0].CityId);
                }
                else {
                    GetMessageBox("NO RECORD FOUND FOR FOR SELECTED COMPANY.... CONTACT DEVELOPER TEAM", 505);
                }
            },
            complete: function () {
                stopLoading();
            },
            error: function (jqXHR, error, errorThrown) {
                GetMessageBox("ERROR FETCHING RECORD FROM SERVER FOR SELECTED COMPANY.... CONTACT DEVELOPER TEAM", 505);
            },
        });
    }
    else {
        GetMessageBox("Please Select A Company", 505);
        return;
    }
};