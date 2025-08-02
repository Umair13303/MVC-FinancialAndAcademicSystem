using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace office360.Areas.AMiscellaneous.Controllers
{
    public class CAccountUIController : Controller
    {
        public ActionResult Reconcile_AUI_LedgerAmountBased()
        {
            ViewBag.Title = "RECONCILE ACCOUNT LEDGER";
            return View();
        }
    }
}