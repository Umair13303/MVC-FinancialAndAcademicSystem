using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace office360.Models.General
{
    public class DocumentStatus
    {

        public enum DocType
        {
            COMPANY = 1,
            USER = 2,
            RIGHT_SETTING = 3,
            USER_RIGHT = 4,
            BRANCH = 5,
            BRANCH_SETTING = 6
        }

        public enum DocStatus
        {
            ACTIVE_COMPANY=1,
            INACTIVE_COMPANY=2,
            DELETED_COMPANY=3,
            ACTIVE_USER=4,
            INACTIVE_USER=5,
            DELETED_USER=6,
            ACTIVE_RIGHT_SETTING=7,
            INACTIVE_RIGHT_SETTING=8,
            ACTIVE_USER_RIGHT=9,
            INACTIVE_USER_RIGHT=10,
            ACTIVE_BRANCH=11,
            INACTIVE_BRANCH=12,
            DELETED_BRANCH=13,
            ACTIVE_BRANCH_SETTING=14,
            INACTIVE_BRANCH_SETTING=15,
            EXPIRED_BRANCH_SETTING=16,


        }

        public enum ChallanMethod
        {
            Trimester = 4,
            Monthly = 12,
            Quarterly = 3,
            Annual = 1,
            BiAnnual = 2
        }
        public enum ChallanType
        {
           Challan_For_NEW_ADMISSION=1,
           Challan_For_EXISTING_ADMISSION=2,
        }
        public enum UserRoles
        {
            ROLE_ADMIN=1,
            ROLE_DEVELOPER = 2,
            ROLE_MANAGER = 3,
            ROLE_DEO = 4,
        }
    }
}