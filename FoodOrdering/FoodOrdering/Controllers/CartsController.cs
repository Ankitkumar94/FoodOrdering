using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using FoodOrdering.Models;

namespace FoodOrdering.Controllers
{
    public class CartsController : Controller
    {
        private FoodOrderingDbEntities db = new FoodOrderingDbEntities();

        // GET: Carts
        public ActionResult Index()
        {
            return null;
        }

        [HttpPost]
        public JsonResult GetCartData(Cart cart)
        {
            var eachCartItem = (from item in db.Carts where item.ClientId.Equals(cart.ClientId)
                                select item);
            return Json(eachCartItem);
        }

        [HttpPost]
        public JsonResult DeleteProductFromCart(Cart cart)
        {
            string sqlDelete = "EXEC deleteCarts @cartid";
            int check = db.Database.ExecuteSqlCommand(sqlDelete, new SqlParameter("@cartid", value: cart.CartId));
            if (check == 1)
                return Json("Product Deleted!");
            else
                return Json("Product Not Deleted!");
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}