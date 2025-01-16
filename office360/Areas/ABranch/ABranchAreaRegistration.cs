using System.Web.Mvc;

namespace office360.Areas.ABranch
{
    public class ABranchAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "ABranch";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "ABranch_default",
                "ABranch/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}