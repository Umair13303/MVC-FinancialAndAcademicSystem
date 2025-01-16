// ALERT TO SHOW IF THE SELECTED CLASS IS ALREADY PRESENT IN A ACTIVE SESSION

function CHECK_APPSESSION_FOR_CLASS(ClassIds) {
    var JsonArg = {
        ClassIds: ClassIds.toString(),
    }

    $.ajax({
        type: "POST",
        url: BasePath + "/ACompany/MAcademicSessionUI/CHECK_APPSESSION_FOR_CLASS",
        data: { 'PostedData': (JsonArg) },
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            if (data > 0) {
                GetMessageBox("A session is already active for the class", 500);
            }
        },
        complete: function () {
            stopLoading();
        },
    });
}


$('#DropDownListCampus').select2({
    ajax: {
        type: "POST",
        url: BasePath + "/AStudent/MEnrollmentUI/GET_MT_GENERALBRANCH_BYPARAMETER",
        data: function (params) {
            return {
                q: params.term,          // Send the search term to the server
                PostedData: JsonArg      // Send additional parameters
            };
        },
        beforeSend: function () {
            // Optionally show a loading indicator before the request (e.g., startLoading())
        },
        processResults: function (data, params) {
            console.log(data); // Log the data for debugging

            params.page = params.page || 1;

            // Safeguard in case 'data.items' is undefined or null
            const items = data.items || [];

            return {
                results: items.map(function (item) {
                    return {
                        id: item.Id,           // Value for the option
                        text: item.Description // Display text for the option
                    };
                }),

            };
        },
        cache: true // Cache the results for efficiency
    },
    placeholder: 'Search for a repository', // Placeholder text
    minimumInputLength: 3,                  // Minimum characters required to trigger the search
    allowClear: true                        // Allow clearing the selected value
});
