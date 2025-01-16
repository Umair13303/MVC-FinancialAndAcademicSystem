//-----------LOAD ENTERY RECORD :: IF ALREAR EXIST
function CHECK_FEESTRUCTURE_FOR_CLASS() {
    var SessionId = $('#DropDownListSession :selected').val();
    var ClassId = $('#DropDownListClass :selected').val();
    var JsonArg = {
        SessionId: SessionId,
        ClassId: ClassId,
    }

    $.ajax({
        type: "POST",
        url: BasePath + "/AAccounts/MFeeUI/CHECK_FEESTRUCTURE_FOR_CLASS",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            if (data.length > 0) {
                GetMessageBox("Fee Structure Already Exist.... In-Active Fee Structure From List To Proceed", 500);
                return;
            }
        },
        complete: function () {
            stopLoading();
        },
    });
}