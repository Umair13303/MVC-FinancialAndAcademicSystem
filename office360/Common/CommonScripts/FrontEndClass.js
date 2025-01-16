class Roles {
    static Admin = 1;
    static Developer = 2;
    static Manager = 3;
    static DEO = 4;
    static Teacher = 5;
    static Student = 6;
}
class Bool_Status {
    static Open = true;
    static Close = false;
}
class Css_Class {
    static DISABLED = "disabled";
    static ENABLE = "ENABLE";
    static DynamicGroupBy = "DynamicGroupBy";
}
class Coa_Account_Type {
    static PROPERTY_PLANT_AND_EQUIPMENTS = 1;
    static LONG_TERM_ASSETS = 2;
    static ACCUMULATED_DEPRECIATION = 3;
    static CURRENT_ASSETS = 4;
    static OTHER_CURRENT_ASSETS = 5;
    static LONG_TERM_LIABILITIES = 6;
    static CURRENT_LIABILITIES = 7;
    static OTHER_CURRENT_LIABILITIES = 8;
    static EQUITY_DOES_NOT_CLOSE = 9;
    static EQUITY_GETS_CLOSED = 10;
    static EQUITY_RETAINED_EARNINGS = 11;
    static SALES_REVENUES = 12;
    static OTHER_INCOME = 13;
    static COST_OF_SALES = 14;
    static EXPENSES_DIRECT = 15;
    static EXPENSES_ADMIN = 16;
    static EXPENSES_MARKETING = 17;
    static EXPENSES_FINANCIAL = 18;
    static EXPENSES_OTHER_INDIRECT = 19;
    static ACCOUNTS_RECEIVABLE = 20;
    static BANK_AND_CASH = 21;
    static ACCOUNTS_PAYABLE = 22;
    static INVENTORY = 23;
}
class Fee_Catagory {
    static Academic_Fee = "1";
    static Other_Fee = "2";
}
class Status {
    static Open = true;
    static Close = false;
}
class Fee_Charging_Method {
    static RECURRING = "1";
    static ONE_TIME = "2";
}
class MaskingClass {
    static PhoneNumber = "PhoneNumber";
    static MobileNumber = "MobileNumber";
    static EmailAddress = "EmailAddress";
    static CNICNumber = "CNICNumber";
    static NTNNumber = "NTNNumber";
    static NumberOnly = "NumberOnly";
    static DatePickerSimple = "DatePickerSimple";
    static DatePickerMonthYear = "DatePickerMonthYear";
    static DatePickerYear = "DatePickerYear";
    static DatePickerRange = "DatePickerRange";
    static DatePickerTimer = "DatePickerTimer";

}
//class ApplicableMasking {
class AppliedMasking {
    static PhoneNumber = "(099) 999-9999";
    static MobileNumber = "(0999) 999-9999";
    static EmailAddress = "*{1,20}@*{1,20}.*{2,4}";
    static CNICNumber = "99999-9999999-9";
    static DatePickerSimple = "9999-99-99";
    static NTNNumber = "9999999-9";
}
class DB_Operation {
    static INSERT= "INSERT_DATA_INTO_DB";
    static UPDATE= "UPDATE_DATA_INTO_DB";
    static DELETE= "DELETE_DATA_INTO_DB";
}
class DocumentType  {
    static BRANCHES= 1;
    static CLASSES= 2;
    static ADMISSION= 3;
    static STUDENT= 4;
    static CLASS_REGISTRATION= 5;
    static FEE_STRUCTURE= 6;
    static CHART_OF_ACCOUNT= 7;
    static FEE_CHALLAN= 8;
    static FEE_TYPE= 9;
}
class DocumentStatus {
    static Working_BRANCHES= 1;
    static NonOperation_BRANCHES= 2;
    static Working_CLASSES= 3;
    static NonOperation_CLASSES= 4;
    static Open_ADMISSION= 5;
    static Closed_ADMISSION= 6;
    static Cancelled_ADMISSION= 7;
    static Active_STUDENT= 8;
    static InActive_STUDENT= 9;
    static NewEnrollment_CLASS_REGISTRATION= 10;
    static Promoted_CLASS_REGISTRATION= 11;
    static Demoted_CLASS_REGISTRATION= 12;
    static Left_CLASS_REGISTRATION= 13;
    static Active_FEE_STRUCTURE= 14;
    static InActive_FEE_STRUCTURE= 15;
    static UnPaid_FEE_CHALLAN= 16;
    static Cancelled_FEE_CHALLAN= 17;
    static Revised_FEE_CHALLAN= 18;
    static Paid_FEE_CHALLAN= 19;
}
class DB_SubOperationType {
    ENRSTUDENT_NEWADMISSION_INSERT= "ENRSTUDENT_NEWADMISSION_INSERT";
    ENRSTUDENT_NEWADMISSION_INSERT_GENERATECHALLAN= "ENRSTUDENT_NEWADMISSION_INSERT_GENERATECHALLAN";
    ENRSTUDENT_NEWADMISSION_INSERT_EXCELUPLOAD= "ENRSTUDENT_NEWADMISSION_INSERT_EXCELUPLOAD";
    ENRSTUDENT_NEWADMISSION_INSERT_EXCELUPLOAD_GENERATECHALLAN= "ENRSTUDENT_NEWADMISSION_INSERT_EXCELUPLOAD_GENERATECHALLAN";
    ENRSTUDENT_NEWADMISSION_UPDATE= "ENRSTUDENT_NEWADMISSION_UPDATE";

}
class ChallanType {
    static CHALLAN_FOR_NEW_ADMISSION= "1";
    static CHALLAN_FOR_EXISTING_ADMISSION= "2";
}
class DynamicDTOperation {
    constructor(Id, Description) {
        this.Id = Id;
        this.Description = Description;
    }
}
